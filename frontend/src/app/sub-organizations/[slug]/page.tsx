import { notFound } from 'next/navigation';
import {
  getSubOrganizationBySlug,
  getSubOrganizationMedia,
  getSubOrgTeamMembers,
  getSubOrgChecklistItems,
} from '@/lib/api';
import SubOrgDetail from '@/components/subOrganizations/SubOrgDetail';

// `params` is a Promise in this Next.js version — must be awaited.
export default async function SubOrganizationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const org = await getSubOrganizationBySlug(slug);

  if (!org) notFound();

  const [media, teamMembers, checklistItems] = await Promise.all([
    getSubOrganizationMedia(org.id),
    getSubOrgTeamMembers(org.id),
    getSubOrgChecklistItems(org.id),
  ]);

  return (
    <SubOrgDetail
      org={org}
      media={media}
      teamMembers={teamMembers}
      checklistItems={checklistItems}
    />
  );
}
