// Regras de preço e estadia, separadas da interface.
// Para mudar valores ou regras, edite SOMENTE este arquivo.
import type { Chale, GrupoPreco } from "../data/chales";
import { adicionarDias, lerISO } from "./datas";

// Diárias para 2 pessoas (catálogo 2026).
export const TABELA: Record<GrupoPreco, { semana: number; fimDeSemana: number }> = {
  A: { semana: 219, fimDeSemana: 259 }, // Chalés 1 e 3
  B: { semana: 199, fimDeSemana: 239 }, // Chalés 2 e 4
};

export const PESSOAS_INCLUIDAS = 2;
// Premissa: o adicional é cobrado por pessoa extra, por diária. Confirme com a pousada.
export const ADICIONAL_PESSOA_EXTRA = 30;

// Premissa: a regra vale para estadias que incluam noite de sexta ou de sábado. Confirme com a pousada.
export const MINIMO_DIARIAS_FIM_DE_SEMANA = 2;

export const SINAL_PERCENTUAL = 50;
export const PRECO_INICIAL_CASAL = 199;

// Noites de sexta (5), sábado (6) e domingo (0) usam a tarifa de fim de semana.
function tarifaFimDeSemana(d: Date): boolean {
  const dia = d.getDay();
  return dia === 5 || dia === 6 || dia === 0;
}

// Lista as noites da estadia: da data de entrada até a véspera da saída.
export function listarNoites(checkin: string, checkout: string): Date[] {
  const noites: Date[] = [];
  const fim = lerISO(checkout);
  if (!lerISO(checkin) || !fim) return noites;
  let atual = checkin;
  while (true) {
    const d = lerISO(atual);
    if (!d || d >= fim) break;
    noites.push(d);
    atual = adicionarDias(atual, 1);
    if (noites.length > 60) break; // trava de segurança
  }
  return noites;
}

export type Estadia = {
  noites: number;
  aviso: string | null;
  menorTotal: number | null;
};

export function totalDoChale(chale: Chale, noites: Date[], pessoas: number): number {
  const extras = Math.max(0, pessoas - PESSOAS_INCLUIDAS);
  return noites.reduce((soma, d) => {
    const base = TABELA[chale.grupoPreco][tarifaFimDeSemana(d) ? "fimDeSemana" : "semana"];
    return soma + base + extras * ADICIONAL_PESSOA_EXTRA;
  }, 0);
}

export function calcularEstadia(
  checkin: string,
  checkout: string,
  pessoas: number,
  candidatos: Chale[],
): Estadia {
  if (!checkin || !checkout) return { noites: 0, aviso: null, menorTotal: null };

  const noites = listarNoites(checkin, checkout);
  if (noites.length === 0) {
    return { noites: 0, aviso: "A saída precisa ser depois da entrada.", menorTotal: null };
  }

  const incluiFimDeSemana = noites.some((d) => d.getDay() === 5 || d.getDay() === 6);
  if (incluiFimDeSemana && noites.length < MINIMO_DIARIAS_FIM_DE_SEMANA) {
    return {
      noites: noites.length,
      aviso: `Aos fins de semana, o mínimo é de ${MINIMO_DIARIAS_FIM_DE_SEMANA} diárias.`,
      menorTotal: null,
    };
  }

  const totais = candidatos
    .filter((c) => c.capacidade >= pessoas)
    .map((c) => totalDoChale(c, noites, pessoas));

  return {
    noites: noites.length,
    aviso: null,
    menorTotal: totais.length ? Math.min(...totais) : null,
  };
}
