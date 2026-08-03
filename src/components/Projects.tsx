"use client";

import Image from "next/image";
import Link from "next/link";
import { OutlineButton } from "@/components/OutlineButton";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { projects, type Project } from "@/data/site";

const featured = projects.filter((p) => p.featured);

const categoryLabel: Record<Project["categories"][number], string> = {
  backend: "Backend",
  frontend: "Frontend",
  fullstack: "Fullstack",
};

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:px-8 md:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionEyebrow>My work</SectionEyebrow>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-clash text-4xl font-medium leading-none tracking-tight text-primary md:text-5xl lg:text-6xl"
      >
        Selected projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-4 max-w-xl text-pretty font-satoshi text-secondary"
      >
        A curated selection of projects that best showcase my expertise and the results achieved.
      </motion.p>

      <div className="grid grid-cols-1 gap-y-10 py-10 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-0">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ delay: i * 0.06 }}
            className="group h-fit w-full sm:even:mt-14"
          >
            <Link href={`/projects/${project.id}`} className="block h-fit w-full">
              <div className="aspect-3/2 w-full overflow-hidden rounded-3xl bg-bg-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="aspect-3/2 w-full object-cover transition duration-300 group-hover:scale-[1.015]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="mt-2 space-y-1.5">
                <h3 className="font-clash text-xl font-medium text-primary">{project.title}</h3>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex rounded-full bg-bg-800 px-3 py-1 font-satoshi text-sm text-primary"
                      >
                        {categoryLabel[cat]}
                      </span>
                    ))}
                  </div>
                  <p className="shrink-0 font-satoshi text-sm text-secondary">{project.year}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-4 text-center"
      >
        <OutlineButton href="/projects" className="mx-auto block">
          View all projects
        </OutlineButton>
      </motion.div>
    </section>
  );
}
