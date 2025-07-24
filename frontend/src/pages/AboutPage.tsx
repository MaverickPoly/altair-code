/*

- TODO:

background gradients, mouse overlay, scroll animations


1. Hero
Who I am and what I do - My Logo
Tagline (motto)
Call to action Button(Explore my work, Contact me).
2. About Me
My Story, skills, passions.
scroll-triggered animations, useTransform for opacity.

3. Projects

Projects implemented by me (Cards)
Horizontal Scroll animation
Hover effects on cards.

4. Skills Page

Showcase my skills in various languages with progress bars.

5. Social Links, nicely displayed.

*/

import HeroSection from "../components/about/HeroSection.tsx";
import AboutMeSection from "../components/about/AboutMeSection.tsx";
import CustomCursor from "../components/CustomCursor.tsx";
import ProjectsSection from "../components/about/ProjectsSection.tsx";
import SkillsSection from "../components/about/SkillsSection.tsx";
import SocialLinksSection from "../components/about/SocialLinksSection.tsx";

export default function AboutPage() {
  return (
    <div className="overflow-hidden" style={{ cursor: "none" }}>
      <CustomCursor />
      <HeroSection />
      <AboutMeSection />
      <ProjectsSection />
      <SkillsSection />
      <SocialLinksSection />
    </div>
  );
}
