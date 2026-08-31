import { getSubOrganizations } from '@/lib/api';
import SubOrgDirectory from '@/components/subOrganizations/SubOrgDirectory';

export default async function Page() {
  const subOrganizations = await getSubOrganizations();

  return <SubOrgDirectory subOrganizations={subOrganizations} />;
}
