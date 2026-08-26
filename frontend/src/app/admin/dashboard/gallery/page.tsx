// frontend/src/app/admin/(dashboard)/gallery/page.tsx
import { createClient } from '@/lib/supabase/server';
import GalleryEditor from './GalleryEditor';

export default async function AdminGalleryPage() {
  const supabase = await createClient();

  const [{ data: images }, { data: events }] = await Promise.all([
    supabase
      .from('gallery_images')
      .select('id, cloudinary_public_id, created_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('gallery_events')
      .select('id, cloudinary_public_id, caption, sort_order, created_at')
      .order('sort_order', { ascending: true }),
  ]);

  return <GalleryEditor initialImages={images ?? []} initialEvents={events ?? []} />;
}