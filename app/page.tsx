"use client";

import Link from "next/link";
import { ArrowRight, Gem, MessageCircle, Truck } from "lucide-react";
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryPills } from "@/components/site/CategoryPills";
import { ProductPage } from "@/components/shop-shell";
import { PRODUCTS, STORE, heroImage, editorial, formatMZN, type Category } from "@/lib/shop-data";
import { useShop } from "@/lib/shop-context";

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
        <div className="relative overflow-hidden rounded-[2rem]" style={{ background: "#e8ddd4" }}>

          {/* Imagem de fundo */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "115%",
              backgroundPosition: "85% 20%",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Gradiente suave só na esquerda para legibilidade */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, rgba(232,221,212,0.92) 0%, rgba(232,221,212,0.75) 38%, rgba(232,221,212,0.15) 65%, transparent 100%)",
            }}
          />

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col justify-between gap-0 px-7 py-8 sm:px-12" style={{ minHeight: "32rem" }}>

            {/* Topo: badge */}
            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-[11px] tracking-widest uppercase"
                style={{ background: "rgba(0,0,0,0.08)", color: "#4a3f38" }}
              >
                Nova Coleção
              </span>
            </div>

            {/* Meio: título */}
            <div className="flex flex-col gap-3" style={{ maxWidth: "52%" }}>
              <p className="font-display text-base italic" style={{ color: "#7a6a5f" }}>
                Descubra
              </p>
              <h1
                className="font-display leading-[0.88]"
                style={{ fontSize: "2.6rem", color: "#1a1410" }}
              >
                Auto
                <br />
                cuidado
                <br />
                <span style={{ color: "#7a6a5f" }}>&amp; Beleza</span>
              </h1>
            </div>

            {/* Baixo: CTA único elegante */}
            <div className="flex flex-col gap-3" style={{ maxWidth: "52%" }}>
              <p className="text-xs leading-relaxed" style={{ color: "#6b5c52" }}>
                Cosmética e peças modernas escolhidas a pensar em si.
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
                style={{ background: "#1a1410", color: "#f5ede6" }}
              >
                Explorar
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{ background: "#f5ede6", width: 28, height: 28 }}
                >
                  <ArrowRight className="size-3.5" style={{ color: "#1a1410" }} aria-hidden />
                </span>
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
            { icon: Gem, title: "Produtos originais", text: "Marcas verificadas e fórmulas seguras." },
            { icon: Truck, title: "Entrega rápida", text: STORE.logistics },
            { icon: MessageCircle, title: "Atendimento humano", text: `Fale connosco por WhatsApp: ${STORE.phoneDisplay}` },
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
