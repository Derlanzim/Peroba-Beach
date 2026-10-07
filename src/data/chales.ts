export type GrupoPreco = "A" | "B";

export type Chale = {
  id: string;
  nome: string;
  capacidade: number;
  andar: "inferior" | "superior";
  descricao: string;
  grupoPreco: GrupoPreco;
  // Caminho em /public (ex.: "/fotos/chale-1.jpg"). null = espaço reservado.
  foto: string | null;
};

// Fonte: catálogo 2026 da pousada.
export const chales: Chale[] = [
  {
    id: "chale-1",
    nome: "Chalé 1",
    capacidade: 6,
    andar: "inferior",
    descricao: "1 quarto, sala e 2 banheiros.",
    grupoPreco: "A",
    foto: null,
  },
  {
    id: "chale-2",
    nome: "Chalé 2",
    capacidade: 4,
    andar: "inferior",
    descricao: "Sala integrada e 1 banheiro.",
    grupoPreco: "B",
    foto: null,
  },
  {
    id: "chale-3",
    nome: "Chalé 3",
    capacidade: 6,
    andar: "superior",
    descricao: "1 quarto, sala e 2 banheiros, como o Chalé 1.",
    grupoPreco: "A",
    foto: null,
  },
  {
    id: "chale-4",
    nome: "Chalé 4",
    capacidade: 4,
    andar: "superior",
    descricao: "Sala integrada e 1 banheiro, como o Chalé 2.",
    grupoPreco: "B",
    foto: null,
  },
];

export const CAPACIDADE_MAXIMA = Math.max(...chales.map((c) => c.capacidade));

export const comodidades = [
  { titulo: "Vista para o mar", texto: "Todos os chalés têm vista para o mar." },
  {
    titulo: "Cozinha equipada",
    texto: "Fogão, geladeira, gelágua e utensílios.",
  },
  { titulo: "Ar-condicionado", texto: "Em todos os chalés." },
  { titulo: "Wi-Fi", texto: "Internet disponível nos chalés." },
];

export const avisoCafe =
  "O café da manhã não está incluso. Há um restaurante ao lado da pousada.";
