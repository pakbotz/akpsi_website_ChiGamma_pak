// frontend/src/app/admin/(dashboard)/homepage/HomepageEditor.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ImageUploadCard from '@/components/admin/ImageUploadCard';
import EditableField from '@/components/admin/EditableField';
import type { RushCarouselSlide } from '@/lib/types';

const WHERE_WE_WORK_SLOTS = Array.from({ length: 16 }, (_, i) => ({
  key: `where_we_work_${i + 1}`,
  label: `Logo ${i + 1}`,
}));

type ImageRow = { slot_key: string; cloudinary_public_id: string | null };
type TextRow = { key: string; value: string | null };

// One section per homepage component, in the same order they appear on the
// page (Hero -> Scroll Reveal -> President's Message -> Where We Work ->
// Interested in Joining -> FAQ), so this file reads top-to-bottom the same
// way the homepage itself does.
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16 border-b border-white/10 pb-16 last:border-0">
      <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">{title}</h2>
      {children}
    </section>
  );
}

export default function HomepageEditor({
  initialImages,
  initialText,
  initialSlides,
}: {
  initialImages: ImageRow[];
  initialText: TextRow[];
  initialSlides: RushCarouselSlide[];
}) {
  const supabase = createClient();

  const [images, setImages] = useState<Record<string, string | null>>(
    Object.fromEntries(initialImages.map((img) => [img.slot_key, img.cloudinary_public_id]))
  );
  const [text, setText] = useState<Record<string, string>>(
    Object.fromEntries(initialText.map((row) => [row.key, row.value ?? '']))
  );
  const [slides, setSlides] = useState<RushCarouselSlide[]>(initialSlides);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  async function saveImageSlot(slotKey: string, publicId: string) {
    setSavingKey(slotKey);
    await supabase
      .from('homepage_images')
      .update({ cloudinary_public_id: publicId, updated_at: new Date().toISOString() })
      .eq('slot_key', slotKey);
    setImages((prev) => ({ ...prev, [slotKey]: publicId }));
    setSavingKey(null);
  }

  async function saveText(key: string, value: string) {
    setSavingKey(`text:${key}`);
    await supabase
      .from('homepage_text_content')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key);
    setSavingKey(null);
  }

  async function saveSlideImage(id: string, publicId: string) {
    setSavingKey(id);
    await supabase
      .from('rush_carousel_slides')
      .update({ cloudinary_public_id: publicId })
      .eq('id', id);
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, cloudinary_public_id: publicId } : s)));
    setSavingKey(null);
  }

  async function saveSlideField(
    id: string,
    field: 'caption' | 'location' | 'event_datetime',
    value: string
  ) {
    setSavingKey(`slide:${id}:${field}`);
    await supabase.from('rush_carousel_slides').update({ [field]: value }).eq('id', id);
    setSavingKey(null);
  }

  return (
    <div>
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <Section title="Hero">
        <div className="max-w-xs">
          <ImageUploadCard
            label="Hero background photo"
            publicId={images.hero_background ?? null}
            saving={savingKey === 'hero_background'}
            onUploaded={(id) => saveImageSlot('hero_background', id)}
          />
        </div>
      </Section>

      {/* ── 2. Scroll-reveal image ─────────────────────────────────────── */}
      <Section title="Scroll Image Reveal">
        <div className="max-w-xs">
          <ImageUploadCard
            label="Scroll-reveal photo"
            publicId={images.scroll_reveal ?? null}
            saving={savingKey === 'scroll_reveal'}
            onUploaded={(id) => saveImageSlot('scroll_reveal', id)}
          />
        </div>
      </Section>

      {/* ── 3. President's Message ──────────────────────────────────── */}
      <Section title="President's Message">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="max-w-xs">
            <ImageUploadCard
              label="President's photo"
              publicId={images.president_photo ?? null}
              saving={savingKey === 'president_photo'}
              onUploaded={(id) => saveImageSlot('president_photo', id)}
            />
          </div>
          <div className="flex flex-col gap-6">
            <EditableField
              label="Name"
              value={text.president_name ?? ''}
              onChange={(value) => setText((prev) => ({ ...prev, president_name: value }))}
              onCommit={(value) => saveText('president_name', value)}
              saving={savingKey === 'text:president_name'}
            />
            <EditableField
              label="Message"
              value={text.president_message ?? ''}
              onChange={(value) => setText((prev) => ({ ...prev, president_message: value }))}
              onCommit={(value) => saveText('president_message', value)}
              multiline
              saving={savingKey === 'text:president_message'}
            />
          </div>
        </div>
      </Section>

      {/* ── 4. Where We Work ────────────────────────────────────────── */}
      <Section title="Where We Work — 16 company logos">
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
          {WHERE_WE_WORK_SLOTS.map(({ key, label }) => (
            <ImageUploadCard
              key={key}
              label={label}
              publicId={images[key] ?? null}
              saving={savingKey === key}
              onUploaded={(id) => saveImageSlot(key, id)}
              variant="square"
              compact
            />
          ))}
        </div>
      </Section>

      {/* ── 5. Interested in Joining? (Rush carousel) ───────────────── */}
      <Section title='"Interested in Joining?" carousel — 4 photos'>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {slides.map((slide) => (
            <ImageUploadCard
              key={slide.id}
              label={slide.caption || 'Untitled slide'}
              publicId={slide.cloudinary_public_id}
              saving={savingKey === slide.id}
              onUploaded={(id) => saveSlideImage(slide.id, id)}
            >
              <div className="mb-3 flex flex-col gap-3">
                <EditableField
                  label="Caption"
                  value={slide.caption}
                  onChange={(value) =>
                    setSlides((prev) =>
                      prev.map((s) => (s.id === slide.id ? { ...s, caption: value } : s))
                    )
                  }
                  onCommit={(value) => saveSlideField(slide.id, 'caption', value)}
                  saving={savingKey === `slide:${slide.id}:caption`}
                />
                <EditableField
                  label="Location (🗒)"
                  value={slide.location ?? ''}
                  onChange={(value) =>
                    setSlides((prev) =>
                      prev.map((s) => (s.id === slide.id ? { ...s, location: value } : s))
                    )
                  }
                  onCommit={(value) => saveSlideField(slide.id, 'location', value)}
                  placeholder="e.g. Kresge Town Hall"
                  saving={savingKey === `slide:${slide.id}:location`}
                />
                <EditableField
                  label="Date & Time (⚲)"
                  value={slide.event_datetime ?? ''}
                  onChange={(value) =>
                    setSlides((prev) =>
                      prev.map((s) => (s.id === slide.id ? { ...s, event_datetime: value } : s))
                    )
                  }
                  onCommit={(value) => saveSlideField(slide.id, 'event_datetime', value)}
                  placeholder="e.g. Nov 4, 7:00 PM"
                  saving={savingKey === `slide:${slide.id}:event_datetime`}
                />
              </div>
            </ImageUploadCard>
          ))}
        </div>
      </Section>

      {/* ── 6. FAQ ──────────────────────────────────────────────────── */}
      <Section title="Frequently Asked Questions">
        <p className="text-sm text-white/40">
          This section is hardcoded in <code className="text-white/60">FAQSection.tsx</code> —
          nothing to manage here.
        </p>
      </Section>
    </div>
  );
}