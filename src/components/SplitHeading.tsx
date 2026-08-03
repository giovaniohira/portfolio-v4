"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/SectionEyebrow";

type SplitHeadingProps = {
  eyebrow?: string;
  title: string;
  accent: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SplitHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "left",
}: SplitHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-12 flex flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-clash text-4xl font-semibold tracking-tight text-primary md:text-5xl lg:text-6xl"
      >
        <span>{title}</span>
        <span>{accent}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-xl font-satoshi text-base leading-relaxed text-secondary md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
