"use client";
import { useState, useEffect } from "react";
import { PRODUCTS, type Product, type Category } from "./shop-data";

function getTimeSeed(): number {
  const now = new Date();
  return (
    now.getFullYear() * 100000000 +
    (now.getMonth() + 1) * 1000000 +
    now.getDate() * 10000 +
    now.getHours() * 100 +
    now.getMinutes()
  );
}

/** Fisher-Yates com seed — embaralha qualquer lista de forma determinística */
function shuffleWithSeed<T>(items: T[], seed: number): T[] {
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
 * - Seed muda a cada minuto e a cada mudança de categoria (navCnt)
 */
export function useShuffledProducts(category: Category, navCnt: number): Product[] {
  const [timeSeed, setTimeSeed] = useState(getTimeSeed);

  useEffect(() => {
    const msUntilNextMinute = () => {
      const now = new Date();
      return (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    };
    const timeout = setTimeout(() => {
      setTimeSeed(getTimeSeed());
      const interval = setInterval(() => setTimeSeed(getTimeSeed()), 60_000);
      return () => clearInterval(interval);
    }, msUntilNextMinute());
    return () => clearTimeout(timeout);
  }, []);

  // Filtra primeiro
  const subset = category === "Tudo" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  // Seed único por categoria + tempo + navegação
  const categorySeed = category.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const seed = timeSeed ^ (categorySeed * 2654435761) ^ (navCnt * 2246822519);

  // Embaralha o subconjunto já filtrado
  return shuffleWithSeed(subset, seed);
}
