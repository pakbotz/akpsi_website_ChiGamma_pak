import { createClient } from '@/lib/supabase/server';
import {
  SubOrganization,
  SubOrganizationMedia,
  SubOrgTeamMember,
  SubOrgChecklistItem,
} from '@/lib/types';

export async function getSubOrganizations(): Promise<SubOrganization[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('sub_organizations')
    .select('id, slug, name, description, logo_url')
    .order('name');

  return data ?? [];
}

export async function getSubOrganizationBySlug(
  slug: string
): Promise<SubOrganization | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('sub_organizations')
    .select('id, slug, name, description, logo_url')
    .eq('slug', slug)
    .single();

  return data ?? null;
}

export async function getSubOrganizationMedia(
  subOrganizationId: string
): Promise<SubOrganizationMedia[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('sub_organization_media')
    .select('id, sub_organization_id, type, cloudinary_public_id, title, content, display_order')
    .eq('sub_organization_id', subOrganizationId)
    .order('display_order');

  return data ?? [];
}

export async function getSubOrgTeamMembers(
  subOrganizationId: string
): Promise<SubOrgTeamMember[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('sub_org_team_members')
    .select('id, sub_organization_id, name, position, bio, photo_url, display_order')
    .eq('sub_organization_id', subOrganizationId)
    .order('display_order');

  return data ?? [];
}

export async function getSubOrgChecklistItems(
  subOrganizationId: string
): Promise<SubOrgChecklistItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('sub_org_checklist_items')
    .select('id, sub_organization_id, title, description, display_order')
    .eq('sub_organization_id', subOrganizationId)
    .order('display_order');

  return data ?? [];
}
