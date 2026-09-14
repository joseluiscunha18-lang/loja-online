import { ProductCardSkeleton } from "@/components/site/ProductCardSkeleton";

const PLACEHOLDER_PILL_WIDTHS = ["w-16", "w-20", "w-24", "w-20", "w-16", "w-24"];

export default function LoadingProdutos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">A coleção Bliss</p>
      <h1 className="font-display mt-3 text-5xl">Todas nossas coleções</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Beleza, acessórios e moda escolhidos para si.
      </p>

      <div className="mt-8 flex gap-2.5 overflow-hidden">
        {PLACEHOLDER_PILL_WIDTHS.map((w, i) => (
          <div
            key={i}
            className={`h-9 shrink-0 animate-pulse rounded-full bg-secondary ${w}`}
            aria-hidden
          />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
