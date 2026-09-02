"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShopProvider } from "@/lib/shop-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { MenuDrawer } from "@/components/site/MenuDrawer";
import { SearchOverlay } from "@/components/site/SearchOverlay";
import { ProductModal } from "@/components/site/ProductModal";

/* Transição suave entre páginas (ex: Início → Produtos) — evita o
   corte abrupto ao navegar através de links como "Ver tudo" ou
   "Explorar Coleção". */
function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function ShopShell({ children }: { children: ReactNode }) {
  return (
    <ShopProvider>
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CartDrawer />
      <MenuDrawer />
      <SearchOverlay />
      <ProductModal />
    </ShopProvider>
  );
}
