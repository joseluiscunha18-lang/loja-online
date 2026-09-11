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
const uriageXemose = "/assets/p-uriage-xemose.webp";
const aveneShampoo = "/assets/p-avene-shampoo.webp";
const lorealMen = "/assets/p-loreal-men.webp";
const skalaAmido = "/assets/p-skala-amido.webp";
const niveaHijabFresh = "/assets/p-nivea-hijab-fresh.webp";
const niveaHijabActive = "/assets/p-nivea-hijab-active.webp";
const niveaHijabSoft = "/assets/p-nivea-hijab-soft.webp";
const totexArgan = "/assets/p-totex-argan.webp";
const risqueChocolight = "/assets/p-risque-chocolight.webp";
const institutoRosa = "/assets/p-instituto-rosa.webp";
const institutoAloeVera = "/assets/p-instituto-aloevera.webp";
const yaraPerfume = "/assets/p-yara-perfume.webp";
const niveaRichCare = "/assets/p-nivea-rich-care.webp";
const niveaCoconut = "/assets/p-nivea-coconut.webp";
const niveaBodyCream = "/assets/p-nivea-body-cream.webp";
export const editorial = "/assets/editorial.jpg";
export const heroImage = "/assets/hero.jpg";

export const SITE_URL = "https://bliss-beauty-three.vercel.app";

export const STORE = {
  name: "Bliss Beauty",
  tagline: "Beleza que cuida de si",
  whatsapp: "258840000000",
  email: "blissbeauty@gmail.com",
  address: "Maputo, Moçambique",
  delivery: "Fazemos entregas na Cidade de Maputo e Matola",
  logistics: "Atendimento e Entregas: Cidade de Maputo & Matola",
} as const;

export function formatMZN(value: number | null | undefined): string {
  if (value == null) return "—";
  return value.toLocaleString("pt-MZ", { style: "currency", currency: "MZN", maximumFractionDigits: 0 });
}

export function productUrl(id: string): string {
  return `${SITE_URL}/produto/${id}`;
}

