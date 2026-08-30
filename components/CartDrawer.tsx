"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatMZN } from "@/lib/format";
import { IconBag, IconClose, IconMinus, IconPlus } from "./icons";

interface CartDrawerProps {
  onClose: () => void;
}

export function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, totalPrice, removeItem, updateQty } = useCart();

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 right-0 top-0 flex w-full max-w-sm flex-col bg-bone shadow-2xl animate-slideInRight">
        <div className="flex items-center justify-between border-b border-line bg-bone p-5">
          <h2 className="font-display text-xl font-semibold text-ink">Sacola</h2>
          <button
            onClick={onClose}
            aria-label="Fechar sacola"
            className="rounded-xl p-2 transition hover:bg-bone-dim"
          >
            <IconClose size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bone-dim text-ink-soft">
                <IconBag size={22} strokeWidth={1.6} />
              </div>
              <p className="text-sm font-medium text-ink-soft">
                Sua sacola está vazia
              </p>
              <p className="mt-1 text-xs text-ink-soft/70">
                Adicione produtos para começar
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-2xl border border-line bg-white p-3"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-bone-dim">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium text-ink">{item.name}</h4>
                  <p className="mb-2 font-mono text-xs text-ink-soft/80">
                    MZN {formatMZN(item.price)} / un
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-bone-dim text-sm transition hover:bg-line"
                        aria-label="Diminuir quantidade"
                      >
                        <IconMinus size={12} strokeWidth={2} />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-ink">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-bone-dim text-sm transition hover:bg-line"
                        aria-label="Aumentar quantidade"
                      >
                        <IconPlus size={12} strokeWidth={2} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-rose transition hover:text-red-600"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line bg-white p-5">
            <div className="mb-1 flex justify-between">
              <span className="text-sm text-ink-soft">Subtotal</span>
              <span className="font-mono text-sm font-medium text-ink">
                MZN {formatMZN(totalPrice)}
              </span>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="text-sm text-ink-soft">Entrega</span>
              <span className="text-sm font-medium text-emerald">Grátis</span>
            </div>
            <div className="mb-5 flex justify-between border-t border-line pt-3">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-display text-xl font-semibold text-ink">
                MZN {formatMZN(totalPrice)}
              </span>
            </div>
            <button className="w-full rounded-2xl bg-ink py-4 text-sm font-medium text-bone shadow-lg transition hover:bg-ink-soft">
              Finalizar Compra
            </button>
            <p className="mt-3 text-center text-[10px] text-ink-soft/70">
              Entregas em Maputo &amp; Matola
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
