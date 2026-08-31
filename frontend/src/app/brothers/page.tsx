import BrotherDirectory from '@/components/brothers/BrotherDirectory';
import Footer from '@/components/home/Footer';
import { getBrothers } from '@/lib/brothers';

export default async function Page() {
  const brothers = await getBrothers();
  return (
  <div>
    <BrotherDirectory brothers={brothers} />
    <Footer />
  </div>
  );
}