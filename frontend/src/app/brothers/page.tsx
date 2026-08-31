import BrotherDirectory from '@/components/brothers/BrotherDirectory';
import Footer from '@/components/home/Footer';
import { getBrothers } from '@/lib/brothers';
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Brothers | Alpha Kappa Psi - Chi Gamma",
 description: "Meet our esteemed brothers of the Chi Gamma chapter.",
 keywords: ["Brothers", "members", "Alpha Kappa Psi", "Chi Gamma", "UCSC", "AKPSI"],
};

export default async function Page() {
  const brothers = await getBrothers();
  return (
  <div>
    <BrotherDirectory brothers={brothers} />
    <Footer />
  </div>
  );
}