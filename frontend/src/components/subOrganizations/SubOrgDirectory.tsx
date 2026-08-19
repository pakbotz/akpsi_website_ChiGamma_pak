import { SubOrganization } from '@/lib/types';
import SubOrgCard from './SubOrgCard';

export default function SubOrgDirectory({
  subOrganizations,
}: {
  subOrganizations: SubOrganization[];
}) {
  return (
    <section className="min-h-dvh bg-[#0a0a0a] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c8b89a]">
          The Chapter
        </p>
        <h1
          className="mb-12 font-medium leading-[1.05] tracking-tight text-[#f0eeea]"
          style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
        >
          Sub-Organizations
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subOrganizations.map((org) => (
            <SubOrgCard key={org.id} org={org} />
          ))}

          {subOrganizations.length === 0 && (
            <p className="text-sm text-white/45">No sub-organizations yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
