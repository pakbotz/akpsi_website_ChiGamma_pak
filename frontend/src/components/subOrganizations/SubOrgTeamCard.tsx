import { SubOrgTeamMember } from '@/lib/types';

export default function SubOrgTeamCard({ member }: { member: SubOrgTeamMember }) {
  return (
    <div className="flex w-full gap-6 border border-white/10 p-6">
      <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden bg-[#1c1c1c] sm:w-48">
        {member.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo_url}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-2 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
              Placeholder Photo
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-[#f0eeea]">{member.name}</h3>
        {member.position && (
          <p className="mt-1 text-sm text-[#c8b89a]">{member.position}</p>
        )}
        {member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-white/60">{member.bio}</p>
        )}
      </div>
    </div>
  );
}
