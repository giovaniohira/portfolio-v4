"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SplitHeading } from "@/components/SplitHeading";
import { projects, type Project } from "@/data/site";

const categoryLabel: Record<Project["categories"][number], string> = {
  backend: "Backend",
  frontend: "Frontend",
  fullstack: "Fullstack",
};

type Filter = "all" | Project["categories"][number];

export function ProjectsPageContent() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.categories.includes(filter));
  }, [filter]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <SplitHeading
          eyebrow="My work"
          title="Project "
          accent="archive"
          subtitle="A complete list of my work, from npm packages to full stack applications."
        />

        <div className="mb-10 flex flex-wrap gap-3">
          {(["all", "backend", "frontend", "fullstack"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full border px-5 py-2.5 font-satoshi text-sm capitalize transition ${
                filter === value
                  ? "border-highlight bg-highlight/15 text-primary"
                  : "border-border text-secondary hover:border-highlight/30 hover:text-primary"
              }`}
            >
              {value === "all" ? "All" : categoryLabel[value]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-16">
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: index * 0.04 }}
              className={`group h-fit w-full ${index % 2 === 1 ? "sm:mt-14" : ""}`}
            >
              <Link href={`/projects/${project.id}`} className="block">
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
            </motion.article>
          ))}
        </div>
      </div>
    </>
  );
}
