"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";

const headerLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "Sobre", id: "about" },
  { href: "#projects", label: "Projetos", id: "projects" },
  { href: "#contact", label: "Contato", id: "contact" },
] as const;

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<(typeof headerLinks)[number]["id"]>("home");

  useEffect(() => {
    const sections = headerLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visible[0]?.target.id;
        if (id && headerLinks.some((link) => link.id === id)) {
          setActive(id as (typeof headerLinks)[number]["id"]);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-8 lg:px-12">
        <a
          href="#home"
          className="font-clash text-base font-semibold tracking-tight text-white"
        >
          {site.initials}
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {headerLinks.map((link) => {
            const isActive = active === link.id;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 font-satoshi text-sm transition-colors ${
                  isActive
                    ? "font-medium text-white"
                    : "text-[#9ca3af] hover:text-white/80"
                }`}
              >
                {isActive && (
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-highlight"
                    aria-hidden
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Alternar tema"
            className="hidden text-white md:inline-flex"
          >
            <MoonIcon />
          </button>

          <button
            type="button"
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-black md:hidden"
          >
            <div className="flex flex-col gap-1 px-8 py-4">
              {headerLinks.map((link) => {
                const isActive = active === link.id;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 font-satoshi text-sm ${
                      isActive ? "text-white" : "text-[#9ca3af]"
                    }`}
                  >
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-highlight"
                        aria-hidden
                      />
                    )}
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
