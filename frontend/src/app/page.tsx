// frontend/src/app/page.tsx
import { createClient } from '@/lib/supabase/server';
import Hero from '@/components/home/Hero';
import ScrollImageReveal from '@/components/home/ScrollImageReveal';
import PresidentMessage from '@/components/home/PresidentMessage';
import WhereWeWork from '@/components/home/WhereWeWork';
import InterestedSection from '@/components/home/InterestedSection';
import FAQSection from '@/components/home/FAQSection';
import Footer from '@/components/home/Footer';

export default async function Home() {
  const supabase = await createClient();

  const [{ data: images }, { data: textRows }, { data: slides }] = await Promise.all([
    supabase.from('homepage_images').select('slot_key, cloudinary_public_id'),
    supabase.from('homepage_text_content').select('key, value'),
    supabase
      .from('rush_carousel_slides')
      .select('id, cloudinary_public_id, caption, location, event_datetime')
      .order('display_order'),
  ]);

  const byKey = Object.fromEntries((images ?? []).map((i) => [i.slot_key, i.cloudinary_public_id]));
  const textByKey = Object.fromEntries((textRows ?? []).map((r) => [r.key, r.value ?? '']));

  // where_we_work_1 .. where_we_work_16 -> only the slots an officer has
  // actually uploaded a logo for get passed down to the marquee.
  const logos = Array.from({ length: 16 }, (_, i) => `where_we_work_${i + 1}`)
    .map((key) => ({ key, cloudinaryPublicId: byKey[key] as string | null }))
    .filter((logo): logo is { key: string; cloudinaryPublicId: string } => Boolean(logo.cloudinaryPublicId));

  return (
    <div className="bg-[#0a0a0a] gap-24">
      <Hero backgroundImage={byKey.hero_background ?? null} />
      <ScrollImageReveal imagePublicId={byKey.scroll_reveal ?? null} />
      <WhereWeWork logos={logos} />
      <PresidentMessage
        photoPublicId={byKey.president_photo ?? null}
        name={textByKey.president_name ?? ''}
        message={textByKey.president_message ?? ''}
      />
      <InterestedSection slides={slides ?? []} />
      <FAQSection />
      <Footer />
    </div>
  );
}