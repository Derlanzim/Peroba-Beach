// Dados gerais da pousada. Edite aqui para atualizar o site inteiro.
export const site = {
  nome: "Pousada Peroba Beach Chalés",
  nomeCurto: "Peroba Beach Chalés",
  lema: "Vista para o mar. Tempo para você.",
  descricao:
    "Chalés com vista para o mar, cozinha equipada, ar-condicionado e Wi-Fi na Praia de Peroba, em Icapuí, Ceará.",
  local: "Praia de Peroba, Icapuí/CE",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: {
    numero: "5585988074505",
    exibicao: "+55 85 98807-4505",
  },
  instagram: {
    usuario: "perobabeachchales",
    url: "https://www.instagram.com/perobabeachchales/",
  },
  mapa: "https://www.google.com/maps/search/?api=1&query=Praia+de+Peroba+Icapu%C3%AD+CE",
  distancias: [
    { cidade: "Fortaleza", km: 180 },
    { cidade: "Mossoró", km: 77 },
    { cidade: "Natal", km: 360 },
  ],
  // Caminhos de fotos em /public. Enquanto estiver null, o site mostra um espaço reservado.
  // Exemplo: hero: "/fotos/hero.jpg"
  fotos: {
    hero: null as string | null,
  },
};

export const MENSAGEM_GERAL =
  "Olá! Vim pelo site da Pousada Peroba Beach Chalés e gostaria de mais informações.";
