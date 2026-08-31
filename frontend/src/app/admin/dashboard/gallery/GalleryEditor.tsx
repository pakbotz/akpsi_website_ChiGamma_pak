// frontend/src/app/admin/(dashboard)/gallery/GalleryEditor.tsx
'use client';

import { useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { createClient } from '@/lib/supabase/client';
import ImageUploadCard from '@/components/admin/ImageUploadCard';
import EditableField from '@/components/admin/EditableField';
import type { GalleryImage, GalleryEvent } from '@/lib/types';

export default function GalleryEditor({
  initialImages,
  initialEvents,
}: {
  initialImages: GalleryImage[];
  initialEvents: GalleryEvent[];
}) {
  const supabase = createClient();
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [events, setEvents] = useState<GalleryEvent[]>(initialEvents);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // ── Main photo grid (gallery_images) ─────────────────────────────
  async function addImage(publicId: string) {
    const { data, error } = await supabase
      .from('gallery_images')
      .insert({ cloudinary_public_id: publicId })
      .select('id, cloudinary_public_id, created_at')
      .single();
    if (!error && data) {
      setImages((prev) => [data, ...prev]);
    }
  }

  async function removeImage(id: string) {
    if (!confirm('Remove this photo from the gallery?')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    setImages((prev) => prev.filter((img) => img.id !== id));
    // Note: this only removes the reference from the gallery list — the
    // asset itself still lives in your Cloudinary media library and can be
    // deleted there too if you want it gone for good.
  }

  // ── Events carousel (gallery_events) ─────────────────────────────
  // A separate, hand-curated table from gallery_images above — each row
  // gets its own caption and an explicit display order, which the plain
  // photo grid doesn't need. Rows can exist with a caption but no photo
  // yet (mid-edit); getGalleryEvents() filters those out of the public
  // carousel until an image is attached.
  async function addEvent() {
    const { data, error } = await supabase
      .from('gallery_events')
      .insert({ caption: 'New Event', sort_order: events.length })
      .select('id, cloudinary_public_id, caption, sort_order, created_at')
      .single();
    if (!error && data) setEvents((prev) => [...prev, data]);
  }

  async function removeEvent(id: string) {
    if (!confirm('Remove this event from the carousel?')) return;
    await supabase.from('gallery_events').delete().eq('id', id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  async function saveEventImage(id: string, publicId: string) {
    setSavingKey(id);
    await supabase.from('gallery_events').update({ cloudinary_public_id: publicId }).eq('id', id);
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, cloudinary_public_id: publicId } : e))
    );
    setSavingKey(null);
  }

  async function saveEventCaption(id: string, caption: string) {
    setSavingKey(`caption:${id}`);
    await supabase.from('gallery_events').update({ caption }).eq('id', id);
    setSavingKey(null);
  }

  // Reordering: swap the moved row with its neighbor locally, reassign
  // sort_order sequentially across the whole list, then persist every row
  // whose order actually changed. No drag-and-drop library needed for a
  // small hand-picked list like this — plain up/down is enough.
  async function persistOrder(rows: GalleryEvent[]) {
    await Promise.all(
      rows.map((r) =>
        supabase.from('gallery_events').update({ sort_order: r.sort_order }).eq('id', r.id)
      )
    );
  }

  function moveEvent(id: string, direction: 'up' | 'down') {
    setEvents((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      const swapWith = direction === 'up' ? idx - 1 : idx + 1;
      if (idx === -1 || swapWith < 0 || swapWith >= prev.length) return prev;

      const next = [...prev];
      [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
      const reindexed = next.map((e, i) => ({ ...e, sort_order: i }));
      void persistOrder(reindexed);
      return reindexed;
    });
  }

  return (
    <div>
      {/* ── Main photo grid ───────────────────────────────────────── */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Gallery</h1>

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{ sources: ['local'], multiple: true }}
          onSuccess={(result) => {
            setUploading(true);
            if (result.info && typeof result.info === 'object' && 'public_id' in result.info) {
              addImage(result.info.public_id as string);
            }
          }}
          onQueuesEnd={() => setUploading(false)}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a]"
            >
              {uploading ? 'Uploading…' : '+ Upload photos'}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {images.length === 0 ? (
        <p className="text-sm text-white/40">No photos yet — upload as many as you&apos;d like above.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {images.map((img) => (
            <div key={img.id} className="group relative">
              <button
                onClick={() => setPreviewId(img.cloudinary_public_id)}
                className="relative block aspect-square w-full overflow-hidden bg-[#1c1c1c]"
              >
                <CldImage
                  src={img.cloudinary_public_id}
                  alt="Gallery photo"
                  fill
                  crop="fill"
                  gravity="auto"
                  className="object-cover transition-opacity group-hover:opacity-70"
                />
              </button>
              <button
                onClick={() => removeImage(img.id)}
                className="absolute right-1 top-1 bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-white/70 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {previewId && (
        <div
          onClick={() => setPreviewId(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8"
        >
          <div className="relative aspect-[4/3] w-full max-w-3xl">
            <CldImage src={previewId} alt="Gallery preview" fill className="object-contain" />
          </div>
        </div>
      )}

      {/* ── Events carousel ───────────────────────────────────────── */}
      <section className="mt-16 border-t border-white/10 pt-16">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium">Events</h2>
            <p className="mt-1 max-w-md text-sm text-white/40">
              The curated, captioned reel shown on the public Gallery page — separate from the
              photo grid above. Use the arrows on each card to set display order.
            </p>
          </div>
          <button
            onClick={addEvent}
            className="border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a]"
          >
            + Add Event
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-sm text-white/40">
            No events yet — add one above to start the carousel.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event, i) => (
              <ImageUploadCard
                key={event.id}
                label={event.caption || 'Untitled event'}
                publicId={event.cloudinary_public_id}
                saving={savingKey === event.id}
                onUploaded={(id) => saveEventImage(event.id, id)}
              >
                <div className="mb-3 flex flex-col gap-3">
                  <EditableField
                    label="Caption"
                    value={event.caption}
                    onChange={(value) =>
                      setEvents((prev) =>
                        prev.map((e) => (e.id === event.id ? { ...e, caption: value } : e))
                      )
                    }
                    onCommit={(value) => saveEventCaption(event.id, value)}
                    saving={savingKey === `caption:${event.id}`}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <button
                        onClick={() => moveEvent(event.id, 'up')}
                        disabled={i === 0}
                        className="text-xs uppercase tracking-[0.1em] text-white/40 hover:text-[#c8b89a] disabled:opacity-25 disabled:hover:text-white/40"
                      >
                        ↑ Move up
                      </button>
                      <button
                        onClick={() => moveEvent(event.id, 'down')}
                        disabled={i === events.length - 1}
                        className="text-xs uppercase tracking-[0.1em] text-white/40 hover:text-[#c8b89a] disabled:opacity-25 disabled:hover:text-white/40"
                      >
                        ↓ Move down
                      </button>
                    </div>
                    <button
                      onClick={() => removeEvent(event.id)}
                      className="text-xs uppercase tracking-[0.1em] text-white/30 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </ImageUploadCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}