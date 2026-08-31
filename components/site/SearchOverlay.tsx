"use client";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useShop } from "@/lib/shop-context";
import { formatMZN, PRODUCTS } from "@/lib/shop-data";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, openProduct } = useShop();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 6);
    return PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q),
    );
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="mx-auto flex h-full max-w-2xl flex-col px-4">
        <div className="flex items-center gap-3 py-4">
          <div className="flex flex-1 items-center gap-3 rounded-full bg-secondary px-5 py-3.5">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Procurar sérum, bolsa, blazer…"
              aria-label="Procurar produtos"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Fechar pesquisa"
            className="grid size-10 place-items-center rounded-full hover:bg-secondary"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <p className="eyebrow py-2">
          {query.trim() ? `${results.length} resultado(s)` : "Sugestões"}
        </p>

        <ul className="flex-1 divide-y divide-border overflow-y-auto pb-8">
          {results.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  openProduct(product);
                }}
                className="flex w-full items-center gap-4 py-3 text-left"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="size-16 rounded-2xl object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{product.name}</span>
                  <span className="block text-xs text-muted-foreground">{product.category}</span>
                </span>
                <span className="text-sm">{formatMZN(product.price)}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="py-10 text-center text-sm text-muted-foreground">
              Sem resultados. Tente outra palavra.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
