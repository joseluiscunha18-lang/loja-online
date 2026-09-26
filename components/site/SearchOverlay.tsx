"use client";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useShop } from "@/lib/shop-context";
import { formatMZN, PRODUCTS, type Product } from "@/lib/shop-data";

/** Baixa a caixa e remove acentos, para "acai" encontrar "Açaí", "intimo" encontrar "Íntimo", etc. */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Distância de edição simples entre duas palavras — só usada no modo aproximado. */
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

type Mode = "exact" | "approximate" | "none";

function haystackParts(product: Product) {
  return {
    name: normalize(product.name),
    category: normalize(product.category),
    description: normalize(product.description ?? ""),
    details: normalize((product.details ?? []).join(" ")),
  };
}

/** Pesquisa por relevância: nome > categoria > descrição/detalhes.
 *  Frase inteira vale mais que palavras soltas, para não misturar termos sem relação. */
function scoreExact(query: string, tokens: string[], product: Product): number {
  const { name, category, description, details } = haystackParts(product);
  let score = 0;

  if (name.includes(query)) score += 100;
  if (category.includes(query)) score += 50;
  if (description.includes(query)) score += 30;
  if (details.includes(query)) score += 20;

  for (const token of tokens) {
    if (token.length < 2) continue;
    if (name.includes(token)) score += 20;
    if (category.includes(token)) score += 10;
    if (description.includes(token)) score += 6;
    if (details.includes(token)) score += 4;
  }

  return score;
}

/** Fallback para termos parecidos (erro de digitação, singular/plural, sinónimo próximo). */
function scoreApproximate(tokens: string[], product: Product): number {
  const { name, category, description } = haystackParts(product);
  const words = `${name} ${category} ${description}`.split(/\s+/).filter((w) => w.length > 2);

  let bestDistance = Infinity;
  for (const token of tokens) {
    if (token.length < 3) continue;
    const threshold = token.length <= 4 ? 1 : token.length <= 7 ? 2 : 3;
    for (const word of words) {
      const dist = levenshtein(token, word);
      if (dist <= threshold && dist < bestDistance) bestDistance = dist;
    }
  }
  return bestDistance === Infinity ? -1 : 1000 - bestDistance;
}

function searchProducts(rawQuery: string): { mode: Mode; products: Product[] } {
  const query = normalize(rawQuery);
  if (!query) return { mode: "none", products: [] };
  const tokens = query.split(/\s+/).filter(Boolean);

  const exact = PRODUCTS.map((product) => ({ product, score: scoreExact(query, tokens, product) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (exact.length > 0) {
    return { mode: "exact", products: exact.map((r) => r.product) };
  }

  const approximate = PRODUCTS.map((product) => ({ product, score: scoreApproximate(tokens, product) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (approximate.length > 0) {
    return { mode: "approximate", products: approximate.map((r) => r.product) };
  }

  return { mode: "none", products: [] };
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, openProduct } = useShop();
  const [query, setQuery] = useState("");

  const { mode, results } = useMemo(() => {
    const q = query.trim();
    if (!q) return { mode: "none" as Mode, results: PRODUCTS.slice(0, 6) };
    const { mode, products } = searchProducts(q);
    return { mode, results: products.slice(0, 12) };
  }, [query]);

  // Quando não há mesmo nenhum resultado (nem aproximado), sugerimos alguns produtos
  // em vez de deixar a pesquisa vazia.
  const suggestions = useMemo(() => PRODUCTS.slice(0, 6), []);

  if (!searchOpen) return null;

  const trimmed = query.trim();

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
              placeholder="Procurar por nome, categoria ou ingrediente…"
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
          {!trimmed
            ? "Sugestões"
            : mode === "exact"
              ? `${results.length} resultado(s)`
              : mode === "approximate"
                ? "Talvez seja isto"
                : "Sem resultados exatos"}
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

          {trimmed && mode === "none" && (
            <>
              <li className="py-8 text-center text-sm text-muted-foreground">
                Não encontrámos nada para &ldquo;{trimmed}&rdquo;. Tente outra palavra ou explore
                estas sugestões:
              </li>
              {suggestions.map((product) => (
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
