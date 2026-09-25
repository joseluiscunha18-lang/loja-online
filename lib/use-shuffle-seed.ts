"use client";
import { useState } from "react";
import { PRODUCTS, type Product, type Category } from "./shop-data";

/** Fisher-Yates com seed — embaralha qualquer lista de forma determinística */
export function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    // LCG simples para gerar próximo número pseudo-aleatório
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Devolve produtos embaralhados:
 * - Filtra primeiro pela categoria
 * - Depois embaralha o subconjunto → ordem muda mesmo dentro de cada categoria
 * - O "seed" base é fixado uma única vez, quando a página é aberta
 *   (dá uma ordem diferente a cada visita), e só muda por ação real do
 *   utilizador — ao trocar de categoria (navCnt). NUNCA muda sozinho
 *   enquanto o utilizador está parado a ver a página.
 */
export function useShuffledProducts(category: Category, navCnt: number): Product[] {
  const [sessionSeed] = useState(() => Date.now());

  // Filtra primeiro
  const subset = category === "Tudo" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  // Seed único por categoria + sessão + navegação (sem componente de tempo real)
  const categorySeed = category.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const seed = sessionSeed ^ (categorySeed * 2654435761) ^ (navCnt * 2246822519);

  // Embaralha o subconjunto já filtrado
  return shuffleWithSeed(subset, seed);
}
