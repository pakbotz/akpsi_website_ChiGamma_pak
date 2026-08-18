// frontend/src/app/admin/dashboard/brothers/page.tsx
import { createClient } from '@/lib/supabase/server';
import BrothersList, { type BrotherRow } from './BrothersList';

export default async function AdminBrothersPage() {
  const supabase = await createClient();

  const [{ data: brothers }, { data: classes }] = await Promise.all([
    supabase
      .from('brothers')
      .select('id, name, active, is_executive, is_board, cloudinary_public_id, class_id, classes(greek_letter, name)')
      .order('name'),
    supabase.from('classes').select('id, greek_letter, name, sort_order').order('sort_order'),
  ]);

  // Supabase's own TS inference assumes embedded relations are always
  // arrays when there's no generated Database schema — that's just wrong
  // for a to-one embed like this one (confirmed against real data: it's a
  // plain object at runtime, not array-wrapped). `unknown` first because
  // the inferred type and the real shape don't overlap enough for a direct
  // cast, even though the real shape is the correct one.
  const typedBrothers = (brothers ?? []) as unknown as BrotherRow[];

  return <BrothersList initialBrothers={typedBrothers} classes={classes ?? []} />;
}