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
      "Hidratante facial oil-free com toranja rosa que refresca e hidrata sem obstruir os poros, indicado para pele com tendência a acne.",
    details: ["Oil-free", "Pele com tendência a acne", "Uso diário"],
    bestSeller: true,
  },
  {
    id: "uriage-bariederm-cica",
    name: "Uriage Bariéderm-Cica Labial",
    category: "Skincare",
    price: 1250,
    rating: 4.8,
    reviews: 87,
    images: [uriage, editorial],
    description:
      "Bálsamo reparador e isolante de alta tolerância, concebido para acalmar e nutrir lábios secos, gretados e fragilizados.",
    details: ["15 ml", "Peles sensíveis e fragilizadas", "Sem perfume"],
    bestSeller: true,
  },
  {
    id: "avene-cicalfate",
    name: "Avène Cicalfate+ Lèvres Creme Labial",
    category: "Skincare",
    price: 1350,
    rating: 4.9,
    reviews: 96,
    images: [avene, editorial],
    description:
      "Creme reparador labial de acção rápida, formulado para restruturar, proteger e suavizar lábios secos, gretados ou irritados.",
    details: ["10 ml", "Lábios secos e irritados", "Acção rápida"],
    bestSeller: true,
  },
  {
    id: "oleoban-creme-diario",
    name: "Oleoban Creme Diário Hidratante (1kg)",
    category: "Skincare",
    price: 4900,
    rating: 4.7,
    reviews: 64,
    images: [oleoban, editorial],
    description:
      "Creme hidratante de alta capacidade formulado para pele seca e sensível. Reforça a barreira natural da pele e é dermatologicamente testado.",
    details: ["1 kg", "Pele seca e sensível", "Dermatologicamente testado"],
  },
  {
    id: "aloe-vera-gel",
    name: "Wokali Aloe Vera Hydrating Lotion",
    category: "Skincare",
    price: 350,
    rating: 4.8,
    reviews: 121,
    images: [aloevera, editorial],
    description:
      "Loção corporal hidratante enriquecida com extracto de Aloé Vera. Mantém a pele suave, refrescada e com tom uniforme.",
    details: ["Fórmula com Aloé Vera", "Uso corporal diário", "Textura fresca"],
    bestSeller: true,
  },
  {
    id: "vaselina-pura",
    name: "QI Purified Vaseline",
    category: "Skincare",
    price: 499,
    rating: 4.6,
    reviews: 73,
    images: [vaselina],
    description:
      "Vaselina purificada e sem fragrância. Cria uma barreira protectora que previne a perda de humidade em zonas secas como cotovelos, joelhos, mãos e calcanhares.",
    details: ["100 ml", "Uso multiusos", "Sem fragrância"],
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
    name: "Aichun Beauty Lip Balm Argan & Aloe",
    category: "Skincare",
    price: 200,
    rating: 4.7,
    reviews: 105,
    images: [balsamos],
    description:
      "Bálsamo labial prático e compacto para hidratação diária, formulado com óleo de argão, aloé vera e essência de laranja.",
    details: ["4 ml", "Óleo de argão e aloé vera", "Aroma a laranja"],
  },
  {
    id: "desodorizantes-stick",
    name: "Dove Advanced Care Body Spray",
    category: "Banho",
    price: null,
    rating: 4.6,
    reviews: 82,
    images: [desodorizantes],
    description:
      "Desodorizante antitranspirante em spray que oferece protecção de longa duração contra o suor e maus odores, com tecnologia Pro-Ceramide.",
    details: ["Protecção 72h", "Tecnologia Pro-Ceramide", "Cuida da pele das axilas"],
  },
  {
    id: "nivea-rollon",
    name: "Dove Advanced Care Roll-on",
    category: "Banho",
    price: null,
    rating: 4.7,
    reviews: 134,
    images: [niveaRollon],
    description:
      "Desodorizante roll-on que cuida da pele enquanto protege contra o suor, com fórmula que ajuda a uniformizar o tom da pele.",
    details: ["Protecção de longa duração", "Cuida da pele", "Aplicação prática"],
  },
  {
    id: "amalfi-gel-duche",
    name: "Amalfi Gel de Banho Coco (750ml)",
    category: "Banho",
    price: 330,
    rating: 4.6,
    reviews: 69,
    images: [amalfi, editorial],
    description:
      "Gel de banho de uso diário com textura suave e cremosa, que limpa eficazmente deixando a pele perfumada com aroma a coco.",
    details: ["750 ml", "Aroma de coco", "Uso diário"],
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
    name: "Salvitas Pedra Quitadurezas",
    category: "Banho",
    price: 150,
    rating: 4.4,
    reviews: 29,
    images: [pedraPomes],
    description:
      "Pedra-pomes desenvolvida para remover pele morta, calosidades e durezas na sola dos pés, suavizando calcanhares ásperos.",
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

export const SITE_URL = "https://bliss-beauty-three.vercel.app";

export function productUrl(productId: string) {
  return `${SITE_URL}/produto/${productId}`;
}
