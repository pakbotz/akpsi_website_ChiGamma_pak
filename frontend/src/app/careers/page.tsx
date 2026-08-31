import CareersRoster from '@/components/careers/CareersRoster';
import { getCareersByYear } from '@/lib/careers';
import Footer from '@/components/home/Footer';
import type { Metadata } from "next";


export const metadata: Metadata = {
 title: "Our Careers | Alpha Kappa Psi - Chi Gamma",
 description: "Explore what our Brothers are pursuing outside of the chapter.",
 keywords: ["Careers", "alumni", "professional development"],
};

export default async function CareersPage() {
  const { years, alumniByYear } = await getCareersByYear();

  return (
  <div>
    <CareersRoster years={years} alumniByYear={alumniByYear} />
    <Footer />
  </div>
);
}