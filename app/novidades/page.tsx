"use client";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductCardSkeleton } from "@/components/site/ProductCardSkeleton";
import { PRODUCTS } from "@/lib/shop-data";
import { useInfiniteReveal } from "@/lib/use-infinite-reveal";
import { motion } from "framer-motion";

// Últimos produtos adicionados — os mais recentes primeiro
const novidades = [...PRODUCTS].slice(-16).reverse();

export default function Novidades() {
  const { visibleItems, isLoadingMore, sentinelRef, skeletonCount } = useInfiniteReveal(
    novidades,
    "novidades",
    8,
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Recém chegados</p>
      <h1 className="font-display mt-3 text-5xl">Novidades</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Os produtos mais recentes da Bliss — escolhidos e adicionados à loja com cuidado.
      </p>

      <motion.div
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {visibleItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}

        {isLoadingMore &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={`skeleton-${i}`} />
          ))}
      </motion.div>

      {/* sentinela invisível: quando entra em vista, revela o próximo lote */}
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />
    </section>
  );
}
