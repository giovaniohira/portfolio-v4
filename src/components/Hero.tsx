"use client";

import { motion } from "framer-motion";
import { marqueeItems, site } from "@/data/site";
import { MarqueeBand } from "./Marquee";

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, external: true },
  { label: "GitHub", href: site.social.github, external: true },
  { label: "Medium", href: site.social.medium, external: true },
  { label: "Gmail", href: `mailto:${site.email}`, external: false },
];

function ExternalArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M7 7h10v10M7 17 17 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative">
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-12 md:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 font-satoshi text-base text-primary md:text-lg"
        >
          Hi! I&apos;m {site.name.split(" ")[0]},
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-clash text-[3rem] font-medium leading-none text-pretty text-primary md:text-6xl lg:w-3/4 lg:text-7xl"
        >
          {site.heroHeadline.before}
          <span className="text-highlight">{site.heroHeadline.accent}</span>
          {site.heroHeadline.after}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-col gap-4 md:flex-row md:items-center"
        >
          <div className="hidden h-px shrink-0 bg-bg-600 md:block md:w-1/2 lg:w-3/5" />
          <p className="w-full text-pretty font-satoshi text-base leading-relaxed text-secondary">
            {site.description}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="group/socials mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 font-satoshi text-sm uppercase text-secondary transition-colors duration-300 group-hover/socials:text-white/25 hover:!text-primary"
              >
                {s.label}
                <ExternalArrow />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>

      <MarqueeBand items={marqueeItems} className="mt-20 md:mt-32" />
    </section>
  );
}
