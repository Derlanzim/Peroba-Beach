import { chales } from "../data/chales";
import { formatarReais } from "../lib/datas";
import {
  ADICIONAL_PESSOA_EXTRA,
  MINIMO_DIARIAS_FIM_DE_SEMANA,
  PESSOAS_INCLUIDAS,
  SINAL_PERCENTUAL,
  TABELA,
} from "../lib/pricing";

const grupos = (["A", "B"] as const).map((g) => ({
  grupo: g,
  nomes: chales.filter((c) => c.grupoPreco === g).map((c) => c.nome).join(" e "),
}));

export default function Valores() {
  return (
    <section id="valores" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <h2 className="font-display text-3xl font-medium text-navy-900 sm:text-4xl">
        Valores e regras
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-navy-800">
        Diárias para {PESSOAS_INCLUIDAS} pessoas, tabela 2026.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left">
          <caption className="sr-only">Valores das diárias por chalé</caption>
          <thead>
            <tr className="border-b-2 border-navy-900 text-navy-900">
              <th scope="col" className="py-3 pr-4 font-semibold">Chalés</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Segunda a quinta</th>
              <th scope="col" className="py-3 font-semibold">Sexta a domingo</th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((g) => (
              <tr key={g.grupo} className="border-b border-navy-900/15">
                <th scope="row" className="py-4 pr-4 font-medium text-navy-900">{g.nomes}</th>
                <td className="py-4 pr-4 text-navy-800">{formatarReais(TABELA[g.grupo].semana)}</td>
                <td className="py-4 text-navy-800">{formatarReais(TABELA[g.grupo].fimDeSemana)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-8 max-w-2xl list-disc space-y-2 pl-5 text-navy-800">
        <li>Pessoa extra: mais {formatarReais(ADICIONAL_PESSOA_EXTRA)} por pessoa.</li>
        <li>
          {SINAL_PERCENTUAL}% para confirmar a reserva e os {SINAL_PERCENTUAL}% restantes 3 dias
          úteis antes do check-in.
        </li>
        <li>Fim de semana: mínimo de {MINIMO_DIARIAS_FIM_DE_SEMANA} diárias.</li>
        <li>Feriados e datas especiais: valores sob consulta.</li>
        <li>Remarcação sujeita à disponibilidade.</li>
      </ul>
    </section>
  );
}
