"use client";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductCardSkeleton } from "@/components/site/ProductCardSkeleton";
import { CategoryPills } from "@/components/site/CategoryPills";
import { CATEGORIES, type Category } from "@/lib/shop-data";
import { useShuffledProducts } from "@/lib/use-shuffle-seed";
import { useInfiniteReveal } from "@/lib/use-infinite-reveal";
import { Suspense, useEffect, useTransition, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

function isCategory(value: string | null): value is Category {
  return !!value && (CATEGORIES as readonly string[]).includes(value);
}

function ProdutosContent() {
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get("categoria");
  const [category, setCategory] = useState<Category>(
    isCategory(categoriaParam) ? categoriaParam : "Tudo",
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setCategory(isCategory(categoriaParam) ? categoriaParam : "Tudo");
    });
  }, [categoriaParam]);

  const handleCategoryChange = (next: Category) => {
    startTransition(() => setCategory(next));
  };

  const [navCnt, setNavCnt] = useState(0);

  function handleCategoryChangeWithShuffle(next: Category) {
    setNavCnt((n) => n + 1);
    handleCategoryChange(next);
  }

  // Produtos embaralhados — muda a cada minuto e a cada mudança de categoria.
  const products = useShuffledProducts(category, navCnt);

  const { visibleItems, isLoadingMore, sentinelRef, skeletonCount } = useInfiniteReveal(
    products,
    category + "-" + navCnt,
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">A coleção Bliss</p>
      <h1 className="font-display mt-3 text-5xl">Todos os nossos produtos</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Beleza, acessórios e moda escolhidos para si.
      </p>
      <div className="mt-8">
        <CategoryPills active={category} onChange={handleCategoryChangeWithShuffle} />
      </div>

      <motion.div
        key={category + "-" + navCnt}
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {visibleItems.length === 0 ? (
          <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
            Não há produtos nesta categoria no momento.
          </p>
        ) : (
          visibleItems.map((p) => <ProductCard key={p.id} product={p} />)
        )}

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

export default function Produtos() {
  return (
    <Suspense fallback={null}>
      <ProdutosContent />
    </Suspense>
  );
}
