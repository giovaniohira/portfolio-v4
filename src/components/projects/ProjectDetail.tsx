"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/data/site";
import { OutlineButton } from "@/components/OutlineButton";

type ProjectDetailProps = {
  project: Project;
  prev?: Project;
  next?: Project;
};

const TAG_PREVIEW = 3;

type CtaKind = "live" | "npm" | "github" | "article";

function getProjectCtas(links: Project["links"]) {
  const ctas: { label: string; href: string; kind: CtaKind }[] = [];
  if (links.live) ctas.push({ label: "Live demo", href: links.live, kind: "live" });
  if (links.npm) ctas.push({ label: "npm", href: links.npm, kind: "npm" });
  if (links.github) ctas.push({ label: "GitHub", href: links.github, kind: "github" });
  if (links.article) ctas.push({ label: "Article", href: links.article, kind: "article" });
  return ctas;
}

function CtaIcon({ kind }: { kind: CtaKind }) {
  switch (kind) {
    case "live":
      return <ExternalLinkIcon className="size-4" />;
    case "npm":
      return <NpmIcon className="size-4" />;
    case "github":
      return <GitHubIcon className="size-4" />;
    case "article":
      return <MediumIcon className="size-4" />;
  }
}

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="group scroll-mt-28 font-clash text-2xl font-medium text-primary md:text-3xl"
    >
      <a href={`#${id}`} className="inline-flex items-center gap-2">
        {children}
        <HashIcon className="size-3.5 text-secondary opacity-0 transition group-hover:opacity-100" />
      </a>
    </h2>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label="Copy"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
      className="absolute right-3 top-3 rounded-md border border-border bg-bg-800/80 px-2 py-1 font-satoshi text-xs text-secondary transition hover:text-primary"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function ProjectDetail({ project, prev, next }: ProjectDetailProps) {
  const ctas = getProjectCtas(project.links);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    project.features?.length ? { id: "features", label: "Features" } : null,
    project.technologies?.length
      ? { id: "technologies-used", label: "Technologies used" }
      : null,
    project.buildSteps?.length ? { id: "build-steps", label: "Build steps" } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  const visibleTags = tagsExpanded ? project.tags : project.tags.slice(0, TAG_PREVIEW);
  const hiddenTagCount = Math.max(0, project.tags.length - TAG_PREVIEW);

  const sectionIds = sections.map((s) => s.id).join(",");

  useEffect(() => {
    if (!sectionIds) return;

    const ids = sectionIds.split(",");
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  // Share targets resolve against the live URL at click time.
  async function copyPageLink() {
    await navigator.clipboard.writeText(window.location.href);
  }

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
      return;
    }
    await copyPageLink();
  }

  const hasBody =
    (project.screenshots?.length ?? 0) > 0 ||
    (project.features?.length ?? 0) > 0 ||
    (project.technologies?.length ?? 0) > 0 ||
    (project.buildSteps?.length ?? 0) > 0;

  return (
    <>
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        {/* Breadcrumb + year */}
        <div className="flex w-full items-center justify-between gap-4">
          <nav className="flex min-w-0 flex-1 items-center gap-2 font-satoshi text-sm text-secondary">
            <Link href="/" className="transition hover:text-primary" aria-label="Home">
              <HomeIcon className="size-4" />
            </Link>
            <ChevronRightIcon className="size-3.5 shrink-0 opacity-50" />
            <Link href="/projects" className="transition hover:text-primary">
              Projects
            </Link>
            <ChevronRightIcon className="size-3.5 shrink-0 opacity-50" />
            <span className="min-w-0 truncate text-primary">{project.title}</span>
          </nav>
          <span className="shrink-0 rounded-sm border border-bg-600 px-2 py-1 font-satoshi text-sm text-secondary">
            {project.year}
          </span>
        </div>

        {/* Cover + intro */}
        <header className="mt-4 flex flex-col gap-8">
          <div className="aspect-3/2 w-full overflow-hidden rounded-2xl bg-bg-800">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h1 className="font-clash text-[1.75em] font-semibold text-primary md:text-4xl">
                {project.title}
              </h1>
              {ctas.length > 0 && (
                <div className="flex flex-wrap items-center justify-end gap-2">
                  {ctas.map((cta) => (
                    <OutlineButton
                      key={cta.href}
                      href={cta.href}
                      external
                      icon={<CtaIcon kind={cta.kind} />}
                      className="h-fit"
                    >
                      {cta.label}
                    </OutlineButton>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <p className="mb-0 w-full font-satoshi text-lg leading-relaxed text-secondary sm:w-2/3">
                {project.longDescription ?? project.description}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <label className="min-w-15 font-semibold text-secondary">Roles:</label>
                  <p className="m-0 text-primary">{project.role ?? "Developer"}</p>
                </div>
              </div>
            </div>

            {project.tags.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2 xl:mb-0">
                {visibleTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full bg-bg-800 px-3 py-1 font-satoshi text-sm text-primary dark:bg-bg-700"
                  >
                    {tag}
                  </span>
                ))}
                {!tagsExpanded && hiddenTagCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setTagsExpanded(true)}
                    className="inline-flex cursor-pointer rounded-full bg-bg-800 px-3 py-1 font-satoshi text-sm text-primary transition hover:opacity-80 dark:bg-bg-700"
                  >
                    +{hiddenTagCount}
                  </button>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Body + TOC */}
        {(hasBody || prev || next) && (
          <div
            className={`mt-10 grid gap-10 ${
              sections.length > 0 ? "xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12" : ""
            }`}
          >
            <article className="min-w-0">
              {project.screenshots?.map((src) => (
                <div key={src} className="mb-8 overflow-hidden rounded-xl bg-bg-800">
                  <Image
                    src={src}
                    alt={`${project.title} screenshot`}
                    width={1200}
                    height={720}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
              ))}

              {project.features && project.features.length > 0 && (
                <section className="space-y-4">
                  <SectionHeading id="features">Features</SectionHeading>
                  <ul className="list-disc space-y-2 ps-5 font-satoshi text-secondary">
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
              )}

              {project.technologies && project.technologies.length > 0 && (
                <>
                  {(project.features?.length ?? 0) > 0 && (
                    <hr className="my-10 border-border" />
                  )}
                  <section className="space-y-4">
                    <SectionHeading id="technologies-used">Technologies used</SectionHeading>
                    <ul className="list-disc space-y-2 ps-5 font-satoshi text-secondary">
                      {project.technologies.map((tech) => (
                        <li key={tech.name}>
                          {tech.url ? (
                            <a
                              href={tech.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary underline-offset-2 hover:underline"
                            >
                              {tech.name}
                            </a>
                          ) : (
                            <span className="font-medium text-primary">{tech.name}</span>
                          )}
                          {tech.description && <> — {tech.description}</>}
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              )}

              {project.buildSteps && project.buildSteps.length > 0 && (
                <>
                  {((project.features?.length ?? 0) > 0 ||
                    (project.technologies?.length ?? 0) > 0) && (
                    <hr className="my-10 border-border" />
                  )}
                  <section className="space-y-4">
                    <SectionHeading id="build-steps">Build steps</SectionHeading>
                    <ol className="list-decimal space-y-6 ps-5 font-satoshi text-primary">
                      {project.buildSteps.map((step) => (
                        <li key={step.title} className="space-y-3">
                          <p>{step.title}</p>
                          {step.code && (
                            <div className="relative not-prose overflow-hidden rounded-xl border border-border bg-bg-800 shadow-sm">
                              <CopyButton value={step.code} />
                              <pre className="overflow-x-auto p-4 pr-16 font-mono text-sm text-secondary">
                                <code>{step.code}</code>
                              </pre>
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  </section>
                </>
              )}

              {/* Share — mobile */}
              <div className="mt-10 flex items-center justify-between sm:hidden">
                <p className="font-satoshi text-sm text-primary">Share this project</p>
                <ShareButtons
                  title={project.title}
                  onCopy={copyPageLink}
                  onShare={nativeShare}
                />
              </div>

              {(prev || next) && (
                <div className="mt-12 grid grid-cols-2 gap-4">
                  {prev ? (
                    <Link
                      href={`/projects/${prev.id}`}
                      className="flex flex-col gap-2 rounded-lg border border-border p-4 text-sm transition hover:bg-bg-800/60"
                    >
                      <span className="inline-flex items-center gap-1.5 font-satoshi font-medium text-primary">
                        <ChevronLeftIcon className="size-4" />
                        Previous Page
                      </span>
                      <span className="truncate font-satoshi text-secondary">{prev.title}</span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next && (
                    <Link
                      href={`/projects/${next.id}`}
                      className="col-start-2 flex flex-col gap-2 rounded-lg border border-border p-4 text-end text-sm transition hover:bg-bg-800/60"
                    >
                      <span className="inline-flex flex-row-reverse items-center gap-1.5 font-satoshi font-medium text-primary">
                        <ChevronRightIcon className="size-4" />
                        Next Page
                      </span>
                      <span className="truncate font-satoshi text-secondary">{next.title}</span>
                    </Link>
                  )}
                </div>
              )}
            </article>

            {sections.length > 0 && (
              <aside className="hidden xl:block">
                <div className="sticky top-28">
                  <h3 className="inline-flex items-center gap-1.5 font-satoshi text-sm text-secondary">
                    <AlignLeftIcon className="size-4" />
                    On this page
                  </h3>
                  <div className="relative mt-3 ms-px border-s border-border py-1">
                    <ul className="space-y-0 font-satoshi text-sm">
                      {sections.map((section) => {
                        const active = activeSection === section.id;
                        return (
                          <li key={section.id}>
                            <a
                              href={`#${section.id}`}
                              className={`relative block py-1.5 ps-3.5 transition ${
                                active
                                  ? "text-highlight"
                                  : "text-secondary hover:text-primary"
                              }`}
                            >
                              {active && (
                                <span className="absolute inset-y-1 start-0 w-0.5 rounded-full bg-highlight" />
                              )}
                              {section.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="font-satoshi text-sm text-primary">Share this project</p>
                    <ShareButtons
                      className="mt-4"
                      title={project.title}
                      onCopy={copyPageLink}
                      onShare={nativeShare}
                    />
                  </div>
                </div>
              </aside>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function ShareButtons({
  title,
  onCopy,
  onShare,
  className = "",
}: {
  title: string;
  onCopy: () => void;
  onShare: () => void;
  className?: string;
}) {
  return (
    <div className={`flex w-fit gap-4 text-secondary ${className}`}>
      <button
        type="button"
        aria-label="LinkedIn"
        title="LinkedIn"
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            "_blank",
            "noopener,noreferrer",
          );
        }}
        className="cursor-pointer transition hover:text-primary"
      >
        <LinkedInIcon className="size-5" />
      </button>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}`}
        onClick={(e) => {
          e.currentTarget.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`;
        }}
        aria-label="Email"
        title="Email"
        className="transition hover:text-primary"
      >
        <MailIcon className="size-5" />
      </a>
      <button
        type="button"
        aria-label="Copy link"
        title="Copy link"
        onClick={onCopy}
        className="cursor-pointer transition hover:text-primary"
      >
        <LinkIcon className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Share"
        title="Share"
        onClick={onShare}
        className="cursor-pointer transition hover:text-primary"
      >
        <ShareIcon className="size-5" />
      </button>
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function NpmIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zm14.337 20.738h-3.647V9.237h3.647v11.501zm4.686 0h-3.647V9.237h3.647v11.501zM5.677 9.237H2.031v11.501h3.646V9.237z" />
    </svg>
  );
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12ZM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42ZM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function HashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function AlignLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M21 5H3" />
      <path d="M15 12H3" />
      <path d="M17 19H3" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98" />
      <path d="m15.41 6.51-6.82 3.98" />
    </svg>
  );
}
