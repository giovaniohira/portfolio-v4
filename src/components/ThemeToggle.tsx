"use client";

import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-bg-700 bg-backdrop text-primary shadow backdrop-blur-md transition active:scale-90 sm:border-none sm:bg-transparent sm:shadow-none sm:backdrop-blur-none ${className}`}
      onClick={(e) => {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.style.setProperty("--x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--y", `${e.clientY}px`);

        const apply = () => flushSync(() => setTheme(next));

        if (document.startViewTransition) {
          document.startViewTransition(apply);
        } else {
          apply();
        }
      }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: theme === "light" ? 1 : 0,
          scale: theme === "light" ? 1 : 0.5,
          rotate: theme === "light" ? 0 : -180,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <SunIcon />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          opacity: theme === "dark" ? 1 : 0,
          scale: theme === "dark" ? 1 : 0.5,
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <MoonIcon />
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
