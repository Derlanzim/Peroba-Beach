import { site } from "./site";
import { formatarBR, formatarReais } from "./datas";

export function linkWhatsApp(texto: string): string {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(texto)}`;
}

export type DadosMensagem = {
  nome?: string;
  checkin: string;
  checkout: string;
  noites: number;
  pessoas: number;
  chale: string; // nome do chalé ou "Sem preferência"
  estimativa: number | null;
};

export function montarMensagem(d: DadosMensagem): string {
  const linhas = [
    `Olá! Gostaria de solicitar uma reserva na ${site.nome}.`,
    "",
    ...(d.nome?.trim() ? [`Nome: ${d.nome.trim()}`] : []),
    `Entrada: ${formatarBR(d.checkin)}`,
    `Saída: ${formatarBR(d.checkout)}`,
    `Diárias: ${d.noites}`,
    `Pessoas: ${d.pessoas}`,
    `Chalé: ${d.chale}`,
    ...(d.estimativa !== null
      ? [`Estimativa do site: ${formatarReais(d.estimativa)} (sujeita a confirmação)`]
      : []),
    "",
    "Pode confirmar a disponibilidade?",
  ];
  return linhas.join("\n");
}
