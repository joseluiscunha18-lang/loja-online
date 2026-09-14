"use client";
import { useEffect, useRef, useState } from "react";

const DEFAULT_PAGE_SIZE = 12;
const INITIAL_LOAD_MS = 1500;
const SIMULATED_LOAD_MS = 650;

/**
 * Simula paginação vinda de um servidor:
 * - Ao entrar na página (ou trocar de categoria), mostra esqueletos a
 *   "pulsar" durante ~1.5s, como se os produtos estivessem a ser
 *   pedidos a uma API, antes de os revelar.
 * - Depois, à medida que o utilizador aproxima o fim da lista, revela
 *   mais um lote — de novo com um pequeno esqueleto de transição.
 *
 * `resetKey` deve mudar sempre que a lista de base muda de forma
 * significativa (ex: troca de categoria), para reiniciar a simulação.
 */
export function useInfiniteReveal<T>(
  items: T[],
  resetKey: string | number,
  pageSize: number = DEFAULT_PAGE_SIZE,
) {
  const [visibleCount, setVisibleCount] = useState(Math.min(pageSize, items.length));
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Sempre que a lista de base muda (nova categoria, etc.), reinicia a
  // simulação: mostra esqueletos por INITIAL_LOAD_MS antes de revelar.
  useEffect(() => {
    setVisibleCount(Math.min(pageSize, items.length));
    setIsLoadingMore(false);
    setIsInitialLoading(true);

    const timeout = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, INITIAL_LOAD_MS);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, pageSize]);

  const totalCount = items.length;
  const hasMore = visibleCount < totalCount;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore || isInitialLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setIsLoadingMore((loading) => {
          if (loading) return loading;
          window.setTimeout(() => {
            setVisibleCount((v) => Math.min(v + pageSize, totalCount));
            setIsLoadingMore(false);
          }, SIMULATED_LOAD_MS);
          return true;
        });
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isInitialLoading, pageSize, totalCount]);

  return {
    visibleItems: isInitialLoading ? [] : items.slice(0, visibleCount),
    isInitialLoading,
    isLoadingMore,
    hasMore,
    sentinelRef,
    initialSkeletonCount: Math.min(pageSize, totalCount),
    skeletonCount: Math.min(pageSize, totalCount - visibleCount),
  };
}
