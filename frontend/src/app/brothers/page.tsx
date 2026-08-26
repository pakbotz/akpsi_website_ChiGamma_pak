import BrotherDirectory from '@/components/brothers/BrotherDirectory';
import { getBrothers } from '@/lib/brothers';

export default async function Page() {
  const brothers = await getBrothers();
  return <BrotherDirectory brothers={brothers} />;
}