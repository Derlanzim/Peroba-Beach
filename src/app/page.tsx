import Header from "../components/Header";
import Hero from "../components/Hero";
import ReservaWidget from "../components/ReservaWidget";
import Chales from "../components/Chales";
import Estrutura from "../components/Estrutura";
import Valores from "../components/Valores";
import ComoChegar from "../components/ComoChegar";
import Footer from "../components/Footer";
import WhatsAppFlutuante from "../components/WhatsAppFlutuante";
import { site } from "../lib/site";

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: site.nome,
  description: site.descricao,
  telephone: `+${site.whatsapp.numero}`,
  url: site.url,
  sameAs: [site.instagram.url],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Icapuí",
    addressRegion: "CE",
    addressCountry: "BR",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ReservaWidget />
        <Chales />
        <Estrutura />
        <Valores />
        <ComoChegar />
      </main>
      <Footer />
      <WhatsAppFlutuante />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />
    </>
  );
}
