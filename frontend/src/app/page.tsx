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

  const [{ data: images }, { data: slides }] = await Promise.all([
    supabase.from('homepage_images').select('slot_key, cloudinary_public_id'),
    supabase.from('rush_carousel_slides').select('cloudinary_public_id, caption').order('display_order'),
  ]);

  const byKey = Object.fromEntries((images ?? []).map((i) => [i.slot_key, i.cloudinary_public_id]));

  return (
    <div className="bg-[#0a0a0a] gap-24">
      <Hero backgroundImage={byKey.hero_background ?? null} />
      <ScrollImageReveal imagePublicId={byKey.scroll_reveal ?? null} />
      <PresidentMessage photoPublicId={byKey.president_photo ?? null} />
      <WhereWeWork />
      <InterestedSection slides={slides ?? []} />
      <FAQSection />
      <Footer />
    </div>
  );
}