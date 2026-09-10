"use client";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryPills } from "@/components/site/CategoryPills";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/shop-data";
import { useShuffledProducts } from "@/lib/use-shuffle-seed";
import { Suspense, useEffect, useMemo, useTransition, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setCategory(isCategory(categoriaParam) ? categoriaParam : "Tudo");
    });
  }, [categoriaParam]);

  const handleCategoryChange = (next: Category) => {
    startTransition(() => setCategory(next));
  };

  const [navCnt, setNavCnt] = useState(0);

  const originalHandleCategoryChange = handleCategoryChange;
  function handleCategoryChangeWithShuffle(next: Category) {
    setNavCnt((n) => n + 1);
    originalHandleCategoryChange(next);
  }

  // Produtos embaralhados — muda a cada minuto e a cada mudança de categoria.
  const products = useShuffledProducts(category, navCnt);

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
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {products.length === 0 ? (
            <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
              Não há produtos nesta categoria no momento.
            </p>
          ) : (
            products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.035, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
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
