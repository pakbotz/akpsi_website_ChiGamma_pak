// frontend/src/app/admin/(dashboard)/gallery/page.tsx
import { createClient } from '@/lib/supabase/server';
import GalleryEditor from './GalleryEditor';

export default async function AdminGalleryPage() {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from('gallery_images')
    .select('id, cloudinary_public_id, created_at')
    .order('created_at', { ascending: false });

  return <GalleryEditor initialImages={images ?? []} />;
}