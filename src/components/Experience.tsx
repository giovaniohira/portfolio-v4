"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/site";
import { SplitHeading } from "./SplitHeading";

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SplitHeading
          eyebrow="Trajetória"
          title="Experiência "
          accent="profissional"
          subtitle="Onde trabalhei e o impacto que gerei em cada posição."
        />

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-bg-800/30 p-6 transition hover:border-highlight/25 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-clash text-xl font-semibold text-primary">
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-highlight"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <p className="mt-1 font-satoshi text-highlight">{exp.role}</p>
                </div>
                <div className="font-satoshi text-sm text-secondary md:text-right">
                  <p>{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <p className="mt-4 max-w-3xl font-satoshi text-sm leading-relaxed text-secondary md:text-base">
                {exp.summary}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
