"use client";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useShop } from "@/lib/shop-context";
import { formatMZN, STORE } from "@/lib/shop-data";

export function CartDrawer() {
  const { cartOpen, setCartOpen, detailed, subtotal, setQuantity, remove } = useShop();

  return (
    <div
      className={`fixed inset-0 z-50 ${cartOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!cartOpen}
    >
      <button
        type="button"
        tabIndex={cartOpen ? 0 : -1}
        aria-label="Fechar sacola"
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-[90%] max-w-md flex-col bg-background shadow-soft transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="font-display text-xl">A sua sacola</span>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Fechar sacola"
            className="grid size-9 place-items-center rounded-full hover:bg-secondary"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" aria-hidden />
            <p className="text-sm text-muted-foreground">
              A sua sacola está vazia. Descubra a nossa seleção de skincare, acessórios e moda.
            </p>
            <Link
              href="/produtos"
              onClick={() => setCartOpen(false)}
              className="rounded-full bg-primary px-6 py-3 text-sm tracking-[0.06em] text-primary-foreground uppercase"
            >
              Explorar coleção
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {detailed.map(({ item, product, total }) => (
                <li
                  key={`${product.id}-${item.variant ?? ""}`}
                  className="flex gap-3 rounded-3xl bg-secondary/60 p-3"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="size-20 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm leading-tight font-medium">{product.name}</p>
                      <button
                        type="button"
                        onClick={() => remove(product.id, item.variant)}
                        aria-label={`Remover ${product.name}`}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                    {item.variant && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.variant}</p>
                    )}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full bg-background p-1">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(product.id, item.variant, item.quantity - 1)
                          }
                          aria-label="Diminuir quantidade"
                          className="grid size-7 place-items-center rounded-full hover:bg-secondary"
                        >
                          <Minus className="size-3.5" aria-hidden />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(product.id, item.variant, item.quantity + 1)
                          }
                          aria-label="Aumentar quantidade"
                          className="grid size-7 place-items-center rounded-full hover:bg-secondary"
                        >
                          <Plus className="size-3.5" aria-hidden />
                        </button>
                      </div>
                      <p className="text-sm">{formatMZN(total)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatMZN(subtotal)}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-lg">{formatMZN(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Entrega combinada após a encomenda. {STORE.logistics}
              </p>
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="mt-4 block rounded-full bg-primary py-4 text-center text-sm tracking-[0.06em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
              >
                Finalizar Compra
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
