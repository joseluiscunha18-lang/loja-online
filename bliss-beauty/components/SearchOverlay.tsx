"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatMZN } from "@/lib/format";
import { IconClose, IconSearch } from "./icons";

interface SearchOverlayProps {
  products: Product[];
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export function SearchOverlay({
  products,
  searchTerm,
  onSearchTermChange,
  onClose,
  onSelect,
}: SearchOverlayProps) {
  const results = products.filter(
    (p) => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-bone">
      <div className="mx-auto max-w-2xl p-4">
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <IconSearch
              size={18}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/60"
            />
            <input
              autoFocus
              type="text"
              placeholder="Buscar produtos..."
              className="w-full rounded-2xl border border-line bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-ink"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar pesquisa"
            className="rounded-xl p-2 text-ink-soft transition hover:bg-bone-dim"
          >
            <IconClose size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {results.map((p) => (
            <div
              key={p.id}
              className="cursor-pointer overflow-hidden rounded-2xl border border-line bg-white shadow-card"
              onClick={() => onSelect(p)}
            >
              <div className="relative aspect-square overflow-hidden bg-bone-dim">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h4 className="truncate text-sm font-medium text-ink">{p.name}</h4>
                <p className="mt-1 font-mono text-sm font-semibold text-ink">
                  MZN {formatMZN(p.price)}
                </p>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-ink-soft">
              Nenhum resultado para &ldquo;{searchTerm}&rdquo;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
