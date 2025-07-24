import HeroSection from "../components/sections/HeroSection.tsx";
import { FeaturesSection } from "../components/sections/FeaturesSection.tsx";
import MarqueeSection from "../components/sections/MarqueSection.tsx";
import Footer from "../components/Footer.tsx";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <MarqueeSection />
      <Footer />
    </div>
  );
}
