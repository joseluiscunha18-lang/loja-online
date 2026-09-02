"use client";

import Link from "next/link";
import { ArrowRight, Gem, MessageCircle, Truck } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryPills } from "@/components/site/CategoryPills";
import { ProductPage } from "@/components/shop-shell";
import { PRODUCTS, STORE, heroImage, editorial, formatMZN, type Category } from "@/lib/shop-data";
import { useShop } from "@/lib/shop-context";

/* ── Animação de entrada reutilizável ── */
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO EDITORIAL REVEAL
   Sequência:
   0 → fundo creme sólido + "Sinta a sua pele" centrada
   1 → crossfade para "Eleve o seu ritual."
   2 → frases saem, imagem + título + CTA entram
   ───────────────────────────────────────────────────────────── */
function HeroEditorialReveal() {
  // 0=frase 1, 1=frase 2, 2=revelação (imagem, título, CTA)
  const [phase, setPhase] = useState(0);
  const isRevealed = phase >= 2;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1100);
    const t2 = setTimeout(() => setPhase(2), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section ref={heroRef} className="mx-auto max-w-6xl px-4 pt-4">
      <div
        className="relative overflow-hidden rounded-[2rem]"
        style={{ background: "#e8ddd4", minHeight: "32rem" }}
      >
        {/* Imagem com parallax — só aparece na revelação */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "115%",
            backgroundPosition: "85% 20%",
            backgroundRepeat: "no-repeat",
            y: bgY,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Gradiente lateral */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(232,221,212,0.92) 0%, rgba(232,221,212,0.75) 38%, rgba(232,221,212,0.15) 65%, transparent 100%)",
          }}
        />

        {/* Frases de entrada — centradas, sobre o fundo sólido */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8 text-center">
          <AnimatePresence mode="wait">
            {!isRevealed && (
              <motion.p
                key={phase === 0 ? "phrase-0" : "phrase-1"}
                className="font-display text-2xl italic"
                style={{ color: "#7a6a5f" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {phase === 0 ? "Sinta a sua pele" : "Eleve o seu ritual."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Conteúdo — badge, título, CTA — stagger slide-in após revelação */}
        <motion.div
          className="relative z-10 flex flex-col justify-between gap-0 px-7 py-8 sm:px-12"
          style={{ minHeight: "32rem", y: contentY, opacity: scrollOpacity }}
        >
          {/* Badge — cai de cima (delay 0) */}
          <motion.div
            key={isRevealed ? "badge-in" : "badge-out"}
            initial={{ opacity: 0, y: -22 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -22 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0 }}
          >
            <span
              className="rounded-full px-3 py-1 text-[11px] tracking-widest uppercase"
              style={{ background: "rgba(0,0,0,0.08)", color: "#4a3f38" }}
            >
              Nova Coleção
            </span>
          </motion.div>

          {/* Título — stagger entre "Descubra", "Autocuidado" e "& Beleza" */}
          <div className="flex flex-col gap-3" style={{ maxWidth: "58%" }}>

            {/* "Descubra" — vem da esquerda (delay 0.12) */}
            <motion.p
              className="font-display text-base italic"
              style={{ color: "#7a6a5f" }}
              key={isRevealed ? "descubra-in" : "descubra-out"}
              initial={{ opacity: 0, x: -28 }}
              animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            >
              Descubra
            </motion.p>

            {/* "Autocuidado" — sobe de baixo (delay 0.22) */}
            <motion.h1
              className="font-display leading-[0.88]"
              style={{ fontSize: "2.2rem", color: "#1a1410" }}
              key={isRevealed ? "h1-in" : "h1-out"}
              initial={{ opacity: 0, y: 36 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            >
              Autocuidado
              <br />
              {/* "& Beleza" — fade-in ligeiramente depois (delay 0.38) */}
              <motion.span
                style={{ color: "#7a6a5f" }}
                key={isRevealed ? "beleza-in" : "beleza-out"}
                initial={{ opacity: 0, y: 20 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
              >
                &amp; Beleza
              </motion.span>
            </motion.h1>
          </div>

          {/* CTA — sobe de baixo por último (delay 0.52) */}
          <motion.div
            className="flex flex-col gap-3"
            style={{ maxWidth: "52%" }}
            key={isRevealed ? "cta-in" : "cta-out"}
            initial={{ opacity: 0, y: 28 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
          >
            <p className="text-xs leading-relaxed" style={{ color: "#6b5c52" }}>
              Cosmética e peças modernas escolhidas a pensar em si.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/produtos"
                className="inline-flex items-center justify-between gap-2.5 rounded-full px-4 py-2 text-xs font-medium tracking-[0.06em] uppercase whitespace-nowrap"
                style={{ background: "#1a1410", color: "#f5ede6" }}
              >
                Explorar Coleção
                <motion.span
                  className="flex items-center justify-center rounded-full"
                  style={{ background: "#f5ede6", width: 18, height: 18 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="size-2.5" style={{ color: "#1a1410" }} aria-hidden />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
      {/* ── HERO EDITORIAL REVEAL ── */}
      <HeroEditorialReveal />

      {/* ── CATEGORIAS ── */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <FadeUp className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">Categorias</h2>
          <Link href="/produtos" className="text-sm text-muted-foreground hover:text-foreground">
            Ver tudo
          </Link>
        </FadeUp>

        <FadeUp delay={0.1}>
          <CategoryPills active={category} onChange={setCategory} />
        </FadeUp>

        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((product, i) => (
            <FadeUp key={product.id} delay={i * 0.07}>
              <ProductCard product={product} />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1} className="mt-10 flex justify-center">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={`/produtos?categoria=${category}`}
              className="block rounded-full border border-border px-8 py-3.5 text-sm tracking-[0.06em] uppercase transition-colors hover:bg-secondary"
            >
              Ver toda a coleção
            </Link>
          </motion.div>
        </FadeUp>
      </section>

      {/* ── MAIS VENDIDOS ── */}
      <section className="mt-16">
        <FadeUp className="mx-auto mb-5 flex max-w-6xl items-end justify-between gap-4 px-4">
          <h2 className="font-display text-3xl">Mais Vendidos</h2>
          <span className="eyebrow">Seleção Bliss</span>
        </FadeUp>

        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-2">
          {bestSellers.map((product, i) => (
            <motion.button
              key={product.id}
              type="button"
              onClick={() => openProduct(product)}
              className="w-44 shrink-0 text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
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
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL ── */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <FadeUp>
          <div className="overflow-hidden rounded-[2rem] bg-secondary/70">
            <motion.img
              src={editorial}
              alt="Rituais de beleza: frascos de skincare sobre mármore bege"
              loading="lazy"
              width={1280}
              height={800}
              className="h-64 w-full object-cover sm:h-80"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
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
        </FadeUp>
      </section>

      {/* ── CONFIANÇA ── */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Gem, title: "Produtos originais", text: "Marcas verificadas e fórmulas seguras." },
            { icon: Truck, title: "Entrega rápida", text: STORE.logistics },
            { icon: MessageCircle, title: "Atendimento humano", text: `Fale connosco por WhatsApp: ${STORE.phoneDisplay}` },
          ].map(({ icon: Icon, title, text }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <motion.li
                className="rounded-3xl bg-card p-6 shadow-card"
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="size-5" aria-hidden />
                <p className="font-display mt-4 text-xl">{title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              </motion.li>
            </FadeUp>
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
