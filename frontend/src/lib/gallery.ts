// ─── Gallery data ───────────────────────────────────────────────────
// Two independent pools, same as the admin dashboard's Gallery tab:
//   - `gallery_images` -> the full, unordered photo wall (GalleryGrid)
//   - `gallery_events`  -> a small, hand-picked, captioned set with an
//     explicit display order (GalleryCarousel)
// They're separate tables because the carousel needs a caption + order
// the grid doesn't, not because they're conceptually unrelated — see
// GalleryEditor.tsx for where admins manage both.
//
// Call these from a Server Component (see app/gallery/page.tsx) and pass
// the result down as props; don't import into a 'use client' file, since
// they depend on the server-only Supabase client (cookies()) — same rule
// as lib/brothers.ts.

import { createClient } from '@/lib/supabase/server';

export interface GalleryPhoto {
  id: string;
  cloudinaryPublicId: string;
}

export interface GalleryEventSlide {
  id: string;
  cloudinaryPublicId: string;
  caption: string;
}

export async function getGalleryImages(): Promise<GalleryPhoto[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('gallery_images')
    .select('id, cloudinary_public_id')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    cloudinaryPublicId: row.cloudinary_public_id,
  }));
}

export async function getGalleryEvents(): Promise<GalleryEventSlide[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('gallery_events')
    .select('id, cloudinary_public_id, caption')
    .order('sort_order', { ascending: true });

  if (error || !data) return [];

  // An event row can exist with just a caption and no photo yet (an admin
  // mid-edit) — those aren't ready for the public carousel, so they're
  // filtered out here rather than in the admin dashboard, where the admin
  // still needs to see and finish them.
  return data
    .filter((row): row is typeof row & { cloudinary_public_id: string } =>
      Boolean(row.cloudinary_public_id)
    )
    .map((row) => ({
      id: row.id,
      cloudinaryPublicId: row.cloudinary_public_id,
      caption: row.caption,
    }));
}