"use client";

import { motion } from "framer-motion";
import { marqueeItems, site } from "@/data/site";
import { Marquee } from "./Marquee";

const socials = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "GitHub", href: site.social.github },
  { label: "Medium", href: site.social.medium },
  { label: "Email", href: `mailto:${site.email}` },
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] pt-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="gradient-orb absolute -left-32 top-20 h-96 w-96 rounded-full blur-3xl" />
        <div className="gradient-orb absolute -right-20 bottom-20 h-80 w-80 rounded-full blur-3xl opacity-60" />
        <div className="noise-overlay absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-satoshi text-sm text-secondary"
        >
          Oi! Sou {site.name.split(" ")[0]},
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-clash max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-primary md:text-6xl lg:text-7xl"
        >
          {site.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl font-satoshi text-base leading-relaxed text-secondary md:text-lg"
        >
          {site.description}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.label === "Email" ? undefined : "_blank"}
                rel={s.label === "Email" ? undefined : "noopener noreferrer"}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-satoshi text-sm text-secondary transition hover:border-highlight/40 hover:text-primary"
              >
                {s.label}
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 inline-flex w-fit items-center gap-2 font-satoshi text-sm text-highlight hover:opacity-80"
        >
          Conheça meu trabalho
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M8 3v10M8 13l4-4M8 13L4 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>

      <Marquee items={marqueeItems} />
      <Marquee items={[...marqueeItems].reverse()} reverse className="border-t-0" />
    </section>
  );
}
