import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProjectById, projects, site } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    return { title: `Project — ${site.name}` };
  }

  return {
    title: `${project.title} — ${site.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.id === slug);
  const project = projects[index];

  if (!project) notFound();

  return (
    <>
      <Header />
      <main>
        <ProjectDetail
          project={project}
          prev={index > 0 ? projects[index - 1] : undefined}
          next={index < projects.length - 1 ? projects[index + 1] : undefined}
        />
      </main>
      <Footer />
    </>
  );
}
