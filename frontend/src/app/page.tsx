import ContactSection from "@/components/Landing Page/Contact Us/ContactSection";
import { FeatureSection } from "@/components/Landing Page/FeatureSection";
import HeroSection from "@/components/Landing Page/HeroSection";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeatureSection />
      <ContactSection />
    </div>
  );
}
