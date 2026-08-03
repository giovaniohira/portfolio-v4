"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { experiences } from "@/data/site";
import { SectionEyebrow } from "@/components/SectionEyebrow";

function CompanyLogo({ name, logo }: { name: string; logo?: string }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={50}
        height={50}
        className="mr-2 aspect-square h-10 w-10 rounded-full border border-bg-600 bg-bg-800 object-cover"
      />
    );
  }

  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span className="mr-2 flex aspect-square h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bg-600 bg-bg-800 font-satoshi text-xs font-medium text-primary">
      {initials}
    </span>
  );
}

export function AboutExperienceList() {
  const [openId, setOpenId] = useState<string | null>(null);
  const scrollLockRef = useRef<number | null>(null);
  const lenis = useLenis();

  const toggle = useCallback((id: string) => {
    scrollLockRef.current = window.scrollY;
    setOpenId((current) => (current === id ? null : id));
  }, []);

  useLayoutEffect(() => {
    const y = scrollLockRef.current;
    if (y === null) return;

    const restore = () => {
      if (lenis) {
        lenis.scrollTo(y, { immediate: true, force: true });
      }
      window.scrollTo({ top: y, left: 0, behavior: "instant" });
    };

    restore();
    const started = performance.now();
    let frame = 0;

    const lockScroll = (now: number) => {
      restore();
      if (now - started < 320) {
        frame = requestAnimationFrame(lockScroll);
      }
    };

    frame = requestAnimationFrame(lockScroll);

    return () => cancelAnimationFrame(frame);
  }, [openId, lenis]);

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-24 sm:flex-row sm:gap-12 md:px-8">
      <div>
        <SectionEyebrow>Journey</SectionEyebrow>
        <h2 className="mb-4 font-clash text-4xl font-medium text-primary md:text-5xl">Experience</h2>
        <p className="text-balance font-satoshi text-secondary">
          I&apos;ve worked with innovative teams and companies to build high-quality digital products.
        </p>
      </div>

      <div className="flex w-full flex-col items-center">
        <div className="w-full [overflow-anchor:none]">
          {experiences.map((exp) => {
            const isOpen = openId === exp.id;

            return (
              <div
                key={exp.id}
                className="mb-4 rounded-none border-0 border-b border-bg-700 bg-transparent [overflow-anchor:none]"
              >
                <h3 className="flex">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => toggle(exp.id)}
                    aria-expanded={isOpen}
                    className="flex flex-1 cursor-pointer items-center gap-2 p-0 pb-4 text-left font-satoshi text-base font-medium text-primary"
                  >
                    <CompanyLogo name={exp.company} logo={exp.logo} />

                    <div className="w-full min-w-0">
                      <h6 className="text-primary">{exp.role}</h6>
                      <div className="flex justify-between gap-4">
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-secondary underline-offset-4 hover:underline"
                          >
                            @{exp.company}
                          </a>
                        ) : (
                          <span className="text-sm text-secondary">@{exp.company}</span>
                        )}
                        <p className="shrink-0 text-xs text-secondary">{exp.period}</p>
                      </div>
                    </div>
                  </button>
                </h3>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out [overflow-anchor:none]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden text-base text-secondary">
                    <div
                      className={`p-4 px-0 pt-0 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                    >
                      {exp.highlights && exp.highlights.length > 0 ? (
                        <ul className="list-disc space-y-2 pl-4 text-sm">
                          {exp.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm">{exp.summary}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
