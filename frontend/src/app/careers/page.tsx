import CareersRoster from '@/components/careers/CareersRoster';
import { getCareersByYear } from '@/lib/careers';

export default async function CareersPage() {
  const { years, alumniByYear } = await getCareersByYear();

  return <CareersRoster years={years} alumniByYear={alumniByYear} />;
}