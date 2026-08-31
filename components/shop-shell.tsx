"use client";

import { ReactNode } from "react";
import { ShopProvider } from "@/lib/shop-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { MenuDrawer } from "@/components/site/MenuDrawer";
import { SearchOverlay } from "@/components/site/SearchOverlay";
import { ProductModal } from "@/components/site/ProductModal";

export function ShopShell({ children }: { children: ReactNode }) {
  return (
    <ShopProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <MenuDrawer />
      <SearchOverlay />
      <ProductModal />
    </ShopProvider>
  );
}

export function ProductPage({ children }: { children: ReactNode }) {
  return <ShopShell>{children}</ShopShell>;
}
