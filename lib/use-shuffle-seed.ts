"use client";
import { useState, useEffect } from "react";
import { PRODUCTS, type Product } from "./shop-data";

/** Seed baseado no minuto actual — muda a cada minuto como se viesse de um backend. */
function getSeed(): number {
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

/** Devolve os produtos embaralhados. Actualiza automaticamente a cada minuto. */
export function useShuffledProducts(): Product[] {
  const [seed, setSeed] = useState(getSeed);

  useEffect(() => {
    // Calcula quantos milissegundos faltam para o próximo minuto
    const msUntilNextMinute = () => {
      const now = new Date();
      return (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    };

    // Aguarda o início do próximo minuto exacto, depois repete a cada 60s
    const timeout = setTimeout(() => {
      setSeed(getSeed());
      const interval = setInterval(() => setSeed(getSeed()), 60_000);
      return () => clearInterval(interval);
    }, msUntilNextMinute());

    return () => clearTimeout(timeout);
  }, []);

  return shuffleWithSeed(PRODUCTS, seed);
}
