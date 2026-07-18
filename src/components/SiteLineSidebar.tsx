"use client";

import { useEffect, useState } from "react";
import LineSidebar from "@/components/LineSidebar";
import { navLinks } from "@/data/site";

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function SiteLineSidebar() {
  const [active, setActive] = useState(0);
  const items = navLinks.map((link) => link.label);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visible[0]?.target.id;
        const index = sectionIds.indexOf(id);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:left-10 xl:block"
      aria-label="Navegação lateral"
    >
      <div className="pointer-events-auto">
        <LineSidebar
          items={[...items]}
          activeIndex={active}
          accentColor="#b5ff6d"
          textColor="#9ca3af"
          markerColor="#6c6c6c"
          defaultActive={0}
          onItemClick={(index) => {
            document.getElementById(sectionIds[index])?.scrollIntoView({
              behavior: "smooth",
            });
            setActive(index);
          }}
        />
      </div>
    </aside>
  );
}
