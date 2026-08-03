import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: "Selected projects and full archive — full stack development, UI/UX, and quality engineering.",
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
