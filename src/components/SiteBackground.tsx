export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="gradient-orb absolute -left-32 top-[8%] h-96 w-96 rounded-full blur-3xl" />
      <div className="gradient-orb absolute -right-24 top-[38%] h-80 w-80 rounded-full blur-3xl opacity-60" />
      <div className="gradient-orb absolute bottom-[12%] left-1/4 h-72 w-72 rounded-full blur-3xl opacity-45" />
    </div>
  );
}
