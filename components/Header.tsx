"use client";

import { useCart } from "@/context/cart-context";
import { IconBag, IconMenu, IconSearch, Logo } from "./icons";

interface HeaderProps {
  onMenuOpen: () => void;
  onSearchOpen: () => void;
  onCartOpen: () => void;
}

export function Header({ onMenuOpen, onSearchOpen, onCartOpen }: HeaderProps) {
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuOpen}
            aria-label="Abrir menu"
            className="rounded-xl p-2 -ml-2 text-ink transition hover:bg-bone-dim md:hidden"
          >
            <IconMenu size={22} strokeWidth={1.8} />
          </button>
          <Logo className="hidden h-8 w-8 text-emerald md:block" />
          <h1 className="font-display text-xl font-semibold tracking-wide text-ink md:text-2xl">
            Bliss Beauty &amp; Care
          </h1>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {["Skincare", "Maquilhagem", "Acessórios", "Moda"].map((label) => (
            <a
              key={label}
              href="#catalogo"
              className="text-sm font-medium text-ink-soft transition hover:text-emerald"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onSearchOpen}
            aria-label="Pesquisar"
            className="rounded-xl p-2 text-ink transition hover:bg-bone-dim"
          >
            <IconSearch size={20} strokeWidth={1.8} />
          </button>
          <button
            onClick={onCartOpen}
            aria-label="Abrir sacola"
            className="relative rounded-xl p-2 text-ink transition hover:bg-bone-dim"
          >
            <IconBag size={20} strokeWidth={1.8} />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-[10px] font-semibold text-bone">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
