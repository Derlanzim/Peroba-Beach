import { site } from "../lib/site";

const links = [
  { href: "#chales", texto: "Chalés" },
  { href: "#estrutura", texto: "Estrutura" },
  { href: "#valores", texto: "Valores" },
  { href: "#como-chegar", texto: "Como chegar" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/10 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#topo" className="font-display text-lg font-semibold tracking-tight text-navy-900">
          {site.nomeCurto}
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-sm font-medium md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-navy-800 hover:text-navy-900 hover:underline">
              {l.texto}
            </a>
          ))}
        </nav>
        <a
          href="#reservar"
          className="rounded-full bg-sol-500 px-5 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-sol-600"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}
