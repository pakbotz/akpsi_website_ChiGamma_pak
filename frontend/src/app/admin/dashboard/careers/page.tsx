// frontend/src/app/admin/(dashboard)/careers/page.tsx
import { createClient } from '@/lib/supabase/server';
import CareersEditor from './CareersEditor';

export default async function AdminCareersPage() {
  const supabase = await createClient();

  const [{ data: careerBrothers }, { data: spotlight }] = await Promise.all([
    supabase.from('career_brothers').select('*').order('sort_order'),
    supabase.from('job_spotlight').select('*').eq('id', 1).single(),
  ]);

  return <CareersEditor initialCareerBrothers={careerBrothers ?? []} initialSpotlight={spotlight} />;
}