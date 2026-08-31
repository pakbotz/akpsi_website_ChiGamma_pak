import CareersRoster from '@/components/careers/CareersRoster';
import { getCareersByYear } from '@/lib/careers';
import Footer from '@/components/home/Footer';


export default async function CareersPage() {
  const { years, alumniByYear } = await getCareersByYear();

  return (
  <div>
    <CareersRoster years={years} alumniByYear={alumniByYear} />
    <Footer />
  </div>
);
}