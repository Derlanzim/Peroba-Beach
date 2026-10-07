import FotoSlot from "./FotoSlot";
import { site } from "../lib/site";
import { PRECO_INICIAL_CASAL } from "../lib/pricing";

export default function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 -z-10 opacity-60">
        <FotoSlot
          src={site.fotos.hero}
          alt="Vista da pousada e do mar na Praia de Peroba"
          priority
          sizes="100vw"
          rotulo={false}
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/70 via-navy-900/55 to-navy-900/90" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-40 pt-20 sm:px-6 sm:pb-48 sm:pt-28">
        <h1 className="max-w-3xl font-display text-4xl font-light leading-[1.1] tracking-tight sm:text-6xl">
          {site.lema}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
          Chalés com cozinha equipada, ar-condicionado e Wi-Fi na Praia de Peroba, em Icapuí, Ceará.
          Diárias a partir de R$ {PRECO_INICIAL_CASAL} para casal.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#reservar"
            className="rounded-full bg-sol-500 px-7 py-3 font-semibold text-navy-950 transition-colors hover:bg-sol-600"
          >
            Escolher datas
          </a>
          <a
            href="#chales"
            className="rounded-full border border-white/60 px-7 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ver os chalés
          </a>
        </div>
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 z-0 h-16 w-full text-white sm:h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 70c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v50H0Z"
        />
      </svg>
    </section>
  );
}
