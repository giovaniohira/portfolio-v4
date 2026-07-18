"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/site";
import { SplitHeading } from "./SplitHeading";

const featured = projects.filter((p) => p.featured);

export function Projects() {
  return (
    <section id="projects" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SplitHeading
          eyebrow="Meu trabalho"
          title="Projetos "
          accent="selecionados"
          subtitle="Uma curadoria dos projetos que melhor mostram minha expertise em desenvolvimento e design de interface."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-bg-800/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-900 via-bg-900/20 to-transparent" />
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-border px-3 py-1 font-satoshi text-xs capitalize text-secondary"
                    >
                      {cat === "development" ? "Desenvolvimento" : "Design"}
                    </span>
                  ))}
                  <span className="rounded-full border border-border px-3 py-1 font-satoshi text-xs text-secondary">
                    {project.year}
                  </span>
                </div>

                <h3 className="font-clash text-2xl font-semibold tracking-tight text-primary">{project.title}</h3>
                <p className="mt-3 font-satoshi text-sm leading-relaxed text-secondary md:text-base">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-satoshi text-sm text-highlight hover:opacity-80"
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-satoshi text-sm text-highlight hover:opacity-80"
                    >
                      Demo
                    </a>
                  )}
                  {project.links.npm && (
                    <a
                      href={project.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-satoshi text-sm text-highlight hover:opacity-80"
                    >
                      npm
                    </a>
                  )}
                  {project.links.article && (
                    <a
                      href={project.links.article}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-satoshi text-sm text-highlight hover:opacity-80"
                    >
                      Artigo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/giovaniohira"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-satoshi text-sm text-primary transition hover:border-highlight/40 hover:bg-highlight/10"
          >
            Ver todos no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