export const CATEGORIES = ["Tudo", "Skincare", "Cabelo", "Banho", "Desodorizante", "Maquiagem", "Perfume"] as const;
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
    category: "Desodorizante",
    price: 250,
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
    category: "Desodorizante",
    price: 250,
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
    id: "cabecas-escova-eletrica",
    name: "Cabeças de Escova de Limpeza Elétrica",
    category: "Maquiagem",
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
    category: "Maquiagem",
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
    category: "Cabelo",
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
  {
    id: "uriage-xemose-stick",
    name: "Uriage Xémose Stick Lèvres Hidratante",
    category: "Skincare",
    price: 1250,
    rating: 4.8,
    reviews: 74,
    images: [uriageXemose],
    description:
      "Stick labial hidratante da linha Xémose, especialmente formulado para lábios muito secos e atópicos. Sem perfume, hipoalergénico e com Água Termal de Uriage.",
    details: ["4g", "Sem perfume", "Hipoalergénico", "Lábios secos e atópicos"],
  },
  {
    id: "avene-shampoo-bebe",
    name: "Avène Shampoo Bebé Hipoalergénico",
    category: "Cabelo",
    price: 500,
    rating: 4.7,
    reviews: 58,
    images: [aveneShampoo],
    description:
      "Shampoo suave e hipoalergénico para bebé com fórmula de hidratação enriquecida, sem parabenos, corantes, fragrâncias nem sulfatos. Dermatologicamente testado.",
    details: ["200 ml", "Sem parabenos, corantes e sulfatos", "Hipoalergénico", "Para bebé"],
  },
  {
    id: "loreal-men-stress-resist",
    name: "L'Oréal Men Expert Stress Resist Gel de Duche 5 em 1",
    category: "Banho",
    price: 850,
    rating: 4.6,
    reviews: 91,
    images: [lorealMen],
    description:
      "Gel de duche relaxante 5 em 1 para corpo, rosto, cabelo, barba e bigode. Fórmula anti-stress que limpa profundamente e revitaliza a pele do homem.",
    details: ["5 em 1: corpo, rosto, cabelo, barba e bigode", "Fórmula relaxante", "Frasco com 30% menos plástico"],
  },
  {
    id: "skala-amido-milho",
    name: "Skala Expert Amido de Milho 2 em 1 (1000g)",
    category: "Cabelo",
    price: 650,
    rating: 4.8,
    reviews: 143,
    images: [skalaAmido],
    description:
      "Creme de pentear e hidratante 2 em 1 com amido de milho, manteiga de karité, óleo de coco e D-Pantenol. Proporciona ultra-reparação, força e brilho ao cabelo.",
    details: ["1000g", "2 em 1: creme de pentear + hidratante", "Vegano", "Amido de milho, manteiga de karité e óleo de coco"],
    bestSeller: true,
  },
  {
    id: "nivea-hijab-fresh",
    name: "Nivea Deodorant Brightening Hijab Fresh Roll-on",
    category: "Desodorizante",
    price: 250,
    rating: 4.6,
    reviews: 67,
    images: [niveaHijabFresh],
    description:
      "Desodorizante roll-on brightening com Vitamina C e Extrato de Sakura. Protecção de 48h, 0% álcool e fórmula de longa duração para uma sensação de frescura duradoura.",
    details: ["50 ml", "48h de protecção", "Vitamina C e Extrato de Sakura", "0% álcool"],
  },
  {
    id: "nivea-hijab-active",
    name: "Nivea Deodorant Hijab Active Bright & Dry Roll-on",
    category: "Desodorizante",
    price: 250,
    rating: 4.7,
    reviews: 53,
    images: [niveaHijabActive],
    description:
      "Desodorizante antitranspirante roll-on com 99% de ação antibacteriana e Vitamina C. Protecção de 48h, 0% álcool, fórmula Bright & Dry para axilas mais claras e secas.",
    details: ["50 ml", "49h Anti-Perspirante", "99% Antibacteriano", "Vitamina C", "0% álcool"],
  },
  {
    id: "nivea-hijab-soft",
    name: "Nivea Deodorant Hijab Soft Bright & Shaveless Roll-on",
    category: "Desodorizante",
    price: 250,
    rating: 4.7,
    reviews: 48,
    images: [niveaHijabSoft],
    description:
      "Desodorizante antitranspirante com protecção Derma Active 72h, Vitamina C e Extrato de Pérola. Fórmula Bright & Shaveless para axilas mais claras e suaves.",
    details: ["50 ml", "72h Anti-Perspirante", "Vitamina C e Extrato de Pérola", "0% álcool"],
  },
  {
    id: "totex-argan-conditioner",
    name: "Totex Cosmetic Argan Condicionador Bifásico (400ml)",
    category: "Cabelo",
    price: 750,
    rating: 4.7,
    reviews: 82,
    images: [totexArgan],
    description:
      "Condicionador bifásico de uso profissional com óleo de argão. Hidrata, condiciona e facilita o penteado sem necessidade de enxaguar, deixando o cabelo brilhante e macio.",
    details: ["400 ml", "Uso profissional", "Óleo de argão", "Não necessita enxaguar"],
  },
  {
    id: "risque-chocolight",
    name: "Risque Verniz de Unhas Chocolight",
    category: "Maquiagem",
    price: 150,
    rating: 4.5,
    reviews: 39,
    images: [risqueChocolight],
    description:
      "Verniz de unhas cremoso da Risque na cor Chocolight, uma nova tonalidade chocolate sofisticada e versátil para um look moderno e elegante.",
    details: ["8,1 ml", "Acabamento cremoso", "Nova cor Chocolight"],
  },
  {
    id: "instituto-rosa-mosqueta",
    name: "Instituto Español Óleo Corporal Rosa Mosqueta (400ml)",
    category: "Perfume",
    price: 900,
    rating: 4.8,
    reviews: 117,
    images: [institutoRosa],
    description:
      "Óleo corporal de rosa mosqueta para banho, duche e massagem. Acondicionador de pele com propriedades regeneradoras que nutre e suaviza profundamente a pele.",
    details: ["400 ml", "Para banho, duche e massagem", "Óleo de Rosa Mosqueta", "Acondicionador de pele"],
    bestSeller: true,
  },
  {
    id: "instituto-aloe-vera",
    name: "Instituto Español Gel de Duche Aloe Vera (1250ml)",
    category: "Banho",
    price: 1250,
    rating: 4.7,
    reviews: 134,
    images: [institutoAloeVera],
    description:
      "Gel de duche hidratante com 100% Aloe Vera natural, em formato familiar de 1250 ml. Cuida da pele com propriedades calmantes e hidratantes do aloé vera puro.",
    details: ["1250 ml", "100% Aloe Vera natural", "Hidratante", "Formato familiar"],
    bestSeller: true,
  },
  {
    id: "yara-perfume-oil",
    name: "Yara Óleo de Perfume Concentrado Roll-on",
    category: "Perfume",
    price: 100,
    rating: 4.6,
    reviews: 61,
    images: [yaraPerfume],
    description:
      "Óleo de perfume concentrado Yara em frasco roll-on, uma fragrância oriental intensa e duradoura. Fácil de aplicar e perfeito para levar na bolsa.",
    details: ["Roll-on", "Perfume concentrado", "Fragrância oriental"],
  },
  {
    id: "nivea-rich-care-shower-oil",
    name: "Nivea Rich Care Shower Oil (200ml)",
    category: "Banho",
    price: 900,
    rating: 4.8,
    reviews: 98,
    images: [niveaRichCare],
    description:
      "Óleo de duche nutritivo com 55% de óleos naturais, Vitaminas C e E. Limpa e hidrata profundamente a pele durante o banho, deixando-a suave e sedosa.",
    details: ["200 ml", "55% óleos naturais", "Vitaminas C e E", "Pele normal a seca"],
  },
  {
    id: "nivea-coconut-body-cream",
    name: "Nivea Coconut & Monoi Oil Cream (400ml)",
    category: "Skincare",
    price: 450,
    rating: 4.7,
    reviews: 112,
    images: [niveaCoconut],
    description:
      "Creme corporal Oil in Cream com coco e óleo de monoi, ideal para pele normal a seca. Fórmula rica que nutre e suaviza a pele com um toque de óleo leve.",
    details: ["400 ml", "Óleo de coco e monoi", "Pele normal a seca", "Oil in Cream"],
  },
  {
    id: "nivea-intensive-moisturising",
    name: "Nivea Body Cream Intensive Moisturising (400ml)",
    category: "Skincare",
    price: 450,
    rating: 4.8,
    reviews: 145,
    images: [niveaBodyCream],
    description:
      "Creme corporal intensivo 5 em 1 com Deep Moisture Serum e minerais do mar. Hidratação de 48h de absorção rápida para pele normal a seca.",
    details: ["400 ml", "48h de hidratação", "5 em 1", "Deep Moisture Serum e minerais do mar"],
  },
];