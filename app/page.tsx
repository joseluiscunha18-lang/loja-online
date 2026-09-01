"use client";

import Link from "next/link";
import { ArrowRight, Gem, MessageCircle, Truck } from "lucide-react";
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryPills } from "@/components/site/CategoryPills";
import { ProductPage } from "@/components/shop-shell";
import { PRODUCTS, STORE, heroImage, editorial, formatMZN, type Category } from "@/lib/shop-data";
import { useShop } from "@/lib/shop-context";

// Inner component — rendered *inside* ShopProvider (via ProductPage)
function HomeContent() {
  const [category, setCategory] = useState<Category>("Tudo");
  const { openProduct } = useShop();

  const products = useMemo(
    () => (category === "Tudo" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category],
  );
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-sand">
          <img
            src={heroImage}
            alt="Modelo com pele luminosa a segurar um sérum da Bliss Beauty & Care"
            width={1024}
            height={1280}
            className="h-[40rem] sm:h-[44rem]"
            style={{ objectPosition: "right top", objectFit: "cover", width: "112%", transform: "translateX(20%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-5 p-7 sm:p-12">
            <p className="font-display text-lg italic">Descubra</p>
            <h1 className="font-display max-w-[9em] text-[3.1rem] leading-[0.92] sm:text-6xl">
              Autocuidado
              <br />
              &amp; Beleza
            </h1>
            <p className="max-w-[16rem] text-sm text-muted-foreground">
              Peças modernas e cosmética de confiança para cada momento do seu dia.
            </p>
            <div className="flex flex-col items-start gap-3">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm tracking-[0.06em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
              >
                Explorar Coleção
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/produtos?categoria=Skincare"
                className="rounded-full border border-border bg-background/80 px-6 py-3 text-sm backdrop-blur transition-colors hover:bg-secondary"
              >
                Novidades
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias + grelha */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">Categorias</h2>
          <Link href="/produtos" className="text-sm text-muted-foreground hover:text-foreground">
            Ver tudo
          </Link>
        </div>
        <CategoryPills active={category} onChange={setCategory} />

        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          href={`/produtos?categoria=${category}`}
          className="mx-auto mt-10 block w-fit rounded-full border border-border px-8 py-3.5 text-sm tracking-[0.06em] uppercase transition-colors hover:bg-secondary"
        >
          Ver toda a coleção
        </Link>
      </section>

      {/* Mais vendidos */}
      <section className="mt-16">
        <div className="mx-auto mb-5 flex max-w-6xl items-end justify-between gap-4 px-4">
          <h2 className="font-display text-3xl">Mais Vendidos</h2>
          <span className="eyebrow">Seleção Bliss</span>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-2">
          {bestSellers.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => openProduct(product)}
              className="w-44 shrink-0 text-left"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                width={800}
                height={800}
                className="aspect-[4/5] w-full rounded-3xl bg-secondary object-cover"
              />
              <p className="mt-3 truncate text-sm font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">{formatMZN(product.price)}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="overflow-hidden rounded-[2rem] bg-secondary/70">
          <img
            src={editorial}
            alt="Rituais de beleza: frascos de skincare sobre mármore bege"
            loading="lazy"
            width={1280}
            height={800}
            className="h-64 w-full object-cover sm:h-80"
          />
          <div className="p-7 sm:p-10">
            <p className="eyebrow">O ritual Bliss</p>
            <h2 className="font-display mt-3 max-w-md text-3xl leading-tight sm:text-4xl">
              Produtos originais, escolhidos um a um.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Trabalhamos apenas com fórmulas e peças que usamos e recomendamos. Cada encomenda é
              conferida à mão antes de sair para entrega em Maputo ou Matola.
            </p>
            <Link
              href="/sobre"
              className="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.06em] uppercase underline-offset-4 hover:underline"
            >
              A nossa história <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Confiança */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Gem,
              title: "Produtos originais",
              text: "Marcas verificadas e fórmulas seguras.",
            },
            {
              icon: Truck,
              title: "Entrega rápida",
              text: STORE.logistics,
            },
            {
              icon: MessageCircle,
              title: "Atendimento humano",
              text: `Fale connosco por WhatsApp: ${STORE.phoneDisplay}`,
            },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-3xl bg-card p-6 shadow-card">
              <Icon className="size-5" aria-hidden />
              <p className="font-display mt-4 text-xl">{title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <ProductPage>
      <HomeContent />
    </ProductPage>
  );
}
