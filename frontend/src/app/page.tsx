import HomeTopBar from '@/components/home/HomeTopBar';
import Hero from '@/components/home/Hero';
import ScrollImageReveal from '@/components/home/ScrollImageReveal';
import PresidentMessage from '@/components/home/PresidentMessage';
import WhereWeWork from '@/components/home/WhereWeWork';
import FAQSection from '@/components/home/FAQSection';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] gap-24">
      <HomeTopBar />
      <Hero />
      <ScrollImageReveal />
      <PresidentMessage />
      <WhereWeWork />
      {/* "Interested in Joining?" (InterestedSection + GalleryExplore) is
          built but intentionally not wired in yet — it'll live on the
          Gallery page once that's built out, not the home page. */}
      <FAQSection />
      <Footer />
    </div>
  );
}