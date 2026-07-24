'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const TABS = [
  { label: 'Homepage', href: '/admin/dashboard/homepage' },
  { label: 'About', href: '/admin/dashboard/about' },
  { label: 'Brothers', href: '/admin/dashboard/brothers' },
  { label: 'Careers', href: '/admin/dashboard/careers' },
  { label: 'Gallery', href: '/admin/dashboard/gallery' },
  { label: 'Rush AKΨ', href: '/admin/dashboard/rush' },
] as const;

export default function AdminTabNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="border-b border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-8">
        {/*
          The site's main Navbar (the "ΑΚΨ" logo, top-left) is `position: fixed`,
          so it sits on top of whatever is underneath it regardless of this
          container's own padding — padding only affects layout *inside* this
          box, it can't push a fixed element out of the way. The fix is a
          viewport-relative left margin on the tab list itself, so the first
          tab starts clear of the logo at any screen width. Adjust the vw
          number below if it still feels off on your monitor.
        */}
        <nav className="ml-[20vw] flex flex-wrap gap-x-6 items-stretch">
          {TABS.map((tab) => {
            // startsWith (not ===) so /admin/brothers/<id> still highlights
            // the Brothers tab instead of showing no active tab at all.
            const active = pathname === tab.href || pathname.startsWith(tab.href + '/');
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={
                  active
                    ? 'inline-flex min-h-[64px] items-center border-b-2 border-[#c8b89a] px-4 text-sm text-[#c8b89a]'
                    : 'inline-flex min-h-[64px] items-center border-b-2 border-transparent px-4 text-sm text-white/50 transition-colors hover:text-white'
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push('/admin/login');
            router.refresh();
          }}
          className="inline-flex items-center px-2 py-4 text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}