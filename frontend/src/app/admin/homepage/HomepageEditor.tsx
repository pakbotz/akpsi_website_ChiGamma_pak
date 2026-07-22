// frontend/src/app/admin/homepage/HomepageEditor.tsx
'use client';

import { useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { createClient } from '@/lib/supabase/client';

type CarouselSlide = { id: string; cloudinary_public_id: string | null; caption: string };

const FIXED_SLOTS = [
  { key: 'hero_background', label: 'Hero background photo' },
  { key: 'scroll_reveal', label: 'Scroll-reveal photo' },
  { key: 'president_photo', label: "President's photo" },
] as const;

// Shared by both the fixed sections and each carousel slide — the upload
// mechanics (open the widget, get a public_id back, save it) never change;
// only what "onUploaded" does with the result differs per caller.
function ImageUploadCard({
  label,
  publicId,
  saving,
  onUploaded,
  captionValue,
  onCaptionChange,
  onCaptionBlur,
}: {
  label: string;
  publicId: string | null;
  saving: boolean;
  onUploaded: (publicId: string) => void;
  captionValue?: string;
  onCaptionChange?: (value: string) => void;
  onCaptionBlur?: (value: string) => void;
}) {
  return (
    <div className="border border-white/10 p-4">
      {onCaptionChange === undefined && <p className="mb-3 text-sm text-white/70">{label}</p>}
      <div className="relative mb-3 aspect-[4/5] w-full overflow-hidden bg-[#1c1c1c]">
        {publicId ? (
          <CldImage src={publicId} alt={label} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">No image yet</span>
          </div>
        )}
      </div>
      {onCaptionChange && (
        <input
          value={captionValue}
          onChange={(e) => onCaptionChange(e.target.value)}
          onBlur={(e) => onCaptionBlur?.(e.target.value)}
          className="mb-3 w-full border-b border-white/20 bg-transparent py-1 text-xs uppercase tracking-[0.1em] text-white/70 focus:border-[#c8b89a] focus:outline-none"
        />
      )}
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
            className="w-full border border-white/25 py-2 text-xs uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a] disabled:opacity-40"
          >
            {saving ? 'Saving…' : publicId ? 'Replace photo' : 'Upload photo'}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}

export default function HomepageEditor({
  initialImages,
  initialSlides,
}: {
  initialImages: { slot_key: string; cloudinary_public_id: string | null }[];
  initialSlides: CarouselSlide[];
}) {
  const [images, setImages] = useState<Record<string, string | null>>(
    Object.fromEntries(initialImages.map((img) => [img.slot_key, img.cloudinary_public_id]))
  );
  const [slides, setSlides] = useState<CarouselSlide[]>(initialSlides);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const supabase = createClient();

  async function saveFixedSlot(slotKey: string, publicId: string) {
    setSavingKey(slotKey);
    await supabase
      .from('homepage_images')
      .update({ cloudinary_public_id: publicId, updated_at: new Date().toISOString() })
      .eq('slot_key', slotKey);
    setImages((prev) => ({ ...prev, [slotKey]: publicId }));
    setSavingKey(null);
  }

  async function saveSlideImage(id: string, publicId: string) {
    setSavingKey(id);
    await supabase
      .from('rush_carousel_slides')
      .update({ cloudinary_public_id: publicId, updated_at: new Date().toISOString() })
      .eq('id', id);
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, cloudinary_public_id: publicId } : s)));
    setSavingKey(null);
  }

  async function saveSlideCaption(id: string, caption: string) {
    await supabase.from('rush_carousel_slides').update({ caption }).eq('id', id);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-16 text-[#f0eeea]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-2xl font-medium">Homepage Images</h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = '/admin/login';
            }}
            className="text-xs uppercase tracking-[0.15em] text-white/50 hover:text-white"
          >
            Sign out
          </button>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">Fixed sections</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FIXED_SLOTS.map(({ key, label }) => (
              <ImageUploadCard
                key={key}
                label={label}
                publicId={images[key] ?? null}
                saving={savingKey === key}
                onUploaded={(publicId) => saveFixedSlot(key, publicId)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
            &quot;Interested in Joining?&quot; carousel
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {slides.map((slide) => (
              <ImageUploadCard
                key={slide.id}
                label={slide.caption}
                publicId={slide.cloudinary_public_id}
                saving={savingKey === slide.id}
                onUploaded={(publicId) => saveSlideImage(slide.id, publicId)}
                captionValue={slide.caption}
                onCaptionChange={(value) =>
                  setSlides((prev) => prev.map((s) => (s.id === slide.id ? { ...s, caption: value } : s)))
                }
                onCaptionBlur={(value) => saveSlideCaption(slide.id, value)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}