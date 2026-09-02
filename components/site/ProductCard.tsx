"use client";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/lib/shop-context";
import { formatMZN, type Product } from "@/lib/shop-data";

export function ProductCard({ product }: { product: Product }) {
  const { add, openProduct } = useShop();
  const [liked, setLiked] = useState(false);

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-3xl bg-secondary">
        <button
          type="button"
          onClick={() => openProduct(product)}
          className="block w-full"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="aspect-square w-full scale-[1.38] object-cover transition-transform duration-500 group-hover:scale-[1.45]"
          />
        </button>

        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[0.6rem] tracking-[0.14em] uppercase">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background/85 backdrop-blur"
        >
          <Heart className={`size-4 ${liked ? "fill-foreground" : ""}`} aria-hidden />
        </button>
      </div>

      <div className="flex items-start gap-2 px-1 pt-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm leading-tight font-medium">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{formatMZN(product.price)}</p>
        </div>
        <button
          type="button"
          onClick={() =>
            product.options ? openProduct(product) : add(product, 1)
          }
          aria-label={`Adicionar ${product.name} à sacola`}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-85"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}
