// frontend/src/app/admin/(dashboard)/gallery/GalleryEditor.tsx
'use client';

import { useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { createClient } from '@/lib/supabase/client';
import type { GalleryImage } from '@/lib/types';

export default function GalleryEditor({ initialImages }: { initialImages: GalleryImage[] }) {
  const supabase = createClient();
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  return (
    <div>
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
    </div>
  );
}