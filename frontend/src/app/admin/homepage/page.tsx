// frontend/src/app/admin/homepage/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import HomepageEditor from './HomepageEditor';

export default async function AdminHomepagePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const [{ data: images }, { data: slides }] = await Promise.all([
    supabase.from('homepage_images').select('slot_key, cloudinary_public_id'),
    supabase
      .from('rush_carousel_slides')
      .select('id, cloudinary_public_id, caption')
      .order('display_order'),
  ]);

  return <HomepageEditor initialImages={images ?? []} initialSlides={slides ?? []} />;
}