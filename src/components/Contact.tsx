"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-bg-800/50 px-8 py-16 text-center md:px-16 md:py-24"
        >
          <div className="gradient-orb pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

          {site.available && (
            <p className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.25em] text-highlight">
              Disponível para trabalho
            </p>
          )}

          <h2 className="font-clash text-3xl font-semibold tracking-tight text-primary md:text-5xl lg:text-6xl">
            Vamos criar sua
            <br />
            <span className="text-primary">próxima grande ideia.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg font-satoshi text-secondary">
            Procurando um engenheiro que entrega código sólido e interfaces que funcionam? Vamos conversar.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-highlight px-8 py-3 font-satoshi text-sm font-medium text-inverse transition hover:opacity-90"
            >
              Entrar em contato
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-8 py-3 font-satoshi text-sm text-primary transition hover:border-highlight/40"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
