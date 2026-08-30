"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatMZN } from "@/lib/format";
import { IconBag, IconClose, IconMinus, IconPlus, IconStar } from "./icons";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-0 right-0 mx-auto max-h-[90vh] max-w-2xl overflow-y-auto rounded-t-4xl bg-bone shadow-lift animate-slideUp md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:rounded-4xl">
        <div className="sticky top-0 z-10 flex justify-end bg-bone px-4 pb-2 pt-4">
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full bg-bone-dim p-2 transition hover:bg-line"
          >
            <IconClose size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 px-5 pb-8 md:grid-cols-2 md:px-8">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-bone-dim">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col md:justify-center">
            <div className="mb-2 flex items-start justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold leading-tight text-ink">
                {product.name}
              </h2>
              <span className="shrink-0 whitespace-nowrap font-mono text-xl font-semibold text-ink">
                MZN {formatMZN(product.price)}
              </span>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <IconStar
                    key={i}
                    size={14}
                    className={
                      i <= Math.floor(product.rating)
                        ? "fill-brass text-brass"
                        : "text-brass"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-ink-soft/70">
                {product.rating} ({product.reviews} avaliações)
              </span>
            </div>

            <p className="mb-6 font-sans text-sm leading-relaxed text-ink-soft">
              {product.desc}
            </p>

            <div className="mb-6">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft/70">
                Quantidade
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-bone-dim text-ink transition hover:bg-line"
                  aria-label="Diminuir quantidade"
                >
                  <IconMinus size={16} strokeWidth={2} />
                </button>
                <span className="w-6 text-center text-lg font-semibold text-ink">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-bone-dim text-ink transition hover:bg-line"
                  aria-label="Aumentar quantidade"
                >
                  <IconPlus size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, qty);
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald py-4 text-sm font-medium text-bone shadow-lift transition hover:bg-emerald-light"
            >
              <IconBag size={18} strokeWidth={1.8} /> Adicionar à Sacola —{" "}
              MZN {formatMZN(product.price)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
