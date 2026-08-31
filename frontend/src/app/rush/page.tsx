import { redirect } from 'next/navigation';

// Rush is a single destination for now — no term picker. This just
// forwards to the current term page. To bring back a "choose your term"
// index later, restore the previous version of this file from git history
// and re-add the dropdown in FullscreenMenu.tsx.
export default function RushIndexPage() {
  redirect('/rush/fall-2026');
}
