import FotoSlot from "./FotoSlot";
import { chales } from "../data/chales";
import { TABELA } from "../lib/pricing";
import { formatarReais } from "../lib/datas";

export default function Chales() {
  return (
    <section id="chales" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <h2 className="font-display text-3xl font-medium text-navy-900 sm:text-4xl">Os chalés</h2>
      <p className="mt-3 max-w-2xl text-lg text-navy-800">
        Quatro chalés, dois no andar de baixo e dois no de cima. Todos com vista para o mar.
      </p>

      <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
        {chales.map((c) => (
          <li key={c.id}>
            <FotoSlot src={c.foto} alt={`${c.nome} da Pousada Peroba Beach`} className="aspect-[4/3] rounded-xl" />
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-medium text-navy-900">{c.nome}</h3>
              <p className="text-sm text-navy-800">
                Até {c.capacidade} pessoas, andar {c.andar}
              </p>
            </div>
            <p className="mt-1 text-navy-800">{c.descricao}</p>
            <p className="mt-2 font-medium text-navy-900">
              Diária a partir de {formatarReais(TABELA[c.grupoPreco].semana)} para 2 pessoas
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
