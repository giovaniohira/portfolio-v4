"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { aboutText } from "@/data/site";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-20 pb-10 md:px-8 md:pt-24 md:pb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionEyebrow>About me</SectionEyebrow>
      </motion.div>

      <ScrollRevealText
        scrollTargetRef={sectionRef}
        text={aboutText}
        center
        className="mx-auto max-w-5xl font-satoshi text-2xl font-medium tracking-wide sm:text-3xl md:text-[2rem] md:leading-snug"
      />
    </section>
  );
}
