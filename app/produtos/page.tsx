"use client";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryPills } from "@/components/site/CategoryPills";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/shop-data";
import { Suspense, useEffect, useMemo, useTransition, useState } from "react";
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

  // Sincroniza com a URL sempre que o par\u00e2metro "categoria" mudar
  useEffect(() => {
    startTransition(() => {
      setCategory(isCategory(categoriaParam) ? categoriaParam : "Tudo");
    });
  }, [categoriaParam]);

  const handleCategoryChange = (next: Category) => {
    startTransition(() => setCategory(next));
  };

  const products = useMemo(
    () => (category === "Tudo" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">A cole\u00e7\u00e3o Bliss</p>
      <h1 className="font-display mt-3 text-5xl">Todos os produtos</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Beleza, acess\u00f3rios e moda escolhidos para si.
      </p>
      <div className="mt-8">
        <CategoryPills active={category} onChange={handleCategoryChange} />
      </div>
      <div
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
        style={{ opacity: isPending ? 0.6 : 1, transition: "opacity 0.15s ease" }}
      >
        {products.length === 0 ? (
          <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
            N\u00e3o h\u00e1 produtos nesta categoria no momento.
          </p>
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
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
