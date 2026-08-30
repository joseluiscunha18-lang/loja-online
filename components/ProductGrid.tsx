import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onOpen: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export function ProductGrid({ products, onOpen, onQuickAdd }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white/60 py-16 text-center">
        <p className="font-sans text-sm text-ink-soft">
          Nenhum produto encontrado para esta seleção.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <div key={p.id} className="animate-reveal">
          <ProductCard product={p} onOpen={onOpen} onQuickAdd={onQuickAdd} />
        </div>
      ))}
    </div>
  );
}
