"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; product: Product; qty: number }
  | { type: "REMOVE"; id: number }
  | { type: "UPDATE_QTY"; id: number; delta: number };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, qty: i.qty + action.qty } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.product, qty: action.qty }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, i.qty + action.delta) } : i
        ),
      };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addItem = useCallback((product: Product, qty: number = 1) => {
    dispatch({ type: "ADD", product, qty });
    setToastMessage(`${product.name} adicionado à sacola`);
  }, []);

  const removeItem = useCallback((id: number) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    dispatch({ type: "UPDATE_QTY", id, delta });
  }, []);

  const dismissToast = useCallback(() => setToastMessage(null), []);

  const totalCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty, 0),
    [state.items]
  );
  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [state.items]
  );

  const value: CartContextValue = {
    items: state.items,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    updateQty,
    toastMessage,
    dismissToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
