const pinceis = "/assets/p-pinceis.webp";
const tiara = "/assets/p-tiara.webp";
const neutrogena = "/assets/p-neutrogena.webp";
const buchas = "/assets/p-buchas.webp";
const vaselina = "/assets/p-vaselina.webp";
const uriage = "/assets/p-uriage.webp";
const aloevera = "/assets/p-aloevera.webp";
const elasticos = "/assets/p-elasticos.webp";
const esponja = "/assets/p-esponja.webp";
const niveaRollon = "/assets/p-nivea-rollon.webp";
const avene = "/assets/p-avene.webp";
const oleoban = "/assets/p-oleoban.webp";
const escovaFacial = "/assets/p-escova-facial.webp";
const balsamos = "/assets/p-balsamos.webp";
const herbissimo = "/assets/p-herbissimo.webp";
const desodorizantes = "/assets/p-desodorizantes.webp";
const cabecasEscova = "/assets/p-cabecas-escova.webp";
const scrunchies = "/assets/p-scrunchies.webp";
const amalfi = "/assets/p-amalfi.webp";
const pedraPomes = "/assets/p-pedra-pomes.webp";
const presilhas = "/assets/p-presilhas.webp";
export const editorial = "/assets/editorial.jpg";
const hero = "/assets/hero.jpg";

