// frontend/src/app/admin/(dashboard)/brothers/page.tsx
import { createClient } from '@/lib/supabase/server';
import BrothersList from './BrothersList';

export default async function AdminBrothersPage() {
  const supabase = await createClient();

  const [{ data: brothers }, { data: classes }] = await Promise.all([
    supabase
      .from('brothers')
      .select('id, name, active, is_executive, is_board, cloudinary_public_id, class_id, classes(greek_letter, name)')
      .order('name'),
    supabase.from('classes').select('id, greek_letter, name, sort_order').order('sort_order'),
  ]);

  return <BrothersList initialBrothers={brothers ?? []} classes={classes ?? []} />;
}