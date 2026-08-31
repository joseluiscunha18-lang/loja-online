const serum = "/assets/p-serum.jpg";
const creme = "/assets/p-creme.jpg";
const limpeza = "/assets/p-limpeza.jpg";
const oleo = "/assets/p-oleo.jpg";
const protetor = "/assets/p-protetor.jpg";
const batom = "/assets/p-batom.jpg";
const perfume = "/assets/p-perfume.jpg";
const bolsa = "/assets/p-bolsa.jpg";
const oculos = "/assets/p-oculos.jpg";
const relogio = "/assets/p-relogio.jpg";
const brincos = "/assets/p-brincos.jpg";
const lenco = "/assets/p-lenco.jpg";
const blazer = "/assets/p-blazer.jpg";
const camisa = "/assets/p-camisa.jpg";
const vestido = "/assets/p-vestido.jpg";
export const editorial = "/assets/editorial.jpg";
const hero = "/assets/hero.jpg";

export const CATEGORIES = ["Tudo", "Skincare", "Acessórios", "Moda"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  name: string;
  category: Exclude<Category, "Tudo">;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  details: string[];
  options?: { label: string; values: string[] };
  bestSeller?: boolean;
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "serum-vitamina-c",
    name: "Sérum Iluminador Vitamina C",
    category: "Skincare",
    price: 1850,
    rating: 4.8,
    reviews: 128,
    images: [serum, editorial, creme],
    description:
      "Sérum leve de vitamina C estabilizada que uniformiza o tom da pele e devolve o brilho natural. Absorção rápida, sem oleosidade.",
    details: ["30 ml", "Todos os tipos de pele", "Uso diário, manhã"],
    bestSeller: true,
    badge: "Mais vendido",
  },
  {
    id: "creme-hidratante",
    name: "Creme Hidratante Nutritivo",
    category: "Skincare",
    price: 1450,
    rating: 4.7,
    reviews: 94,
    images: [creme, editorial],
    description:
      "Textura rica em manteiga de karité e ácido hialurónico para hidratação profunda durante 24 horas.",
    details: ["50 ml", "Pele seca a normal", "Manhã e noite"],
    bestSeller: true,
  },
  {
    id: "gel-limpeza",
    name: "Gel de Limpeza Suave",
    category: "Skincare",
    price: 980,
    rating: 4.6,
    reviews: 76,
    images: [limpeza, editorial],
    description:
      "Espuma delicada que remove impurezas e maquilhagem sem agredir a barreira natural da pele.",
    details: ["150 ml", "Pele sensível", "Sem sulfatos"],
  },
  {
    id: "oleo-corporal",
    name: "Óleo Corporal Seda",
    category: "Skincare",
    price: 1250,
    rating: 4.9,
    reviews: 61,
    images: [oleo, editorial],
    description:
      "Mistura de óleos de argan e amêndoa que deixa a pele macia com acabamento acetinado, nunca pesado.",
    details: ["100 ml", "Unissexo", "Aroma suave de baunilha"],
    bestSeller: true,
  },
  {
    id: "protetor-solar",
    name: "Protetor Solar SPF 50",
    category: "Skincare",
    price: 1350,
    rating: 4.8,
    reviews: 143,
    images: [protetor, editorial],
    description:
      "Proteção alta com toque seco e sem resíduo branco. Perfeito para o clima de Maputo, todos os dias.",
    details: ["60 ml", "Unissexo", "Resistente ao suor"],
  },
  {
    id: "batom-nude",
    name: "Batom Acetinado Nude",
    category: "Skincare",
    price: 750,
    rating: 4.5,
    reviews: 52,
    images: [batom],
    description:
      "Batom cremoso de longa duração com pigmento intenso e acabamento acetinado confortável.",
    details: ["3,5 g", "Longa duração", "Com vitamina E"],
    options: { label: "Tom", values: ["Nude", "Rosé", "Terracota"] },
  },
  {
    id: "perfume-unissexo",
    name: "Perfume Unissexo Bliss",
    category: "Skincare",
    price: 2950,
    rating: 4.9,
    reviews: 88,
    images: [perfume, editorial],
    description:
      "Eau de parfum de notas âmbar, bergamota e madeira de cedro. Assinatura elegante para ele e para ela.",
    details: ["100 ml", "Unissexo", "Fixação 8h+"],
    bestSeller: true,
    badge: "Novo",
  },
  {
    id: "bolsa-couro",
    name: "Bolsa de Couro Preta",
    category: "Acessórios",
    price: 3850,
    rating: 4.7,
    reviews: 39,
    images: [bolsa],
    description:
      "Bolsa estruturada em couro sintético premium com alça removível e forro interior em algodão.",
    details: ["28 × 22 cm", "Alça ajustável", "Ferragens douradas"],
    bestSeller: true,
  },
  {
    id: "oculos-sol",
    name: "Óculos de Sol Clássicos",
    category: "Acessórios",
    price: 1650,
    rating: 4.6,
    reviews: 44,
    images: [oculos],
    description:
      "Armação intemporal com lentes com proteção UV400. Modelo unissexo que valoriza qualquer rosto.",
    details: ["Proteção UV400", "Unissexo", "Estojo incluído"],
  },
  {
    id: "relogio-dourado",
    name: "Relógio Minimalista Dourado",
    category: "Acessórios",
    price: 2750,
    rating: 4.8,
    reviews: 33,
    images: [relogio],
    description:
      "Mostrador limpo, caixa dourada e bracelete em malha. Discreto, elegante e para todos os dias.",
    details: ["Caixa 36 mm", "Resistente à água 3 ATM", "Unissexo"],
  },
  {
    id: "brincos-argola",
    name: "Brincos Argola Dourados",
    category: "Acessórios",
    price: 890,
    rating: 4.7,
    reviews: 57,
    images: [brincos],
    description:
      "Argolas finas banhadas a ouro, leves e hipoalergénicas — o detalhe que completa qualquer visual.",
    details: ["Banho de ouro 18k", "Hipoalergénico", "Par"],
    options: { label: "Tamanho", values: ["Pequeno", "Médio", "Grande"] },
  },
  {
    id: "lenco-seda",
    name: "Lenço de Seda Areia",
    category: "Acessórios",
    price: 1150,
    rating: 4.5,
    reviews: 21,
    images: [lenco],
    description:
      "Lenço em toque de seda, versátil no cabelo, no pescoço ou na bolsa. Cai com fluidez.",
    details: ["90 × 90 cm", "Toque de seda", "Lavagem à mão"],
  },
  {
    id: "blazer-linho",
    name: "Blazer de Linho Areia",
    category: "Moda",
    price: 4250,
    rating: 4.8,
    reviews: 46,
    images: [blazer],
    description:
      "Blazer oversize em linho leve, com ombros suaves e caimento fluido. Peça-chave de qualquer guarda-roupa.",
    details: ["100% linho", "Corte oversize", "Forro parcial"],
    options: { label: "Tamanho", values: ["XS", "S", "M", "L", "XL"] },
    bestSeller: true,
  },
  {
    id: "camisa-algodao",
    name: "Camisa de Algodão Branca",
    category: "Moda",
    price: 2150,
    rating: 4.6,
    reviews: 68,
    images: [camisa],
    description:
      "Camisa unissexo em algodão premium com corte relaxado. Simples, impecável, para todas as ocasiões.",
    details: ["100% algodão", "Unissexo", "Corte relaxado"],
    options: { label: "Tamanho", values: ["XS", "S", "M", "L", "XL"] },
  },
  {
    id: "vestido-cetim",
    name: "Vestido Longo de Cetim",
    category: "Moda",
    price: 3950,
    rating: 4.9,
    reviews: 37,
    images: [vestido],
    description:
      "Vestido slip em cetim com corte enviesado que acompanha o corpo. Elegância discreta para eventos.",
    details: ["Cetim fluido", "Alças ajustáveis", "Forro interior"],
    options: { label: "Tamanho", values: ["XS", "S", "M", "L"] },
    badge: "Edição limitada",
  },
  {
    id: "conjunto-toalha",
    name: "Conjunto Ritual de Banho",
    category: "Moda",
    price: 1950,
    rating: 4.7,
    reviews: 18,
    images: [editorial, oleo],
    description:
      "Kit com toalha de algodão waffle e óleo corporal — o presente perfeito para quem ama autocuidado.",
    details: ["Toalha 70 × 140 cm", "Óleo 100 ml", "Embalagem para presente"],
  },
];

export const heroImage = hero;

export function formatMZN(value: number) {
  return `${value.toLocaleString("pt-PT")} MZN`;
}

export const STORE = {
  name: "Bliss Beauty & Care",
  email: "blissbeauty.com",
  instagram: "bliss beauty e care",
  instagramUrl: "https://instagram.com/",
  phoneDisplay: "+258 84 532 1354",
  whatsapp: "258845321354",
  delivery: "Fazemos entregas na Cidade de Maputo e Matola",
  logistics: "Atendimento e Entregas: Cidade de Maputo & Matola",
};
