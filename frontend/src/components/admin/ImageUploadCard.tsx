'use client';

import { CldImage, CldUploadWidget } from 'next-cloudinary';
import type { ReactNode } from 'react';

/**
 * Reusable Cloudinary upload card — this is the same widget the original
 * Homepage editor built (open widget -> get public_id back -> caller decides
 * how to persist it), pulled out so Brothers, Careers, Gallery, and Homepage
 * all share one implementation instead of four copies. If the upload UX ever
 * needs to change (different widget options, a delete button, etc.) it only
 * needs to change here.
 */
export default function ImageUploadCard({
  label,
  publicId,
  saving = false,
  onUploaded,
  variant = 'portrait',
  compact = false,
  children,
}: {
  label: string;
  publicId: string | null;
  saving?: boolean;
  onUploaded: (publicId: string) => void;
  /** 'portrait' (4:5, the default used everywhere on the homepage) or
   *  'square' (1:1, used for smaller grids like the 16 Where We Work logos). */
  variant?: 'portrait' | 'square';
  /** Shrinks text/padding for tight grids (e.g. 16 logo slots at once). */
  compact?: boolean;
  /** Extra fields to render under the image but above the upload button —
   *  e.g. a caption or location input for a carousel slide. */
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
        {publicId ? (
          <CldImage
            src={publicId}
            alt={label}
            fill
            crop="fill"
            gravity="auto"
            className="object-cover"
          />
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
            onUploaded(result.info.public_id as string);
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
            {saving ? 'Saving…' : publicId ? 'Replace photo' : 'Upload photo'}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}