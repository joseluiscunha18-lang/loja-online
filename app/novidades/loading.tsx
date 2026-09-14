import { ProductCardSkeleton } from "@/components/site/ProductCardSkeleton";

export default function LoadingNovidades() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Recém chegados</p>
      <h1 className="font-display mt-3 text-5xl">Novidades</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Os produtos mais recentes da Bliss — escolhidos e adicionados à loja com cuidado.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
