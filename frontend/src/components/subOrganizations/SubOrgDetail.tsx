import Link from 'next/link';
import {
  SubOrganization,
  SubOrganizationMedia,
  SubOrgTeamMember,
  SubOrgChecklistItem,
} from '@/lib/types';
import SubOrgTeamCard from './SubOrgTeamCard';
import SubOrgTextBlock from './SubOrgTextBlock';
import SubOrgChecklistItemCard from './SubOrgChecklistItemCard';

export default function SubOrgDetail({
  org,
  media,
  teamMembers,
  checklistItems,
}: {
  org: SubOrganization;
  media: SubOrganizationMedia[];
  teamMembers: SubOrgTeamMember[];
  checklistItems: SubOrgChecklistItem[];
}) {
  const mission = media.find((m) => m.type === 'text_block' && m.title === 'Mission');
  const about = media.find((m) => m.type === 'text_block' && m.title === 'About');

  return (
    <section className="min-h-dvh bg-[#0a0a0a] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/sub-organizations"
          className="mb-10 inline-block text-sm text-white/60 underline underline-offset-4 transition-colors hover:text-white"
        >
          &larr; All Sub-Organizations
        </Link>

        <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c8b89a]">
              Sub-Organization
            </p>
            <h1
              className="font-medium leading-[1.05] tracking-tight text-[#f0eeea]"
              style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
            >
              {org.name}
            </h1>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden bg-[#1c1c1c]">
            {org.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={org.logo_url}
                alt={`${org.name} logo`}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                Logo
              </span>
            )}
          </div>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-white/60">
          {org.description}
        </p>

        <div className="mt-12 flex flex-col gap-4">
          <SubOrgTextBlock
            heading="Mission"
            media={mission}
            placeholder="Placeholder mission statement goes here."
          />
          <SubOrgTextBlock
            heading="About"
            media={about}
            placeholder="Placeholder about copy goes here."
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[3fr_2fr]">
          <div className="flex flex-col gap-4">
            {teamMembers.map((member) => (
              <SubOrgTeamCard key={member.id} member={member} />
            ))}
            {teamMembers.length === 0 && (
              <p className="text-sm text-white/45">No team members yet.</p>
            )}
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c8b89a]">
              What You&apos;ll Gain
            </p>
            <div className="flex flex-col gap-5">
              {checklistItems.map((item) => (
                <SubOrgChecklistItemCard key={item.id} item={item} />
              ))}
              {checklistItems.length === 0 && (
                <p className="text-sm text-white/45">Nothing listed yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
