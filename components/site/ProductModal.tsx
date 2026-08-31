"use client";
import { Minus, Plus, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/lib/shop-context";
import { formatMZN } from "@/lib/shop-data";

export function ProductModal() {
  const { activeProduct, closeProduct, add } = useShop();
  const [image, setImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!activeProduct) return;
    setImage(0);
    setQuantity(1);
    setVariant(activeProduct.options?.values[0]);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProduct]);

  if (!activeProduct) return null;
  const product = activeProduct;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar detalhes"
        onClick={closeProduct}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <div className="animate-in slide-in-from-bottom relative flex max-h-[94dvh] w-full max-w-lg flex-col overflow-y-auto rounded-t-[2rem] bg-background duration-300 sm:rounded-[2rem]">
        <div className="relative bg-secondary">
          <img
            src={product.images[image]}
            alt={product.name}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />
          <button
            type="button"
            onClick={closeProduct}
            aria-label="Fechar detalhes"
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-background/85 backdrop-blur"
          >
            <X className="size-5" aria-hidden />
          </button>
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setImage(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                  className={`size-2 rounded-full transition-all ${
                    index === image ? "w-5 bg-primary" : "bg-background/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-6 pt-6 pb-8">
          <p className="eyebrow">{product.category}</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl leading-tight">{product.name}</h2>
            <p className="font-display shrink-0 text-2xl">{formatMZN(product.price)}</p>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={`size-4 ${
                    i < Math.round(product.rating) ? "fill-foreground text-foreground" : ""
                  }`}
                  aria-hidden
                />
              ))}
            </span>
            <span>
              {product.rating.toFixed(1)} ({product.reviews} avaliações)
            </span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
            {product.details.map((detail) => (
              <li key={detail} className="flex gap-2">
                <span className="text-gold">—</span>
                {detail}
              </li>
            ))}
          </ul>

          {product.options && (
            <div className="mt-6">
              <p className="eyebrow mb-3">{product.options.label}</p>
              <div className="flex flex-wrap gap-2">
                {product.options.values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setVariant(value)}
                    className={`min-w-12 rounded-full px-4 py-2 text-sm transition-colors ${
                      variant === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-sand"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full bg-secondary p-1.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="grid size-9 place-items-center rounded-full bg-background"
              >
                <Minus className="size-4" aria-hidden />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="grid size-9 place-items-center rounded-full bg-background"
              >
                <Plus className="size-4" aria-hidden />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                add(product, quantity, variant);
                closeProduct();
              }}
              className="h-13 flex-1 rounded-full bg-primary px-6 text-sm tracking-[0.06em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
            >
              Adicionar à Sacola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
