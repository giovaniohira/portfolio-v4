import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 font-satoshi text-sm text-secondary md:flex-row">
        <p>
          &copy; {year} {site.name}. Todos os direitos reservados.
        </p>
        <p className="text-xs">{site.location}</p>
      </div>
    </footer>
  );
}
