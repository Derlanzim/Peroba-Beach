"use client";

import { useEffect, useState } from "react";
import { CAPACIDADE_MAXIMA, chales } from "../data/chales";
import { adicionarDias, formatarReais, paraISO } from "../lib/datas";
import { calcularEstadia, SINAL_PERCENTUAL } from "../lib/pricing";
import { track } from "../lib/analytics";
import { registrarSolicitacao } from "../lib/reservations";
import { linkWhatsApp, montarMensagem } from "../lib/whatsapp";

const campo =
  "w-full rounded-lg border border-navy-900/25 bg-white px-3 py-2.5 text-base text-navy-900 focus:border-navy-700";
const rotulo = "mb-1.5 block text-sm font-medium text-navy-800";

export default function ReservaWidget() {
  const [hoje, setHoje] = useState("");
  const [nome, setNome] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [pessoas, setPessoas] = useState(2);
  const [chaleId, setChaleId] = useState("qualquer");

  // A data de hoje só existe no navegador (evita divergência entre servidor e cliente).
  useEffect(() => {
    setHoje(paraISO(new Date()));
  }, []);

  const elegiveis = chales.filter((c) => c.capacidade >= pessoas);
  const escolhido = elegiveis.find((c) => c.id === chaleId);
  const candidatos = escolhido ? [escolhido] : elegiveis;

  const estadia = calcularEstadia(checkin, checkout, pessoas, candidatos);
  const pronto = estadia.noites > 0 && estadia.aviso === null;

  const mensagem = montarMensagem({
    nome,
    checkin,
    checkout,
    noites: estadia.noites,
    pessoas,
    chale: escolhido ? escolhido.nome : "Sem preferência",
    estimativa: estadia.menorTotal,
  });

  function aoMudarEntrada(valor: string) {
    setCheckin(valor);
    if (checkout && valor && checkout <= valor) setCheckout("");
  }

  function aoSolicitar() {
    const dados = {
      nome: nome.trim() || undefined,
      checkin,
      checkout,
      noites: estadia.noites,
      pessoas,
      chaleId: escolhido ? escolhido.id : "qualquer",
      estimativa: estadia.menorTotal,
      origem: "site" as const,
      criadoEm: new Date().toISOString(),
    };
    void registrarSolicitacao(dados);
    track("solicitacao_reserva", { noites: estadia.noites, pessoas });
  }

  return (
    <section id="reservar" className="relative z-10 -mt-28 px-4 sm:-mt-32 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-navy-900/10 bg-white p-5 shadow-xl sm:p-8">
        <h2 className="font-display text-2xl font-medium text-navy-900 sm:text-3xl">
          Solicite sua reserva
        </h2>
        <p className="mt-1 text-navy-800">
          Escolha as datas e o número de pessoas. Ao final, você segue para o WhatsApp com a
          mensagem pronta.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="entrada" className={rotulo}>
              Entrada
            </label>
            <input
              id="entrada"
              type="date"
              className={campo}
              value={checkin}
              min={hoje || undefined}
              onChange={(e) => aoMudarEntrada(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="saida" className={rotulo}>
              Saída
            </label>
            <input
              id="saida"
              type="date"
              className={campo}
              value={checkout}
              min={checkin ? adicionarDias(checkin, 1) : hoje || undefined}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>

          <div>
            <span id="pessoas-rotulo" className={rotulo}>
              Pessoas
            </span>
            <div
              role="group"
              aria-labelledby="pessoas-rotulo"
              className="flex items-center justify-between rounded-lg border border-navy-900/25 px-2 py-1.5"
            >
              <button
                type="button"
                aria-label="Menos uma pessoa"
                onClick={() => setPessoas((p) => Math.max(1, p - 1))}
                disabled={pessoas <= 1}
                className="h-10 w-10 rounded-md text-xl font-semibold text-navy-900 hover:bg-mar-100 disabled:opacity-30"
              >
                −
              </button>
              <output aria-live="polite" className="text-base font-semibold text-navy-900">
                {pessoas} {pessoas === 1 ? "pessoa" : "pessoas"}
              </output>
              <button
                type="button"
                aria-label="Mais uma pessoa"
                onClick={() => setPessoas((p) => Math.min(CAPACIDADE_MAXIMA, p + 1))}
                disabled={pessoas >= CAPACIDADE_MAXIMA}
                className="h-10 w-10 rounded-md text-xl font-semibold text-navy-900 hover:bg-mar-100 disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="chale" className={rotulo}>
              Chalé
            </label>
            <select
              id="chale"
              className={campo}
              value={escolhido ? escolhido.id : "qualquer"}
              onChange={(e) => setChaleId(e.target.value)}
            >
              <option value="qualquer">Sem preferência</option>
              {elegiveis.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} (até {c.capacidade} pessoas, {c.andar})
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="nome" className={rotulo}>
              Seu nome (opcional)
            </label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              className={campo}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-mar-50 p-4" aria-live="polite">
          {estadia.aviso ? (
            <p className="font-medium text-navy-900">{estadia.aviso}</p>
          ) : pronto ? (
            <>
              <p className="text-navy-800">
                {estadia.noites} {estadia.noites === 1 ? "diária" : "diárias"} para {pessoas}{" "}
                {pessoas === 1 ? "pessoa" : "pessoas"}
              </p>
              {estadia.menorTotal !== null ? (
                <p className="mt-1 font-display text-2xl font-medium text-navy-900">
                  {escolhido ? "Estimativa: " : "A partir de "}
                  {formatarReais(estadia.menorTotal)}
                </p>
              ) : null}
              <p className="mt-2 text-sm text-navy-800">
                Valor estimado, sujeito à confirmação da equipe. Feriados e datas especiais sob
                consulta. {SINAL_PERCENTUAL}% para confirmar a reserva.
              </p>
            </>
          ) : (
            <p className="text-navy-800">
              Escolha entrada e saída para ver a estimativa de valor.
            </p>
          )}
        </div>

        {pronto ? (
          <a
            href={linkWhatsApp(mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={aoSolicitar}
            className="mt-6 block rounded-full bg-sol-500 px-7 py-3.5 text-center text-base font-semibold text-navy-950 transition-colors hover:bg-sol-600"
          >
            Solicitar reserva pelo WhatsApp
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 block w-full cursor-not-allowed rounded-full bg-navy-900/10 px-7 py-3.5 text-center text-base font-semibold text-navy-900/50"
          >
            Solicitar reserva pelo WhatsApp
          </button>
        )}
        <p className="mt-3 text-center text-sm text-navy-800">
          Não é uma reserva confirmada: a equipe responde pelo WhatsApp com a disponibilidade.
        </p>
      </div>
    </section>
  );
}
