import WhatsAppLink from "./WhatsAppLink";
import { linkWhatsApp } from "../lib/whatsapp";
import { MENSAGEM_GERAL } from "../lib/site";

export default function WhatsAppFlutuante() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <WhatsAppLink
        href={linkWhatsApp(MENSAGEM_GERAL)}
        local="botao_flutuante"
        ariaLabel="Falar com a pousada pelo WhatsApp"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-sol-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-lg transition-colors hover:bg-sol-600"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5Z" />
        </svg>
        WhatsApp
      </WhatsAppLink>
    </div>
  );
}
