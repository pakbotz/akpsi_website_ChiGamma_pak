// frontend/src/app/admin/(dashboard)/brothers/[id]/page.tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import BrotherEditor from './BrotherEditor';

// `params` is a Promise in this Next.js version — must be awaited.
export default async function AdminBrotherEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: brother }, { data: classes }] = await Promise.all([
    supabase.from('brothers').select('*').eq('id', id).single(),
    supabase.from('classes').select('id, greek_letter, name, sort_order').order('sort_order'),
  ]);

  if (!brother) {
    return (
      <div>
        <p className="mb-4 text-white/60">Brother not found.</p>
        <Link href="/admin/brothers" className="text-sm text-[#c8b89a] hover:underline">
          &larr; Back to Brothers
        </Link>
      </div>
    );
  }

  return <BrotherEditor brother={brother} classes={classes ?? []} />;
}