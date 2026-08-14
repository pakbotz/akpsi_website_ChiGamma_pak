import { notFound } from 'next/navigation';
import { RUSH_TERMS, getRushTerm } from '@/lib/rushTerms';
import RushTermView from '@/components/rush/RushTermView';
import ArcteryxTermView from '@/components/rush/ArcteryxTermView';
import BapeTermView from '@/components/rush/BapeTermView';

export function generateStaticParams() {
  return RUSH_TERMS.map((term) => ({ term: term.slug }));
}

export default async function RushTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term: slug } = await params;
  const term = getRushTerm(slug);
  if (!term) notFound();

  // Past-terms concept is switched off for now (single destination only —
  // see FullscreenMenu.tsx and rush/page.tsx). Restore the filter below to
  // bring cross-term links back.
  const otherTerms: typeof RUSH_TERMS = [];

  if (term.theme === 'arcteryx') {
    return <ArcteryxTermView term={term} otherTerms={otherTerms} />;
  }
  if (term.theme === 'bape') {
    return <BapeTermView term={term} otherTerms={otherTerms} />;
  }

  return <RushTermView term={term} otherTerms={otherTerms} />;
}
