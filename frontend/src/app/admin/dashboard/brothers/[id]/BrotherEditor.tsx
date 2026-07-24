// frontend/src/app/admin/(dashboard)/brothers/[id]/BrotherEditor.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ImageUploadCard from '@/components/admin/ImageUploadCard';
import EditableField from '@/components/admin/EditableField';
import type { Brother, PledgeClass } from '@/lib/types';

export default function BrotherEditor({
  brother,
  classes,
}: {
  brother: Brother;
  classes: PledgeClass[];
}) {
  const supabase = createClient();
  const router = useRouter();

  const [b, setB] = useState<Brother>(brother);
  const [savingField, setSavingField] = useState<string | null>(null);

  // Generic single-field save — every field on this page is one column,
  // so one function handles all of them instead of a bespoke save
  // function per field.
  async function save<K extends keyof Brother>(field: K, value: Brother[K]) {
    setSavingField(field as string);
    await supabase.from('brothers').update({ [field]: value }).eq('id', b.id);
    setB((prev) => ({ ...prev, [field]: value }));
    setSavingField(null);
  }

  async function deleteBrother() {
    if (!confirm(`Remove ${b.name}? This can't be undone.`)) return;
    await supabase.from('brothers').delete().eq('id', b.id);
    router.push('/admin/brothers');
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <Link href="/admin/brothers" className="text-sm text-white/50 hover:text-white">
          &larr; Back to Brothers
        </Link>
        <button
          onClick={deleteBrother}
          className="text-xs uppercase tracking-[0.15em] text-white/30 hover:text-red-400"
        >
          Remove brother
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[240px_1fr]">
        <div>
          <div className="max-w-xs">
            <ImageUploadCard
              label="Photo"
              publicId={b.cloudinary_public_id}
              saving={savingField === 'cloudinary_public_id'}
              onUploaded={(id) => save('cloudinary_public_id', id)}
            />
          </div>

          <label className="mt-6 flex items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={b.active}
              onChange={(e) => save('active', e.target.checked)}
              className="h-4 w-4 accent-[#c8b89a]"
            />
            Active (shows on public Brothers page)
          </label>
        </div>

        <div className="flex flex-col gap-6">
          <EditableField
            label="Name"
            value={b.name}
            onChange={(v) => setB((prev) => ({ ...prev, name: v }))}
            onCommit={(v) => save('name', v)}
            saving={savingField === 'name'}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <EditableField
              label="Grade"
              value={b.grade ?? ''}
              onChange={(v) => setB((prev) => ({ ...prev, grade: v }))}
              onCommit={(v) => save('grade', v)}
              saving={savingField === 'grade'}
            />
            <EditableField
              label="Major"
              value={b.major ?? ''}
              onChange={(v) => setB((prev) => ({ ...prev, major: v }))}
              onCommit={(v) => save('major', v)}
              saving={savingField === 'major'}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/50">
              Class
            </label>
            <select
              value={b.class_id ?? ''}
              onChange={(e) => save('class_id', e.target.value || null)}
              className="w-full border-b border-white/20 bg-[#0a0a0a] py-2 text-white focus:border-[#c8b89a] focus:outline-none"
            >
              <option value="">— Unassigned —</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.greek_letter} — {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <EditableField
              label="Position"
              value={b.position_title ?? ''}
              onChange={(v) => setB((prev) => ({ ...prev, position_title: v }))}
              onCommit={(v) => save('position_title', v)}
              placeholder="e.g. VP of Recruitment"
              saving={savingField === 'position_title'}
            />
            <div className="mt-3 flex gap-6">
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={b.is_executive}
                  onChange={(e) => save('is_executive', e.target.checked)}
                  className="h-4 w-4 accent-[#c8b89a]"
                />
                Executive Position
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={b.is_board}
                  onChange={(e) => save('is_board', e.target.checked)}
                  className="h-4 w-4 accent-[#c8b89a]"
                />
                Board Position
              </label>
            </div>
          </div>

          <EditableField
            label="LinkedIn link"
            value={b.linkedin_url ?? ''}
            onChange={(v) => setB((prev) => ({ ...prev, linkedin_url: v }))}
            onCommit={(v) => save('linkedin_url', v)}
            placeholder="https://linkedin.com/in/..."
            saving={savingField === 'linkedin_url'}
          />

          <EditableField
            label="Bio"
            value={b.bio ?? ''}
            onChange={(v) => setB((prev) => ({ ...prev, bio: v }))}
            onCommit={(v) => save('bio', v)}
            multiline
            saving={savingField === 'bio'}
          />
        </div>
      </div>
    </div>
  );
}