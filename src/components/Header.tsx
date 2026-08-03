"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { pageNavLinks, site } from "@/data/site";
import { ThemeToggle } from "@/components/ThemeToggle";

type PageId = (typeof pageNavLinks)[number]["id"];

function resolveActivePage(pathname: string): PageId {
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const active = resolveActivePage(pathname);
  const isHome = pathname === "/";

  useLenis((lenis) => {
    if (!isHome) {
      setCollapsed(lenis.scroll > 80);
      return;
    }

    const hero = document.getElementById("home");
    const threshold = hero
      ? Math.min(Math.max(hero.offsetHeight * 0.18, 100), 220)
      : 150;
    setCollapsed(lenis.scroll > threshold);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full py-2 sm:py-4">
      <motion.nav
        animate={{
          maxWidth: collapsed ? 600 : 1280,
          backgroundColor: collapsed ? "var(--backdrop)" : "transparent",
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`pointer-events-auto mx-auto flex w-[calc(100%-2rem)] items-center justify-between gap-4 rounded-full px-4 py-1 transition-[backdrop-filter,outline-color] duration-300 sm:w-full sm:gap-6 sm:px-6 sm:pr-4 ${
          collapsed
            ? "backdrop-blur-md outline outline-bg-700"
            : "backdrop-blur-none outline outline-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-clash text-xl font-medium tracking-tight text-primary sm:text-2xl"
        >
          {site.initials}
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-sm text-secondary md:flex">
          {pageNavLinks.map((link) => {
            const isActive = active === link.id;

            return (
              <li key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={isActive ? "text-primary" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative inline-flex overflow-hidden">
                    <span className="translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                      {link.label}
                    </span>
                    <span className="absolute translate-y-[110%] skew-y-12 transform-gpu text-primary transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                      {link.label}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden md:inline-flex" />

          <button
            type="button"
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center text-primary md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pointer-events-auto mx-auto mt-2 w-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-bg-700 bg-bg-900/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {pageNavLinks.map((link) => {
                const isActive = active === link.id;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-3 py-2 font-satoshi text-sm ${
                        isActive ? "text-primary" : "text-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
