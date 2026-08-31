"use client";
import Link from "next/link";
import { Menu, Search, ShoppingBag, Truck } from "lucide-react";
import { useShop } from "@/lib/shop-context";
import { STORE } from "@/lib/shop-data";

export function Header() {
  const { count, setCartOpen, setMenuOpen, setSearchOpen } = useShop();

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase">
          <Truck className="size-3.5 shrink-0" aria-hidden />
          <span className="text-center">{STORE.delivery}</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <Menu className="size-5" aria-hidden />
          </button>

          <Link href="/" className="flex-1 text-center">
            <span className="font-display block text-[1.35rem] leading-none tracking-tight sm:text-2xl">
              Bliss <span className="italic">Beauty</span> &amp; Care
            </span>
            <span className="eyebrow mt-1 block text-[0.55rem]">Maputo · Matola</span>
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Pesquisar produtos"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <Search className="size-5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir sacola, ${count} itens`}
            className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="size-5" aria-hidden />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-primary text-[0.65rem] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
