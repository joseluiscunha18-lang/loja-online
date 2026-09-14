"use client";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS } from "@/lib/shop-data";
import { AnimatePresence, motion } from "framer-motion";

// Últimos 16 produtos adicionados — os mais recentes primeiro
const novidades = [...PRODUCTS].slice(-16).reverse();

export default function Novidades() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Recém chegados</p>
      <h1 className="font-display mt-3 text-5xl">Novidades</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Os produtos mais recentes da Bliss — escolhidos e adicionados à loja com cuidado.
      </p>

      <AnimatePresence mode="sync">
        <motion.div
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          {novidades.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: i * 0.03 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
