"use client";
import Link from "next/link";
import { MessageCircle, Mail, Phone, X } from "lucide-react";
import { useShop } from "@/lib/shop-context";
import { CATEGORIES, STORE } from "@/lib/shop-data";

const pages = [
  { to: "/", label: "Início" },
  { to: "/produtos", label: "Loja" },
  { to: "/sobre", label: "Sobre nós" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function MenuDrawer() {
  const { menuOpen, setMenuOpen } = useShop();

  return (
    <div
      className={`fixed inset-0 z-50 ${menuOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!menuOpen}
    >
      <button
        type="button"
        tabIndex={menuOpen ? 0 : -1}
        aria-label="Fechar menu"
        onClick={() => setMenuOpen(false)}
        className={`absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-background shadow-soft transition-all duration-300 ease-out ${
          menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="font-display text-xl">Menu</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="grid size-9 place-items-center rounded-full hover:bg-secondary"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {pages.map((page) => (
              <li key={page.to}>
                <Link
                  href={page.to}
                  onClick={() => setMenuOpen(false)}
                  className="font-display block py-2.5 text-2xl transition-colors hover:text-muted-foreground"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-8 mb-3">Categorias</p>
          <ul className="space-y-1.5">
            {CATEGORIES.filter((c) => c !== "Tudo").map((category) => (
              <li key={category}>
                <Link
                  href={`/produtos?categoria=${encodeURIComponent(category)}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-full bg-secondary px-4 py-2 text-sm transition-colors hover:bg-sand"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <a href={`tel:${STORE.whatsapp}`} className="flex items-center gap-2.5">
              <Phone className="size-4" aria-hidden /> {STORE.phoneDisplay}
            </a>
            <a href={`mailto:${STORE.email}`} className="flex items-center gap-2.5">
              <Mail className="size-4" aria-hidden /> {STORE.email}
            </a>
            <a
              href={`https://wa.me/${STORE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5"
            >
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5"
            >
              <MessageCircle className="size-4" aria-hidden /> {STORE.instagram}
            </a>
          </div>
        </nav>

        <p className="border-t border-border px-6 py-4 text-xs text-muted-foreground">
          {STORE.logistics}
        </p>
      </aside>
    </div>
  );
}
