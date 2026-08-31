"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "./shop-data";

export type CartItem = {
  productId: string;
  variant?: string;
  quantity: number;
};

type ShopContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number, variant?: string) => void;
  setQuantity: (productId: string, variant: string | undefined, quantity: number) => void;
  remove: (productId: string, variant?: string) => void;
  clear: () => void;
  detailed: { item: CartItem; product: Product; total: number }[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  activeProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);
const STORAGE_KEY = "bliss-cart-v1";

const sameLine = (item: CartItem, productId: string, variant?: string) =>
  item.productId === productId && (item.variant ?? "") === (variant ?? "");

export function ShopProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignora carrinho inválido */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((product: Product, quantity = 1, variant?: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => sameLine(item, product.id, variant));
      if (existing) {
        return prev.map((item) =>
          sameLine(item, product.id, variant)
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { productId: product.id, variant, quantity }];
    });
    setCartOpen(true);
  }, []);

  const setQuantity = useCallback(
    (productId: string, variant: string | undefined, quantity: number) => {
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((item) => !sameLine(item, productId, variant))
          : prev.map((item) => (sameLine(item, productId, variant) ? { ...item, quantity } : item)),
      );
    },
    [],
  );

  const remove = useCallback((productId: string, variant?: string) => {
    setItems((prev) => prev.filter((item) => !sameLine(item, productId, variant)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo(
    () =>
      items.flatMap((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return [];
        return [{ item, product, total: product.price * item.quantity }];
      }),
    [items],
  );

  const value: ShopContextValue = {
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: detailed.reduce((sum, line) => sum + line.total, 0),
    add,
    setQuantity,
    remove,
    clear,
    detailed,
    cartOpen,
    setCartOpen,
    menuOpen,
    setMenuOpen,
    searchOpen,
    setSearchOpen,
    activeProduct,
    openProduct: (product) => setActiveProduct(product),
    closeProduct: () => setActiveProduct(null),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop deve ser usado dentro de ShopProvider");
  return ctx;
}
