"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
};

export function Marquee({ items, reverse = false, className = "" }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-border py-4 ${className}`}>
      <div
        className={`flex w-max gap-10 whitespace-nowrap ${reverse ? "marquee-track-reverse" : "marquee-track"}`}
      >
        {doubled.map((item, i) => (
          <motion.span
            key={`${item}-${i}`}
            className="font-clash text-sm font-medium uppercase tracking-[0.2em] text-secondary md:text-base"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
