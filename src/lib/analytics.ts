type Parametros = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Eventos do site. Só disparam se GA ou Meta Pixel estiverem configurados no .env.
export function track(evento: "solicitacao_reserva" | "clique_whatsapp", params: Parametros = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", evento === "solicitacao_reserva" ? "generate_lead" : "contact", {
      ...params,
      evento_site: evento,
    });
  }
  if (window.fbq) {
    window.fbq("track", evento === "solicitacao_reserva" ? "Lead" : "Contact");
  }
}
