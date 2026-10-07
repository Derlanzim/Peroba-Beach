// Ponto de entrada para guardar solicitações de reserva.
// Hoje o envio vai para /api/solicitacoes, que apenas valida. Quando houver banco de dados
// ou painel administrativo, basta salvar os dados naquela rota. Nada muda na interface.

export type SolicitacaoReserva = {
  nome?: string;
  checkin: string;
  checkout: string;
  noites: number;
  pessoas: number;
  chaleId: string; // "qualquer" quando não há preferência
  estimativa: number | null;
  origem: "site";
  criadoEm: string;
};

export async function registrarSolicitacao(s: SolicitacaoReserva): Promise<void> {
  try {
    await fetch("/api/solicitacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
      keepalive: true,
    });
  } catch {
    // O envio ao WhatsApp não depende deste registro.
  }
}
