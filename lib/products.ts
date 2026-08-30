import type { Category, Product } from "./types";

export const categories: Category[] = [
  { key: "all", label: "Tudo" },
  { key: "skincare", label: "Skincare" },
  { key: "maquilhagem", label: "Maquilhagem" },
  { key: "acessorios", label: "Acessórios" },
  { key: "moda", label: "Moda" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Sérum Facial Vitamina C",
    price: 1250,
    category: "skincare",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    rating: 4.8,
    reviews: 124,
    desc: "Sérum concentrado com 20% de Vitamina C para iluminar e uniformizar o tom da pele.",
    tag: "Mais vendido",
  },
  {
    id: 2,
    name: "Hidratante Noturno",
    price: 890,
    category: "skincare",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    rating: 4.6,
    reviews: 89,
    desc: "Creme hidratante de textura leve para uso noturno com ácido hialurónico.",
  },
  {
    id: 3,
    name: "Máscara Facial de Argila Rosa",
    price: 650,
    category: "skincare",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
    rating: 4.4,
    reviews: 167,
    desc: "Máscara purificante com argila rosa e extratos botânicos.",
  },
  {
    id: 4,
    name: "Água Micelar Suave",
    price: 480,
    category: "skincare",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    rating: 4.5,
    reviews: 71,
    desc: "Remove maquilhagem e impurezas sem agredir a pele. Fórmula sem álcool.",
    tag: "Novo",
  },
  {
    id: 5,
    name: "Batom Velvet Matte",
    price: 550,
    category: "maquilhagem",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
    rating: 4.7,
    reviews: 143,
    desc: "Cor intensa e longa duração com acabamento aveludado e conforto o dia todo.",
  },
  {
    id: 6,
    name: "Paleta de Sombras Ocre",
    price: 980,
    category: "maquilhagem",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
    rating: 4.6,
    reviews: 58,
    desc: "12 tons quentes altamente pigmentados, do mate ao metalizado.",
  },
  {
    id: 7,
    name: "Bolsa Tote Elegance",
    price: 2100,
    category: "acessorios",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    rating: 4.9,
    reviews: 56,
    desc: "Bolsa tote em couro sintético premium, espaçosa e sofisticada.",
    tag: "Edição limitada",
  },
  {
    id: 8,
    name: "Óculos de Sol Classic",
    price: 1450,
    category: "acessorios",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    rating: 4.7,
    reviews: 203,
    desc: "Armação leve com lentes polarizadas UV400. Design atemporal.",
  },
  {
    id: 9,
    name: "Brincos Pérola Minimal",
    price: 780,
    category: "acessorios",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    rating: 4.9,
    reviews: 312,
    desc: "Brincos delicados com pérola cultivada e base em ouro 18k.",
    tag: "Mais vendido",
  },
  {
    id: 10,
    name: "Colar Fio Dourado",
    price: 690,
    category: "acessorios",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    rating: 4.5,
    reviews: 47,
    desc: "Fio fino banhado a ouro 18k, ideal para uso diário ou sobreposto.",
  },
  {
    id: 11,
    name: "Vestido Linho Natural",
    price: 3200,
    category: "moda",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    rating: 4.5,
    reviews: 78,
    desc: "Vestido fluido em linho 100% natural. Corte elegante e confortável.",
  },
  {
    id: 12,
    name: "Blazer Oversized",
    price: 4500,
    category: "moda",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    rating: 4.8,
    reviews: 45,
    desc: "Blazer oversized em tom neutro. Peça versátil para qualquer ocasião.",
    tag: "Novo",
  },
];
