"use client";
import { Minus, Plus, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { useShop } from "@/lib/shop-context";
import { formatMZN } from "@/lib/shop-data";

export function ProductModal() {
  const { activeProduct, closeProduct, add } = useShop();
  const [image, setImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState<string | undefined>(undefined);
  const dragControls = useDragControls();

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

  return (
    <AnimatePresence>
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.button
            type="button"
            aria-label="Fechar detalhes"
            onClick={closeProduct}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) {
                closeProduct();
              }
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="relative flex max-h-[94dvh] w-full max-w-lg flex-col overflow-y-auto rounded-t-[2rem] bg-background sm:rounded-[2rem]"
          >
            <div className="relative bg-secondary">
              {/* Puxador para arrastar e fechar (só em ecrãs pequenos), sobreposto à imagem */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="absolute inset-x-0 top-0 z-10 flex touch-none cursor-grab justify-center pt-3 pb-6 active:cursor-grabbing sm:hidden"
              >
                <span className="h-1.5 w-10 rounded-full bg-background/85 shadow-sm backdrop-blur" aria-hidden />
              </div>

              <img
                src={activeProduct.images[image]}
                alt={activeProduct.name}
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
              {activeProduct.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {activeProduct.images.map((src, index) => (
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
              <p className="eyebrow">{activeProduct.category}</p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <h2 className="font-display text-2xl leading-tight">{activeProduct.name}</h2>
                <p className="font-display shrink-0 text-2xl">{formatMZN(activeProduct.price)}</p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < Math.round(activeProduct.rating) ? "fill-foreground text-foreground" : ""
                      }`}
                      aria-hidden
                    />
                  ))}
                </span>
                <span>
                  {activeProduct.rating.toFixed(1)} ({activeProduct.reviews} avaliações)
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {activeProduct.description}
              </p>

              <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
                {activeProduct.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="text-gold">—</span>
                    {detail}
                  </li>
                ))}
              </ul>

              {activeProduct.options && (
                <div className="mt-6">
                  <p className="eyebrow mb-3">{activeProduct.options.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.options.values.map((value) => (
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
                    add(activeProduct, quantity, variant);
                    closeProduct();
                  }}
                  className="h-13 flex-1 rounded-full bg-primary px-6 text-sm tracking-[0.06em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
                >
                  Adicionar à Sacola
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
