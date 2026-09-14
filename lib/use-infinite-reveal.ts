"use client";
import { useEffect, useRef, useState } from "react";

const DEFAULT_PAGE_SIZE = 12;
const SIMULATED_LOAD_MS = 650;

/**
 * Simula paginação vinda de um servidor: mostra os primeiros `pageSize`
 * itens e, à medida que o utilizador aproxima o fim da lista, revela mais
 * um lote — com um pequeno atraso em que a grelha mostra esqueletos a
 * "pulsar", tal como aconteceria a carregar de uma API real.
 *
 * `resetKey` deve mudar sempre que a lista de base muda de forma
 * significativa (ex: troca de categoria), para reiniciar a paginação.
 */
export function useInfiniteReveal<T>(
  items: T[],
  resetKey: string | number,
  pageSize: number = DEFAULT_PAGE_SIZE,
) {
  const [visibleCount, setVisibleCount] = useState(Math.min(pageSize, items.length));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reinicia a paginação quando a lista de base muda (nova categoria, etc.)
  useEffect(() => {
    setVisibleCount(Math.min(pageSize, items.length));
    setIsLoadingMore(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, pageSize]);

  const totalCount = items.length;
  const hasMore = visibleCount < totalCount;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

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
  }, [hasMore, pageSize, totalCount]);

  return {
    visibleItems: items.slice(0, visibleCount),
    isLoadingMore,
    hasMore,
    sentinelRef,
    skeletonCount: Math.min(pageSize, totalCount - visibleCount),
  };
}
