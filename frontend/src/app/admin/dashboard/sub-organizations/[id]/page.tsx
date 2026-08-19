import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SubOrgEditor from './SubOrgEditor';

// `params` is a Promise in this Next.js version — must be awaited.
export default async function AdminSubOrganizationEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: org }, { data: media }, { data: teamMembers }, { data: checklistItems }] =
    await Promise.all([
      supabase.from('sub_organizations').select('*').eq('id', id).single(),
      supabase
        .from('sub_organization_media')
        .select('id, sub_organization_id, type, cloudinary_public_id, title, content, display_order')
        .eq('sub_organization_id', id)
        .order('display_order'),
      supabase
        .from('sub_org_team_members')
        .select('id, sub_organization_id, name, position, bio, photo_url, display_order')
        .eq('sub_organization_id', id)
        .order('display_order'),
      supabase
        .from('sub_org_checklist_items')
        .select('id, sub_organization_id, title, description, display_order')
        .eq('sub_organization_id', id)
        .order('display_order'),
    ]);

  if (!org) {
    return (
      <div>
        <p className="mb-4 text-white/60">Sub-organization not found.</p>
        <Link
          href="/admin/dashboard/sub-organizations"
          className="text-sm text-[#c8b89a] hover:underline"
        >
          &larr; Back to Sub-Organizations
        </Link>
      </div>
    );
  }

  return (
    <SubOrgEditor
      org={org}
      initialMedia={media ?? []}
      initialTeamMembers={teamMembers ?? []}
      initialChecklistItems={checklistItems ?? []}
    />
  );
}
