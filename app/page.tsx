import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import MissionSection from '@/components/landing/MissionSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CategoriesSection from '@/components/landing/CategoriesSection';
import FeaturedTalentsSection from '@/components/landing/FeaturedTalentsSection';
import VolunteerSection from '@/components/landing/VolunteerSection';
import SponsorSection from '@/components/landing/SponsorSection';
import ImpactStatsSection from '@/components/landing/ImpactStatsSection';
import TestimonialsPreview from '@/components/landing/TestimonialsPreview';
import FinalCTASection from '@/components/landing/FinalCTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <HowItWorksSection />
        <CategoriesSection />
        <FeaturedTalentsSection />
        <VolunteerSection />
        <SponsorSection />
        <ImpactStatsSection />
        <TestimonialsPreview />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
