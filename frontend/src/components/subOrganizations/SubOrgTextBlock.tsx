import { SubOrganizationMedia } from '@/lib/types';

export default function SubOrgTextBlock({
  heading,
  media,
  placeholder,
}: {
  heading: string;
  media: SubOrganizationMedia | undefined;
  placeholder: string;
}) {
  return (
    <div className="border border-white/10 p-8">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#c8b89a]">
        {heading}
      </p>
      {media?.content ? (
        <p className="text-sm leading-relaxed text-white/60">{media.content}</p>
      ) : (
        <p className="text-sm leading-relaxed text-white/25">{placeholder}</p>
      )}
    </div>
  );
}
