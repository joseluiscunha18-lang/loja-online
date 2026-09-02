"use client";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryPills } from "@/components/site/CategoryPills";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/shop-data";
import { Suspense, useEffect, useState } from "react";
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

  // Sincroniza com a URL sempre que o parâmetro "categoria" mudar
  // (ex: clicar noutra categoria no menu lateral enquanto já se
  // está em /produtos não recria o componente, por isso o estado
  // tem de ser atualizado explicitamente aqui).
  useEffect(() => {
    setCategory(isCategory(categoriaParam) ? categoriaParam : "Tudo");
  }, [categoriaParam]);
  const products = category === "Tudo" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">A coleção Bliss</p>
      <h1 className="font-display mt-3 text-5xl">Todos os produtos</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Beleza, acessórios e moda escolhidos para si.
      </p>
      <div className="mt-8">
        <CategoryPills active={category} onChange={setCategory} />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
            Não há produtos nesta categoria no momento.
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