export const CATEGORIES = ["Tudo", "Skincare", "Cabelo", "Banho", "Acessórios"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  name: string;
  category: Exclude<Category, "Tudo">;
  /** Use `null` quando ainda não houver preço definido — mostra "Sob consulta" */
  price: number | null;
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
    id: "neutrogena-refreshingly-clear",
    name: "Neutrogena Refreshingly Clear Hidratante",
    category: "Skincare",
    price: 1250,
    rating: 4.7,
    reviews: 112,
    images: [neutrogena, editorial],
    description:
      "Hidratante facial com toranja rosa que refresca e hidrata sem obstruir os poros. Fórmula oil-free desenvolvida com dermatologistas.",
    details: ["Oil-free", "Pele com tendência a acne", "Uso diário"],
    bestSeller: true,
    badge: "Mais vendido",
  },
  {
    id: "uriage-bariederm-cica",
    name: "Uriage Bariéderm Cica Creme",
    category: "Skincare",
    price: 1650,
    rating: 4.8,
    reviews: 87,
    images: [uriage, editorial],
    description:
      "Creme reparador para peles fragilizadas, com Cica-Uriage que ajuda a acalmar e restaurar a barreira cutânea.",
    details: ["40 ml", "Peles sensíveis e fragilizadas", "Uso diário"],
    bestSeller: true,
  },
  {
    id: "avene-cicalfate",
    name: "Avène Cicalfate+ Creme Reparador",
    category: "Skincare",
    price: 1750,
    rating: 4.9,
    reviews: 96,
    images: [avene, editorial],
    description:
      "Creme reparador multiusos com Água Termal de Avène e cobre-zinco, ideal para peles irritadas e após pequenas agressões cutâneas.",
    details: ["40 ml", "Todos os tipos de pele", "Uso local ou geral"],
    bestSeller: true,
  },
  {
    id: "oleoban-creme-diario",
    name: "Oleoban Skin First Creme Diário",
    category: "Skincare",
    price: 1450,
    rating: 4.7,
    reviews: 64,
    images: [oleoban, editorial],
    description:
      "Creme corporal de uso diário que hidrata profundamente e reforça a barreira cutânea, deixando a pele mais macia e confortável.",
    details: ["Formato família", "Pele seca a normal", "Sem parabenos"],
  },
  {
    id: "aloe-vera-gel",
    name: "Gel de Aloe Vera 100%",
    category: "Skincare",
    price: 950,
    rating: 4.8,
    reviews: 121,
    images: [aloevera, editorial],
    description:
      "Gel puro de aloé vera para rosto, corpo e cabelo. Acalma, hidrata e refresca — o essencial multiusos da rotina de beleza.",
    details: ["Fórmula 100% natural", "Uso facial, corporal e capilar", "Textura fresca"],
    bestSeller: true,
  },
  {
    id: "vaselina-pura",
    name: "Vaselina Pura",
    category: "Skincare",
    price: 450,
    rating: 4.6,
    reviews: 73,
    images: [vaselina],
    description:
      "Vaselina pura clássica para hidratar lábios, cutículas e zonas secas da pele. O básico que nunca falta em casa.",
    details: ["Uso multiusos", "Fórmula clássica", "Todos os tipos de pele"],
  },
  {
    id: "herbissimo-sensitive",
    name: "Herbíssimo Creme Hidratante Sensitive",
    category: "Skincare",
    price: 1150,
    rating: 4.6,
    reviews: 58,
    images: [herbissimo],
    description:
      "Creme hidratante dermatologicamente testado para peles sensíveis, com absorção rápida e toque não oleoso.",
    details: ["Pele sensível", "Sem perfume", "Absorção rápida"],
  },
  {
    id: "balsamos-labiais",
    name: "Kit de Bálsamos Labiais Coloridos",
    category: "Skincare",
    price: 890,
    rating: 4.7,
    reviews: 105,
    images: [balsamos],
    description:
      "Conjunto de bálsamos labiais hidratantes em várias cores e aromas, perfeitos para levar na mala ou na bolsa.",
    details: ["Kit com várias unidades", "Fórmula hidratante", "Vários aromas"],
    options: { label: "Aroma", values: ["Frutas vermelhas", "Coco", "Menta", "Original"] },
  },
  {
    id: "desodorizantes-stick",
    name: "Kit de Desodorizantes em Stick",
    category: "Skincare",
    price: 1350,
    rating: 4.6,
    reviews: 82,
    images: [desodorizantes],
    description:
      "Conjunto de desodorizantes sólidos de longa duração, com proteção 48h e fragrâncias variadas para toda a semana.",
    details: ["Proteção 48h", "Vários aromas", "Kit completo"],
  },
  {
    id: "nivea-rollon",
    name: "Nivea Roll-on Natural Radiance",
    category: "Skincare",
    price: 550,
    rating: 4.7,
    reviews: 134,
    images: [niveaRollon],
    description:
      "Desodorizante roll-on que cuida da pele enquanto protege contra o suor, com fórmula que ajuda a uniformizar o tom da pele.",
    details: ["50 ml", "Proteção 48h", "Cuidado e proteção"],
  },
  {
    id: "amalfi-gel-duche",
    name: "Amalfi Gel de Duche Coco",
    category: "Banho",
    price: 750,
    rating: 4.6,
    reviews: 69,
    images: [amalfi, editorial],
    description:
      "Gel de duche cremoso com aroma tropical de coco, que limpa suavemente enquanto deixa a pele macia e perfumada.",
    details: ["Aroma de coco", "Formato família", "Pele normal a seca"],
    bestSeller: true,
  },
  {
    id: "buchas-banho",
    name: "Kit de Buchas de Banho",
    category: "Banho",
    price: 350,
    rating: 4.5,
    reviews: 47,
    images: [buchas],
    description:
      "Conjunto de três buchas coloridas em malha macia, ideais para esfoliar suavemente e ativar a circulação no duche.",
    details: ["Conjunto com 3 unidades", "Malha macia", "Cores variadas"],
    options: { label: "Cor", values: ["Verde", "Roxo", "Amarelo"] },
  },
  {
    id: "esponja-rosa",
    name: "Esponja de Banho Rosa",
    category: "Banho",
    price: 220,
    rating: 4.5,
    reviews: 38,
    images: [esponja],
    description:
      "Esponja de banho fofa e macia que cria espuma rica com pouco produto, deixando a pele limpa e suave.",
    details: ["Malha macia", "Cria espuma rica", "Leve e compacta"],
  },
  {
    id: "pedra-pomes",
    name: "Pedra-pomes Esfoliante Salvitas",
    category: "Banho",
    price: 280,
    rating: 4.4,
    reviews: 29,
    images: [pedraPomes],
    description:
      "Pedra-pomes natural para esfoliar os pés, remover calos e durezas e deixar a pele lisa e macia.",
    details: ["Uso nos pés", "Pedra natural", "Fácil de usar"],
  },
  {
    id: "escova-limpeza-facial",
    name: "Escova de Limpeza Facial Dupla",
    category: "Acessórios",
    price: 650,
    rating: 4.6,
    reviews: 41,
    images: [escovaFacial],
    description:
      "Escova facial de silicone com cerdas duplas para uma limpeza profunda, removendo impurezas e células mortas.",
    details: ["Silicone macio", "Dupla face", "Fácil de lavar"],
  },
  {
    id: "cabecas-escova-eletrica",
    name: "Cabeças de Escova de Limpeza Elétrica",
    category: "Acessórios",
    price: 980,
    rating: 4.5,
    reviews: 33,
    images: [cabecasEscova],
    description:
      "Conjunto de cabeças de substituição para escova de limpeza facial elétrica, em silicone macio e hipoalergénico.",
    details: ["Pack com 4 cabeças", "Compatível com escovas elétricas", "Silicone hipoalergénico"],
  },
  {
    id: "pinceis-maquiagem",
    name: "Conjunto de Pincéis de Maquiagem",
    category: "Acessórios",
    price: 1150,
    rating: 4.7,
    reviews: 55,
    images: [pinceis],
    description:
      "Kit de pincéis coloridos para sombra, delineado e esfumado, com cerdas macias para uma aplicação profissional.",
    details: ["Kit com 5 unidades", "Cerdas macias", "Cabo ergonómico"],
    bestSeller: true,
  },
  {
    id: "tiara-perolas",
    name: "Tiara Dupla de Pérolas",
    category: "Acessórios",
    price: 780,
    rating: 4.6,
    reviews: 27,
    images: [tiara],
    description:
      "Tiara dupla decorada com pérolas, um acessório elegante que eleva qualquer penteado em segundos.",
    details: ["Duas tiaras em conjunto", "Detalhe em pérolas", "Confortável para uso prolongado"],
  },
  {
    id: "elasticos-cabelo",
    name: "Pack de Elásticos de Cabelo Coloridos",
    category: "Cabelo",
    price: 320,
    rating: 4.5,
    reviews: 62,
    images: [elasticos],
    description:
      "Conjunto com dezenas de elásticos finos e coloridos, perfeitos para pentear e prender o cabelo todos os dias.",
    details: ["Pack grande", "Cores variadas", "Elástico macio"],
  },
  {
    id: "scrunchies-seda",
    name: "Conjunto de Scrunchies em Seda",
    category: "Cabelo",
    price: 590,
    rating: 4.8,
    reviews: 48,
    images: [scrunchies],
    description:
      "Elásticos de cabelo em tecido acetinado que não marcam nem danificam o cabelo, com acabamento elegante.",
    details: ["Conjunto com várias unidades", "Toque acetinado", "Não marca o cabelo"],
    bestSeller: true,
  },
  {
    id: "presilhas-cabelo",
    name: "Conjunto de Presilhas de Cabelo",
    category: "Cabelo",
    price: 690,
    rating: 4.6,
    reviews: 35,
    images: [presilhas],
    description:
      "Conjunto variado de presilhas em formatos de flores e borboletas, para looks delicados e cheios de personalidade.",
    details: ["Conjunto com várias peças", "Formatos variados", "Acabamento delicado"],
  },
];

export const heroImage = hero;
export const heroBlurDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAoACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDZC0uKkKYpMVzm4w4A5qMlW6GqepyuqkLxWXp17Kbgo2SKAOwIDLUBGDTlfK8UwctTEijqEYZCazbOKJJsnrWnqKsRtXrWW9rImG6VPU06HQYKLTEf5qKKZmLsDyZNQXSBjiiiqEz/2Q==";

export function formatMZN(value: number | null) {
  if (value === null) return "Sob consulta";
  return `${value.toLocaleString("pt-PT")} MZN`;
}

export const STORE = {
  name: "Bliss Beauty & Care",
  email: "blissbeauty.com",
  instagram: "bliss beauty e care",
  instagramUrl: "https://instagram.com/",
  phoneDisplay: "+258 86 060 6170",
  whatsapp: "258860606170",
  delivery: "Fazemos entregas na Cidade de Maputo e Matola",
  logistics: "Atendimento e Entregas: Cidade de Maputo & Matola",
};
