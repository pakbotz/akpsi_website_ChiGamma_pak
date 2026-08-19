import { createClient } from '@/lib/supabase/server';
import SubOrgsList from './SubOrgsList';

export default async function AdminSubOrganizationsPage() {
  const supabase = await createClient();

  const { data: subOrganizations } = await supabase
    .from('sub_organizations')
    .select('id, slug, name, description, logo_url')
    .order('name');

  return <SubOrgsList initialSubOrganizations={subOrganizations ?? []} />;
}
