'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import UrlImageUploadCard from '@/components/admin/UrlImageUploadCard';
import EditableField from '@/components/admin/EditableField';
import type {
  SubOrganization,
  SubOrganizationMedia,
  SubOrgTeamMember,
  SubOrgChecklistItem,
} from '@/lib/types';

const TEXT_SECTIONS = ['Mission', 'About'] as const;

function TeamMemberRow({
  member,
  onChange,
  onCommit,
  onUploadPhoto,
  onRemove,
  savingKey,
}: {
  member: SubOrgTeamMember;
  onChange: (field: keyof SubOrgTeamMember, value: string) => void;
  onCommit: (field: keyof SubOrgTeamMember, value: string) => void;
  onUploadPhoto: (url: string) => void;
  onRemove: () => void;
  savingKey: string | null;
}) {
  return (
    <div className="flex flex-col gap-4 border border-white/10 p-4 sm:flex-row">
      <div className="w-full sm:w-40">
        <UrlImageUploadCard
          label="Photo"
          url={member.photo_url}
          compact
          saving={savingKey === `team:${member.id}:photo_url`}
          onUploaded={onUploadPhoto}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <EditableField
            label="Name"
            value={member.name}
            onChange={(v) => onChange('name', v)}
            onCommit={(v) => onCommit('name', v)}
            saving={savingKey === `team:${member.id}:name`}
          />
          <EditableField
            label="Position"
            value={member.position ?? ''}
            onChange={(v) => onChange('position', v)}
            onCommit={(v) => onCommit('position', v)}
            saving={savingKey === `team:${member.id}:position`}
          />
        </div>
        <EditableField
          label="Bio"
          value={member.bio ?? ''}
          onChange={(v) => onChange('bio', v)}
          onCommit={(v) => onCommit('bio', v)}
          multiline
          saving={savingKey === `team:${member.id}:bio`}
        />
        <button
          onClick={onRemove}
          className="self-start text-xs uppercase tracking-[0.1em] text-white/30 hover:text-red-400"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function ChecklistItemRow({
  item,
  onChange,
  onCommit,
  onRemove,
  savingKey,
}: {
  item: SubOrgChecklistItem;
  onChange: (field: keyof SubOrgChecklistItem, value: string) => void;
  onCommit: (field: keyof SubOrgChecklistItem, value: string) => void;
  onRemove: () => void;
  savingKey: string | null;
}) {
  return (
    <div className="flex flex-col gap-3 border border-white/10 p-4">
      <EditableField
        label="Title"
        value={item.title}
        onChange={(v) => onChange('title', v)}
        onCommit={(v) => onCommit('title', v)}
        saving={savingKey === `checklist:${item.id}:title`}
      />
      <EditableField
        label="Description"
        value={item.description ?? ''}
        onChange={(v) => onChange('description', v)}
        onCommit={(v) => onCommit('description', v)}
        multiline
        saving={savingKey === `checklist:${item.id}:description`}
      />
      <button
        onClick={onRemove}
        className="self-start text-xs uppercase tracking-[0.1em] text-white/30 hover:text-red-400"
      >
        Remove
      </button>
    </div>
  );
}

export default function SubOrgEditor({
  org,
  initialMedia,
  initialTeamMembers,
  initialChecklistItems,
}: {
  org: SubOrganization;
  initialMedia: SubOrganizationMedia[];
  initialTeamMembers: SubOrgTeamMember[];
  initialChecklistItems: SubOrgChecklistItem[];
}) {
  const supabase = createClient();
  const router = useRouter();

  const [o, setO] = useState<SubOrganization>(org);
  const [media, setMedia] = useState<SubOrganizationMedia[]>(initialMedia);
  const [teamMembers, setTeamMembers] = useState<SubOrgTeamMember[]>(initialTeamMembers);
  const [checklistItems, setChecklistItems] = useState<SubOrgChecklistItem[]>(
    initialChecklistItems
  );
  // Kept separate from `media` so each field stays controlled/responsive to
  // every keystroke even before its sub_organization_media row exists to
  // derive the value from (the row is only created on first blur/commit).
  const [textSectionContent, setTextSectionContent] = useState(
    TEXT_SECTIONS.map(
      (title) =>
        initialMedia.find((m) => m.type === 'text_block' && m.title === title)?.content ?? ''
    )
  );
  const [savingField, setSavingField] = useState<string | null>(null);
  const [savingTextSection, setSavingTextSection] = useState<number | null>(null);
  const [textSectionError, setTextSectionError] = useState<(string | null)[]>(
    TEXT_SECTIONS.map(() => null)
  );
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const textSectionRows = TEXT_SECTIONS.map((title) =>
    media.find((m) => m.type === 'text_block' && m.title === title)
  );

  // Generic single-field save for the sub_organizations row itself — every
  // field here is one column, so one function covers all of them.
  async function save<K extends keyof SubOrganization>(field: K, value: SubOrganization[K]) {
    setSavingField(field as string);
    await supabase.from('sub_organizations').update({ [field]: value }).eq('id', o.id);
    setO((prev) => ({ ...prev, [field]: value }));
    setSavingField(null);
  }

  async function saveTextSection(index: number, content: string) {
    setSavingTextSection(index);
    setTextSectionError((prev) => prev.map((e, idx) => (idx === index ? null : e)));
    const title = TEXT_SECTIONS[index];
    const existing = textSectionRows[index];

    let error: { message: string } | null = null;

    if (existing) {
      ({ error } = await supabase
        .from('sub_organization_media')
        .update({ content })
        .eq('id', existing.id));
      if (!error) {
        setMedia((prev) => prev.map((m) => (m.id === existing.id ? { ...m, content } : m)));
      }
    } else if (content.trim()) {
      const { data, error: insertError } = await supabase
        .from('sub_organization_media')
        .insert({ sub_organization_id: o.id, type: 'text_block', title, display_order: index, content })
        .select('id, sub_organization_id, type, cloudinary_public_id, title, content, display_order')
        .single();
      error = insertError;
      if (data) setMedia((prev) => [...prev, data]);
    }

    if (error) {
      console.error(`Failed to save ${title} section:`, error);
    }
    setTextSectionError((prev) => prev.map((e, idx) => (idx === index ? error?.message ?? null : e)));
    setSavingTextSection(null);
  }

  function updateTeamMember(id: string, field: keyof SubOrgTeamMember, value: string) {
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  }

  async function commitTeamMember(id: string, field: keyof SubOrgTeamMember, value: string) {
    setSavingKey(`team:${id}:${field}`);
    await supabase.from('sub_org_team_members').update({ [field]: value }).eq('id', id);
    setSavingKey(null);
  }

  async function addTeamMember() {
    const { data, error } = await supabase
      .from('sub_org_team_members')
      .insert({
        sub_organization_id: o.id,
        name: 'Name',
        position: 'Position',
        bio: 'Placeholder bio goes here.',
        display_order: teamMembers.length,
      })
      .select('*')
      .single();
    if (!error && data) setTeamMembers((prev) => [...prev, data]);
  }

  async function removeTeamMember(id: string) {
    if (!confirm("Remove this team member? This can't be undone.")) return;
    await supabase.from('sub_org_team_members').delete().eq('id', id);
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function updateChecklistItem(id: string, field: keyof SubOrgChecklistItem, value: string) {
    setChecklistItems((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  async function commitChecklistItem(id: string, field: keyof SubOrgChecklistItem, value: string) {
    setSavingKey(`checklist:${id}:${field}`);
    await supabase.from('sub_org_checklist_items').update({ [field]: value }).eq('id', id);
    setSavingKey(null);
  }

  async function addChecklistItem() {
    const { data, error } = await supabase
      .from('sub_org_checklist_items')
      .insert({
        sub_organization_id: o.id,
        title: 'Placeholder Skill',
        description: 'Placeholder description of what this covers.',
        display_order: checklistItems.length,
      })
      .select('*')
      .single();
    if (!error && data) setChecklistItems((prev) => [...prev, data]);
  }

  async function removeChecklistItem(id: string) {
    if (!confirm("Remove this checklist item? This can't be undone.")) return;
    await supabase.from('sub_org_checklist_items').delete().eq('id', id);
    setChecklistItems((prev) => prev.filter((c) => c.id !== id));
  }

  async function deleteSubOrganization() {
    if (!confirm(`Remove ${o.name}? This can't be undone.`)) return;
    await supabase.from('sub_organizations').delete().eq('id', o.id);
    router.push('/admin/dashboard/sub-organizations');
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/admin/dashboard/sub-organizations"
          className="text-sm text-white/50 hover:text-white"
        >
          &larr; Back to Sub-Organizations
        </Link>
        <button
          onClick={deleteSubOrganization}
          className="text-xs uppercase tracking-[0.15em] text-white/30 hover:text-red-400"
        >
          Remove sub-organization
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[240px_1fr]">
        <div className="max-w-xs">
          <UrlImageUploadCard
            label="Logo"
            url={o.logo_url}
            variant="square"
            saving={savingField === 'logo_url'}
            onUploaded={(url) => save('logo_url', url)}
          />
        </div>

        <div className="flex flex-col gap-6">
          <EditableField
            label="Name"
            value={o.name}
            onChange={(v) => setO((prev) => ({ ...prev, name: v }))}
            onCommit={(v) => save('name', v)}
            saving={savingField === 'name'}
          />

          <EditableField
            label="Slug"
            value={o.slug}
            onChange={(v) => setO((prev) => ({ ...prev, slug: v }))}
            onCommit={(v) => save('slug', v)}
            placeholder="e.g. psi-tech"
            saving={savingField === 'slug'}
          />

          <EditableField
            label="Description"
            value={o.description}
            onChange={(v) => setO((prev) => ({ ...prev, description: v }))}
            onCommit={(v) => save('description', v)}
            multiline
            saving={savingField === 'description'}
          />
        </div>
      </div>

      <div className="mt-12">
        <p className="mb-4 text-xs uppercase tracking-[0.15em] text-white/50">
          Team members
        </p>
        <div className="flex flex-col gap-4">
          {teamMembers.map((member) => (
            <TeamMemberRow
              key={member.id}
              member={member}
              onChange={(field, value) => updateTeamMember(member.id, field, value)}
              onCommit={(field, value) => commitTeamMember(member.id, field, value)}
              onUploadPhoto={(url) => {
                updateTeamMember(member.id, 'photo_url', url);
                commitTeamMember(member.id, 'photo_url', url);
              }}
              onRemove={() => removeTeamMember(member.id)}
              savingKey={savingKey}
            />
          ))}
          {teamMembers.length === 0 && (
            <p className="text-sm text-white/30">No team members yet — add the first one below.</p>
          )}
        </div>
        <button
          onClick={addTeamMember}
          className="mt-4 border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a]"
        >
          + Add Team Member
        </button>
      </div>

      <div className="mt-12 flex flex-col gap-6">
        {TEXT_SECTIONS.map((title, i) => (
          <div key={title}>
            <EditableField
              label={title}
              value={textSectionContent[i]}
              onChange={(v) =>
                setTextSectionContent((prev) => prev.map((c, idx) => (idx === i ? v : c)))
              }
              onCommit={(v) => saveTextSection(i, v)}
              multiline
              placeholder={`${title} copy shown on this sub-org's page`}
              saving={savingTextSection === i}
            />
            {textSectionError[i] && (
              <p className="mt-2 text-xs text-red-400">
                Failed to save: {textSectionError[i]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <p className="mb-4 text-xs uppercase tracking-[0.15em] text-white/50">
          What You&apos;ll Gain
        </p>
        <div className="flex flex-col gap-4">
          {checklistItems.map((item) => (
            <ChecklistItemRow
              key={item.id}
              item={item}
              onChange={(field, value) => updateChecklistItem(item.id, field, value)}
              onCommit={(field, value) => commitChecklistItem(item.id, field, value)}
              onRemove={() => removeChecklistItem(item.id)}
              savingKey={savingKey}
            />
          ))}
          {checklistItems.length === 0 && (
            <p className="text-sm text-white/30">No checklist items yet — add the first one below.</p>
          )}
        </div>
        <button
          onClick={addChecklistItem}
          className="mt-4 border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a]"
        >
          + Add Checklist Item
        </button>
      </div>
    </div>
  );
}
