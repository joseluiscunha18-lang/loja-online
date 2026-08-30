"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { IconHeart, IconPlus, IconStar } from "./icons";
import { PriceTag } from "./PriceTag";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export function ProductCard({ product, onOpen, onQuickAdd }: ProductCardProps) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
      onClick={() => onOpen(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-bone-dim">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <PriceTag price={product.price} />

        {product.tag && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-bone backdrop-blur">
            {product.tag}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          aria-label="Adicionar à sacola rapidamente"
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-md transition hover:bg-ink hover:text-white"
        >
          <IconPlus size={16} strokeWidth={2} />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          aria-label="Adicionar aos favoritos"
          className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-ink backdrop-blur transition hover:bg-white"
        >
          <IconHeart size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 p-3">
        <h4 className="truncate font-sans text-sm font-medium text-ink">
          {product.name}
        </h4>
        <div className="flex shrink-0 items-center gap-1">
          <IconStar size={13} className="fill-brass text-brass" />
          <span className="text-xs text-ink-soft/70">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}
