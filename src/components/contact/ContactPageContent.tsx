"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { ContactProfileCard } from "@/components/contact/ContactProfileCard";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { contactFaqs } from "@/data/site";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ContactPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
      <section>
        <SectionEyebrow>Contact</SectionEyebrow>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 font-clash text-4xl font-medium leading-tight tracking-tight text-primary md:w-2/3 md:text-5xl lg:w-1/2 lg:text-6xl"
        >
          Get in touch
        </motion.h1>

        <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full sm:flex-1"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="w-full sm:max-w-sm sm:flex-1 lg:max-w-md"
          >
            <ContactProfileCard />
          </motion.div>
        </div>
      </section>

      <section className="mt-24 flex flex-col justify-between gap-10 sm:mt-32 sm:flex-row sm:gap-6">
        <div className="shrink-0">
          <SectionEyebrow>FAQs</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-clash text-4xl font-medium tracking-tight text-primary md:text-5xl"
          >
            Frequently asked questions
          </motion.h2>
        </div>

        <div className="w-full md:w-2/3">
          {contactFaqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="mb-4 overflow-hidden rounded-2xl border border-bg-700 bg-bg-800"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left font-satoshi text-base font-medium text-primary"
                >
                  <span>
                    <span className="text-secondary">{String(index + 1).padStart(2, "0")}.</span>{" "}
                    {faq.question}
                  </span>
                  <ChevronDown open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 font-satoshi text-base leading-relaxed text-secondary">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
