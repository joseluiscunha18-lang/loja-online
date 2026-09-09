"use client";
import { useState, useEffect } from "react";
import { PRODUCTS, type Product, type Category } from "./shop-data";

/** Seed baseado no minuto actual. */
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

function shuffleWithSeed(items: Product[], seed: number): Product[] {
  const seededRand = (n: number) => {
    let s = (seed * 9301 + 49297 + n * 233) % 233280;
    return s / 233280;
  };
  return [...items]
    .map((p, i) => ({ p, sort: seededRand(i) }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ p }) => p);
}

/**
 * Devolve produtos embaralhados de forma reactiva:
 * - Muda a cada minuto (timer sincronizado com o relógio)
 * - Muda sempre que a categoria muda (navCnt incrementado pelo componente)
 * - Muda quando se volta para "Tudo"
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

  // Seed combinado: tempo + categoria + contador de navegação
  const categorySeed = category.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const seed = timeSeed + categorySeed * 777 + navCnt * 999983;

  const all = shuffleWithSeed(PRODUCTS, seed);
  if (category === "Tudo") return all;
  return all.filter((p) => p.category === category);
}
