import { notFound } from 'next/navigation';
import { RUSH_TERMS, getRushTerm } from '@/lib/rushTerms';
import RushTermView from '@/components/rush/RushTermView';
import ArcteryxTermView from '@/components/rush/ArcteryxTermView';

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

  const otherTerms = RUSH_TERMS.filter((t) => t.slug !== term.slug);

  if (term.theme === 'arcteryx') {
    return <ArcteryxTermView term={term} otherTerms={otherTerms} />;
  }

  return <RushTermView term={term} otherTerms={otherTerms} />;
}
