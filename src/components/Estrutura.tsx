import { avisoCafe, comodidades } from "../data/chales";

export default function Estrutura() {
  return (
    <section id="estrutura" className="bg-mar-50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="font-display text-3xl font-medium text-navy-900 sm:text-4xl">
          O que você encontra em todos os chalés
        </h2>
        <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {comodidades.map((c) => (
            <div key={c.titulo} className="border-l-4 border-mar-500 pl-4">
              <dt className="text-lg font-semibold text-navy-900">{c.titulo}</dt>
              <dd className="mt-1 text-navy-800">{c.texto}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-2xl text-navy-800">{avisoCafe}</p>
      </div>
    </section>
  );
}
