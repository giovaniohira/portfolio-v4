import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: `Projects by ${site.name}, from npm packages to full stack applications.`,
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <ProjectsPageContent />
      </main>
      <Footer />
    </>
  );
}
