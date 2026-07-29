// ─── Brother directory data ────────────────────────────────────────
// `Brother` is the shape the frontend components (BrotherCard,
// BrotherModal, BrotherDirectory) are built around. `getBrothers()`
// fetches the real data from Supabase and maps each row into this shape —
// call it from a Server Component (see app/brothers/page.tsx) and pass
// the result down as a prop; don't import it into a 'use client' file,
// since it depends on the server-only Supabase client (cookies()).

import { getCldImageUrl } from 'next-cloudinary';
import { createClient } from '@/lib/supabase/server';
import { getGradeLabel } from '@/lib/gradeLevel';

export interface Brother {
  id: string;
  name: string;
  photoUrl: string; // Cloudinary delivery URL, or '' if no photo uploaded yet
  major: string;
  minor?: string;
  currentYear?: string; // computed standing, e.g. "3rd year" — see lib/gradeLevel.ts. The raw grad_year this is derived from stays admin-only and is never exposed here.
  pledgeClass: string; // Greek letter designation — see src/lib/greekAlphabet.ts for chronological order
  positions: string[]; // current position(s) held — empty array if none
  pastPositions: string[]; // positions previously held, most-senior-first (see admin PastPositionsField.tsx for the sort rule)
  isExecTeam: boolean; // derived from is_executive, stored explicitly for easy filtering
  isLowerBoard: boolean; // derived from is_board — committee-chair tier, below exec
  bio: string;
  linkedinUrl: string;
  email?: string;
}

// Row shape as it comes back from Supabase — narrower than `Brother`,
// since column names don't match the frontend's camelCase field names.
type BrotherRow = {
  id: string;
  name: string;
  cloudinary_public_id: string | null;
  major: string | null;
  minor: string | null;
  grad_year: number | null;
  position_title: string | null;
  past_positions: string[] | null;
  is_executive: boolean;
  is_board: boolean;
  linkedin_url: string | null;
  email: string | null;
  bio: string | null;
  // PostgREST returns this as a single object, not an array, because the
  // foreign key (class_id) lives on this table pointing at one classes row
  // — a to-many embed (e.g. classes -> brothers) would be an array, but a
  // to-one embed like this one isn't.
  classes: { name: string } | null;
};

function mapRowToBrother(row: BrotherRow): Brother {
  return {
    id: row.id,
    name: row.name,
    photoUrl: row.cloudinary_public_id
      ? getCldImageUrl({ src: row.cloudinary_public_id, crop: 'fill', gravity: 'auto', aspectRatio: '4:5' })
      : '',
    major: row.major ?? '',
    minor: row.minor ?? undefined,
    currentYear: getGradeLabel(row.grad_year),
    pledgeClass: row.classes?.name ?? '',
    positions: row.position_title ? [row.position_title] : [],
    pastPositions: row.past_positions ?? [],
    isExecTeam: row.is_executive,
    isLowerBoard: row.is_board,
    bio: row.bio ?? '',
    linkedinUrl: row.linkedin_url ?? '',
    email: row.email ?? undefined,
  };
}

// Only active brothers are returned — draft/half-filled-in profiles that
// haven't been checked "Active" in the admin dashboard stay hidden from
// the public directory. (RLS itself stays open on this table so the admin
// dashboard can still see and edit inactive brothers; this filter is what
// actually enforces "active only" for the public page.)
export async function getBrothers(): Promise<Brother[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('brothers')
    .select(
      'id, name, cloudinary_public_id, major, minor, grad_year, position_title, past_positions, is_executive, is_board, linkedin_url, email, bio, classes(name)'
    )
    .eq('active', true)
    .order('name');

  if (error || !data) return [];

  // Same inference mismatch as the admin BrothersList query — Supabase's
  // own TS types assume an array for this embed, but it's confirmed to be
  // a plain object at runtime for this to-one relationship.
  return (data as unknown as BrotherRow[]).map(mapRowToBrother);
}