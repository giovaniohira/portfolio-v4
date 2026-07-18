"use client";

import { motion } from "framer-motion";
import { aboutText } from "@/data/site";
import { SplitHeading } from "./SplitHeading";

function AboutChar({ char }: { char: string }) {
  if (char === " ") {
    return <span className="inline-block w-[0.25em]" />;
  }

  return (
    <span className="group relative inline-block cursor-default">
      <span className="inline-block transition-opacity duration-200 group-hover:opacity-0">
        {char}
      </span>
      <span className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {char}
      </span>
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SplitHeading
          eyebrow="Sobre mim"
          title="Quem "
          accent="sou"
          subtitle="Engenheiro de software com olhar de produto — código limpo, interfaces claras e decisões que escalam."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-satoshi text-lg leading-relaxed text-secondary md:text-xl md:leading-relaxed"
          >
            {aboutText.split("").map((char, i) => (
              <AboutChar key={`${char}-${i}`} char={char} />
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              { label: "Experiência", value: "2+ anos" },
              { label: "Localização", value: "Curitiba, BR" },
              { label: "Foco atual", value: "Full Stack + UI/UX" },
              { label: "Disponível", value: "Para novos projetos" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-bg-800/50 p-6 transition hover:border-highlight/30"
              >
                <p className="font-satoshi text-xs uppercase tracking-wider text-secondary">
                  {item.label}
                </p>
                <p className="mt-2 font-clash text-lg font-medium text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
