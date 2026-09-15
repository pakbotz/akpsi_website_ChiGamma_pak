// ─── Careers data ───────────────────────────────────────────────────
// `career_brothers` is one flat table in the admin dashboard (Our Careers
// tab), but the public page groups rows by `year` into a tabbed roster.
// A row can exist with no year set yet (an admin mid-edit, or a brand new
// "+ Add Brother" row) — those are filtered out here rather than in the
// dashboard, where the admin still needs to see and finish them. Same
// pattern as getGalleryEvents() filtering out events with no photo yet.
//
// Call this from a Server Component (see app/careers/page.tsx) and pass
// the result down as props — depends on the server-only Supabase client
// (cookies()), same rule as lib/brothers.ts / lib/gallery.ts.

import { createClient } from '@/lib/supabase/server';

export interface CareerAlum {
  name: string;
  title: string;
  company: string;
}

export interface CareersByYear {
  years: string[];
  alumniByYear: Record<string, CareerAlum[]>;
}

export async function getCareersByYear(): Promise<CareersByYear> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('career_brothers')
    .select('name, position, company, year, sort_order')
    .order('sort_order', { ascending: true });

  if (error || !data) return { years: [], alumniByYear: {} };

  const alumniByYear: Record<string, CareerAlum[]> = {};

  for (const row of data) {
    if (!row.year) continue;
    const bucket = alumniByYear[row.year] ?? (alumniByYear[row.year] = []);
    bucket.push({
      name: row.name,
      title: row.position ?? '',
      company: row.company ?? '',
    });
  }

  // Four-digit year strings sort correctly as plain strings — no need to
  // parse to numbers unless/until a non-4-digit year ever shows up.
  const years = Object.keys(alumniByYear).sort();

  return { years, alumniByYear };
}