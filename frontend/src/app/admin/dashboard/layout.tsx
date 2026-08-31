// frontend/src/app/admin/(dashboard)/layout.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminTabNav from '@/components/admin/AdminTabNav';

// `proxy.ts` already redirects unauthenticated requests away from /admin/*
// at the edge, but that's an *optimistic* check (see the Next.js proxy
// docs — it shouldn't be relied on as the only gate). This layout re-checks
// with Supabase directly so every tab under it is covered by one real check
// instead of six copy-pasted ones.
//
// This route group is named `(dashboard)` — the parentheses mean it's an
// organizational folder only and doesn't appear in the URL, so this layout
// wraps /admin/homepage, /admin/brothers, etc. but NOT /admin/login, which
// lives outside the group and would otherwise get redirected in a loop.
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0eeea] padding-left: 50%">
      <AdminTabNav />
      <div className="mx-auto max-w-5xl px-6 py-12">{children}</div>
    </div>
  );
}