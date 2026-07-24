// frontend/src/app/admin/(dashboard)/homepage/page.tsx
import { createClient } from '@/lib/supabase/server';
import HomepageEditor from './HomepageEditor';

// Auth is already enforced by the (dashboard) layout above this route, so
// this page can go straight to fetching data.
export default async function AdminHomepagePage() {
  const supabase = await createClient();

  const [{ data: images }, { data: textRows }, { data: slides }] = await Promise.all([
    supabase.from('homepage_images').select('slot_key, cloudinary_public_id'),
    supabase.from('homepage_text_content').select('key, value'),
    supabase
      .from('rush_carousel_slides')
      .select('id, cloudinary_public_id, caption, location, event_datetime')
      .order('display_order'),
  ]);

  return (
    <HomepageEditor
      initialImages={images ?? []}
      initialText={textRows ?? []}
      initialSlides={slides ?? []}
    />
  );
}