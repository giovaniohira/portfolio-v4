import Link from "next/link";
import { aboutPage, site } from "@/data/site";
import { OutlineButton } from "@/components/OutlineButton";

const INNER_RADIUS = 25;
const OUTER_RADIUS = 50;
const RING_RADIUS = (INNER_RADIUS + OUTER_RADIUS) / 2;
const TALK_COUNT = 4;
const RING_SLOT = 100 / (TALK_COUNT * 2);
const RING_SEGMENTS = Array.from({ length: TALK_COUNT * 2 }, (_, i) => ({
  label: i % 2 === 0 ? "Let's Talk" : "•",
  offset: `${((i + 1) * RING_SLOT) % 100}%`,
}));

function ContactBadge() {
  return (
    <Link
      href="/contact"
      aria-label="Go to contact"
      className="group relative grid aspect-square h-36 w-36 shrink-0 place-items-center rounded-full bg-bg-800 p-4 shadow md:h-44 md:w-44 lg:h-48 lg:w-48"
    >
      <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bg-600" />
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="relative z-10 text-primary transition-transform duration-300 group-hover:rotate-45"
      >
        <path
          d="M7 7h10v10M7 17 17 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]"
        aria-hidden
      >
        <defs>
          <path
            id="about-talk-ring"
            d={`M 50,50 m -${RING_RADIUS},0 a ${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a ${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
          />
        </defs>
        <text
          className="fill-primary font-satoshi uppercase"
          fontSize="7"
          dominantBaseline="middle"
        >
          {RING_SEGMENTS.filter(({ label }) => label !== "•").map(({ label, offset }) => (
            <textPath
              key={offset}
              href="#about-talk-ring"
              startOffset={offset}
              textAnchor="middle"
              letterSpacing="0.05em"
            >
              {label}
            </textPath>
          ))}
        </text>
        <text
          className="fill-primary font-satoshi"
          fontSize="3.5"
          dominantBaseline="middle"
        >
          {RING_SEGMENTS.filter(({ label }) => label === "•").map(({ label, offset }) => (
            <textPath
              key={offset}
              href="#about-talk-ring"
              startOffset={offset}
              textAnchor="middle"
            >
              {label}
            </textPath>
          ))}
        </text>
      </svg>
    </Link>
  );
}

export function AboutHero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:px-8 md:pt-28 md:pb-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-14 lg:gap-20">
        <ContactBadge />

        <div className="min-w-0 flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-balance font-clash text-4xl font-medium leading-tight text-primary md:text-5xl lg:text-6xl">
            {aboutPage.headline.before}
            <span className="text-highlight">{aboutPage.headline.accent}</span>
            {aboutPage.headline.after}
          </h1>

          <p className="text-balance font-satoshi text-base leading-relaxed text-secondary md:text-lg">
            {aboutPage.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <OutlineButton href={site.social.linkedin} external>
              View LinkedIn
            </OutlineButton>
            <OutlineButton href={aboutPage.resumeUrl} external>
              View Resume
            </OutlineButton>
          </div>
        </div>
      </div>
    </section>
  );
}
