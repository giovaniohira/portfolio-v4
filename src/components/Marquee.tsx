"use client";

function SparkleIcon() {
  return (
    <svg
      width="42"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0 text-bg-600"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

type ScrollerRowProps = {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
  size?: "lg" | "md";
};

export function ScrollerRow({
  items,
  reverse = false,
  className = "",
  size = "lg",
}: ScrollerRowProps) {
  const doubled = [...items, ...items];
  const textClass =
    size === "lg"
      ? "font-clash text-4xl font-medium text-bg-600 md:text-5xl"
      : "font-clash text-2xl font-medium text-bg-600 md:text-3xl";

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max items-center gap-4 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}
      >
        {doubled.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-4">
            <h2 className={`whitespace-nowrap ${textClass}`}>{item}</h2>
            <SparkleIcon />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarqueeBand({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden border-y border-bg-600 py-8 ${className}`}>
      <ScrollerRow items={items} />
    </div>
  );
}
