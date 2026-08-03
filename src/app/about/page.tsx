import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { SkillPillsMarquee } from "@/components/about/SkillPillsMarquee";
import { AboutExperienceList } from "@/components/about/AboutExperienceList";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: aboutDescription(),
};

function aboutDescription() {
  return `Meet ${site.name}: full stack engineer, UI/UX, and professional journey.`;
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <SkillPillsMarquee />
        <AboutExperienceList />
      </main>
      <Footer />
    </>
  );
}
