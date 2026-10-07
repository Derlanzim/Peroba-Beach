import WhatsAppLink from "./WhatsAppLink";
import { linkWhatsApp } from "../lib/whatsapp";
import { MENSAGEM_GERAL, site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-navy-900/10 pb-28">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-xl font-semibold text-navy-900">{site.nome}</p>
          <p className="mt-1 text-navy-800">{site.local}</p>
        </div>
        <div>
          <p className="font-semibold text-navy-900">WhatsApp</p>
          <WhatsAppLink
            href={linkWhatsApp(MENSAGEM_GERAL)}
            local="rodape"
            className="text-navy-800 underline hover:text-navy-900"
          >
            {site.whatsapp.exibicao}
          </WhatsAppLink>
        </div>
        <div>
          <p className="font-semibold text-navy-900">Instagram</p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-800 underline hover:text-navy-900"
          >
            @{site.instagram.usuario}
          </a>
        </div>
      </div>
      <p className="px-4 text-center text-sm text-navy-800">
        © {new Date().getFullYear()} {site.nome}
      </p>
    </footer>
  );
}
