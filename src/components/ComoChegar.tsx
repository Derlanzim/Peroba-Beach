import { site } from "../lib/site";

export default function ComoChegar() {
  return (
    <section id="como-chegar" className="bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="font-display text-3xl font-medium sm:text-4xl">Como chegar</h2>
        <p className="mt-3 max-w-2xl text-lg text-white/85">
          Estamos na {site.local}. Distâncias até a pousada:
        </p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {site.distancias.map((d) => (
            <div key={d.cidade} className="border-t border-white/30 pt-4">
              <dt className="text-white/80">{d.cidade}</dt>
              <dd className="font-display text-3xl font-light">{d.km} km</dd>
            </div>
          ))}
        </dl>
        <a
          href={site.mapa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full border border-white/60 px-7 py-3 font-semibold transition-colors hover:bg-white/10"
        >
          Abrir no mapa
        </a>
      </div>
    </section>
  );
}
