export type CategoryKey = "skincare" | "maquilhagem" | "acessorios" | "moda";

export interface Category {
  key: CategoryKey | "all";
  label: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: CategoryKey;
  image: string;
  rating: number;
  reviews: number;
  desc: string;
  tag?: string;
}

export interface CartItem extends Product {
  qty: number;
}
