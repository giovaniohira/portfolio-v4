"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { expertiseAreas } from "@/data/site";
import { SplitHeading } from "./SplitHeading";

export function Expertise() {
  const [active, setActive] = useState<(typeof expertiseAreas)[number]["id"]>(
    expertiseAreas[0].id,
  );
  const current = expertiseAreas.find((a) => a.id === active) ?? expertiseAreas[0];
  const doubled = [...current.skills, ...current.skills];

  return (
    <section id="expertise" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SplitHeading
          eyebrow="Especialidade"
          title="Áreas de "
          accent="expertise"
          subtitle="Do código à interface — domínio técnico com sensibilidade para experiência do usuário."
          align="center"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {expertiseAreas.map((area) => (
            <button
              key={area.id}
              type="button"
              onClick={() => setActive(area.id)}
              className={`rounded-full border px-5 py-2.5 font-satoshi text-sm transition ${
                active === area.id
                  ? "border-highlight bg-highlight/15 text-primary"
                  : "border-border text-secondary hover:border-highlight/30 hover:text-primary"
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-2xl border border-border bg-bg-800/30 py-6"
          >
            <div className="marquee-track flex w-max gap-8">
              {doubled.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="flex items-center gap-3 whitespace-nowrap font-clash text-lg font-medium text-secondary md:text-xl"
                >
                  <span className="h-2 w-2 rounded-full bg-highlight" />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
