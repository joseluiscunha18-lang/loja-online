"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { DeliveryBanner } from "@/components/DeliveryBanner";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { MobileMenu } from "@/components/MobileMenu";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { useCart } from "@/context/cart-context";
import { categories, products } from "@/lib/products";
import type { CategoryKey, Product } from "@/lib/types";

export default function HomePage() {
  const { addItem } = useCart();

  const [currentCategory, setCurrentCategory] = useState<CategoryKey | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const catMatch = currentCategory === "all" || p.category === currentCategory;
    const searchMatch =
      !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return catMatch && searchMatch;
  });

  useEffect(() => {
    const locked = menuOpen || cartOpen || Boolean(modalProduct) || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen, modalProduct, searchOpen]);

  function scrollToCatalog() {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Header
        onMenuOpen={() => setMenuOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
      />
      <DeliveryBanner />

      <main className="pb-16">
        <Hero />

        <section id="catalogo" className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink md:text-xl">
              Categorias
            </h3>
          </div>
          <CategoryFilter
            categories={categories}
            active={currentCategory}
            onChange={setCurrentCategory}
          />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-6 md:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink md:text-xl">
              Mais Vendidos
            </h3>
          </div>
          <ProductGrid
            products={filteredProducts}
            onOpen={setModalProduct}
            onQuickAdd={(p) => addItem(p, 1)}
          />
        </section>

        <ContactSection />
      </main>

      <Footer />

      {menuOpen && (
        <MobileMenu
          onClose={() => setMenuOpen(false)}
          onShopClick={() => {
            setMenuOpen(false);
            scrollToCatalog();
          }}
          onCartClick={() => {
            setMenuOpen(false);
            setCartOpen(true);
          }}
        />
      )}

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={(product, qty) => addItem(product, qty)}
        />
      )}

      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}

      {searchOpen && (
        <SearchOverlay
          products={products}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onClose={() => {
            setSearchOpen(false);
            setSearchTerm("");
          }}
          onSelect={(p) => {
            setSearchOpen(false);
            setSearchTerm("");
            setModalProduct(p);
          }}
        />
      )}

      <Toast />
    </>
  );
}
