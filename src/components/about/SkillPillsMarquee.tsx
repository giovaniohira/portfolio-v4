"use client";

import Image from "next/image";
import { aboutSkills } from "@/data/site";

export function SkillPillsMarquee() {
  const doubled = [...aboutSkills, ...aboutSkills];

  return (
    <section aria-label="Tech stack" className="border-y border-border py-6">
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-3">
          {doubled.map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              className="inline-flex w-fit min-w-fit items-center gap-2 rounded-full border border-transparent bg-bg-800 px-4 py-2 text-sm text-primary shadow"
            >
              <span className="relative h-[18px] w-[18px] shrink-0">
                <Image
                  src={skill.icon}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="18px"
                  aria-hidden
                />
              </span>
              {skill.name}
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-900 to-transparent sm:w-24 md:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-900 to-transparent sm:w-24 md:w-32"
        />
      </div>
    </section>
  );
}
