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
import LoadingProdutos from "./loading";

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

  // Produtos embaralhados — muda apenas quando o utilizador troca de categoria.
  const products = useShuffledProducts(category, navCnt);

  const { visibleItems, isInitialLoading, isLoadingMore, sentinelRef, initialSkeletonCount, skeletonCount } =
    useInfiniteReveal(products, category + "-" + navCnt);

  const isAllProducts = category === "Tudo";
  const pageTitle = isAllProducts ? "Todas nossas coleções" : category;
  const pageSubtitle = isAllProducts
    ? "Beleza, acessórios e moda escolhidos para si."
    : `Os melhores produtos da categoria ${category}.`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">A coleção Bliss</p>
      <h1 className="font-display mt-3 text-5xl">{pageTitle}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{pageSubtitle}</p>
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
        {isInitialLoading ? (
          Array.from({ length: initialSkeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={`initial-skeleton-${i}`} />
          ))
        ) : visibleItems.length === 0 ? (
          <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
            Não há produtos nesta categoria no momento.
          </p>
        ) : (
          visibleItems.map((p) => <ProductCard key={p.id} product={p} />)
        )}

        {!isInitialLoading &&
          isLoadingMore &&
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
    <Suspense fallback={<LoadingProdutos />}>
      <ProdutosContent />
    </Suspense>
  );
}
