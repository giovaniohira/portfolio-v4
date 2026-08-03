"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import LineSidebar from "@/components/LineSidebar";
import { sectionNavLinks } from "@/data/site";

const HEADER_OFFSET = -72;

export function SiteLineSidebar() {
  const [active, setActive] = useState(0);
  const items = sectionNavLinks.map((link) => link.label);
  const lenis = useLenis();

  useEffect(() => {
    const sectionIds = sectionNavLinks.map((link) => link.sectionId);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visible[0]?.target.id;
        const index = sectionIds.indexOf(id as (typeof sectionIds)[number]);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <aside
      className="pointer-events-none fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      aria-label="Section navigation"
    >
      <div className="pointer-events-auto relative pl-6 xl:pl-10">
        <div className="relative w-fit">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-3 -inset-y-1 rounded-md backdrop-blur-md"
          />
          <LineSidebar
            className="relative"
            items={[...items]}
            activeIndex={active}
            accentColor="#b5ff6d"
            textColor="#9ca3af"
            markerColor="#6c6c6c"
            defaultActive={0}
            onItemClick={(index) => {
              const link = sectionNavLinks[index];
              if (!link) return;

              const target = `#${link.sectionId}`;
              if (lenis) {
                lenis.scrollTo(target, { offset: HEADER_OFFSET });
              } else {
                document.getElementById(link.sectionId)?.scrollIntoView();
              }
              setActive(index);
            }}
          />
        </div>
      </div>
    </aside>
  );
}
