'use client';

import { CldUploadWidget } from 'next-cloudinary';
import type { ReactNode } from 'react';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Same widget as ImageUploadCard, for the handful of columns that store a
 * plain delivery URL instead of a cloudinary_public_id (e.g. sub_organizations
 * .logo_url, sub_org_team_members.photo_url) — the public pages render these
 * with a plain <img>, not CldImage, so this converts the uploaded public_id
 * into a full URL before handing it back to the caller.
 */
export default function UrlImageUploadCard({
  label,
  url,
  saving = false,
  onUploaded,
  variant = 'portrait',
  compact = false,
  children,
}: {
  label: string;
  url: string | null;
  saving?: boolean;
  onUploaded: (url: string) => void;
  variant?: 'portrait' | 'square';
  compact?: boolean;
  children?: ReactNode;
}) {
  const aspectClass = variant === 'square' ? 'aspect-square' : 'aspect-[4/5]';

  return (
    <div className={compact ? 'border border-white/10 p-2' : 'border border-white/10 p-4'}>
      <p
        className={
          compact
            ? 'mb-2 truncate text-[11px] text-white/60'
            : 'mb-3 text-sm text-white/70'
        }
      >
        {label}
      </p>

      <div className={`relative mb-3 w-full overflow-hidden bg-[#1c1c1c] ${aspectClass}`}>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
              No image yet
            </span>
          </div>
        )}
      </div>

      {children}

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{ sources: ['local'], singleUploadAutoClose: true }}
        onSuccess={(result) => {
          if (result.info && typeof result.info === 'object' && 'public_id' in result.info) {
            onUploaded(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${result.info.public_id}`);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={saving}
            className={
              compact
                ? 'mt-2 w-full border border-white/25 py-1.5 text-[10px] uppercase tracking-[0.1em] text-white/70 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a] disabled:opacity-40'
                : 'w-full border border-white/25 py-2 text-xs uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a] disabled:opacity-40'
            }
          >
            {saving ? 'Saving…' : url ? 'Replace photo' : 'Upload photo'}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
