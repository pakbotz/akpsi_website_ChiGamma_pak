import Link from 'next/link';
import { SubOrganization } from '@/lib/types';

export default function SubOrgCard({ org }: { org: SubOrganization }) {
  return (
    <Link
      href={`/sub-organizations/${org.slug}`}
      className="group block border border-white/10 p-6 transition-colors hover:border-[#c8b89a]/70"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-medium text-[#f0eeea]">{org.name}</h2>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden bg-[#1c1c1c]">
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

      <p className="mt-4 text-sm text-white/55">{org.description}</p>
    </Link>
  );
}
