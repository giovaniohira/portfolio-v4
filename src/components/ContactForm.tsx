"use client";

import { useEffect, useState } from "react";
import { formspreeEndpoint, site } from "@/data/site";
import { OutlineButton } from "@/components/OutlineButton";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", message: "" };

const fieldClass =
  "flex w-full rounded-xl border border-border bg-bg-800 px-3 py-2.5 font-satoshi text-sm text-primary outline-none transition placeholder:text-secondary/50 focus-visible:ring-2 focus-visible:ring-highlight/40 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-bg-900";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (!status || showForm) return;
    const timer = setTimeout(() => {
      setStatus(null);
      setShowForm(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [status, showForm]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
        setForm(initialForm);
        setShowForm(false);
      } else {
        setStatus("error");
        setShowForm(false);
      }
    } catch {
      setStatus("error");
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "success" && !showForm) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-border bg-bg-800/50 px-6 py-12 text-center">
        <p className="font-clash text-2xl text-primary">Message sent</p>
        <p className="mt-3 max-w-sm font-satoshi text-sm leading-relaxed text-secondary">
          Thank you for reaching out. I will get back to you shortly.
        </p>
      </div>
    );
  }

  if (status === "error" && !showForm) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-border bg-bg-800/50 px-6 py-12 text-center">
        <p className="font-clash text-2xl text-primary">Message not sent</p>
        <p className="mt-3 font-satoshi text-sm text-secondary">
          An error occurred. Please contact me directly at{" "}
          <a href={`mailto:${site.email}`} className="text-highlight underline">
            {site.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block pb-1 font-satoshi text-sm font-medium text-primary">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={isSubmitting}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          className={`${fieldClass} h-10`}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block pb-1 font-satoshi text-sm font-medium text-primary">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isSubmitting}
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          className={`${fieldClass} h-10`}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block pb-1 font-satoshi text-sm font-medium text-primary">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={isSubmitting}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          className={`${fieldClass} min-h-28 resize-none`}
        />
      </div>

      <OutlineButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </OutlineButton>
    </form>
  );
}
