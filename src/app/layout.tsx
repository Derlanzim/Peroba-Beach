import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "../lib/site";
import Analytics from "../components/Analytics";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} | Chalés com vista para o mar em Icapuí, CE`,
    template: `%s | ${site.nomeCurto}`,
  },
  description: site.descricao,
  openGraph: {
    title: site.nome,
    description: site.descricao,
    locale: "pt_BR",
    type: "website",
    siteName: site.nome,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A2540",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
