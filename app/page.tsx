"use client";

import Link from "next/link";
import { ArrowRight, Gem, MessageCircle, Truck } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryPills } from "@/components/site/CategoryPills";
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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [ready, setReady] = useState(false);

  // Garante que o browser pinta o estado inicial (opacity 0) antes de
  // permitir a transição — sem isto, quando o elemento já está visível
  // no primeiro render, o React/Framer podem "saltar" direto para o
  // estado final sem mostrar a animação.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={ready && inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO EDITORIAL REVEAL
   Sequência:
   0 → fundo creme sólido + "A sua beleza merece mais." centrada
   1 → crossfade para "Descubra o cuidado que faz a diferença."
   2 → frases saem, imagem + título + CTA entram
   ───────────────────────────────────────────────────────────── */
function HeroEditorialReveal() {
  // Se já animou nesta sessão, começa directamente na fase revelada (2)
  const alreadySeen =
    typeof sessionStorage !== "undefined" && sessionStorage.getItem("hero-seen") === "1";

  // 0=frase 1, 1=frase 2, 2=revelação (imagem, título, CTA)
  const [phase, setPhase] = useState(alreadySeen ? 2 : 0);
  const isRevealed = phase >= 2;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pequena pausa depois da frase desaparecer, antes de a imagem/título
  // começarem a entrar — evita o "corte" abrupto entre as duas fases.
  const REVEAL_DELAY = 1.05;

  useEffect(() => {
    // Se já viu, não agenda os timers
    if (alreadySeen) return;
    const t1 = setTimeout(() => setPhase(1), 1600);
    const t2 = setTimeout(() => {
      setPhase(2);
      sessionStorage.setItem("hero-seen", "1");
    }, 4300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={heroRef} className="mx-auto max-w-6xl px-4 pt-4">
      <motion.div
        className="relative overflow-hidden rounded-[2rem]"
        style={{ background: "#e8ddd4", minHeight: "29rem" }}
        /* Quando já foi visto (volta ao início), entra suavemente com
           um leve fade + subida — evita o aparecimento brusco */
        initial={alreadySeen ? { opacity: 0, y: 10 } : false}
        animate={alreadySeen ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Imagem com parallax — só aparece na revelação */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "122%",
            backgroundPosition: "85% 32%",
            backgroundRepeat: "no-repeat",
            y: bgY,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: isRevealed ? REVEAL_DELAY : 0 }}
        />

        {/* Gradiente lateral */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(232,221,212,0.92) 0%, rgba(232,221,212,0.75) 38%, rgba(232,221,212,0.15) 65%, transparent 100%)",
          }}
        />

        {/* Frases de entrada — centradas, sobre o fundo sólido.
            pointer-events-none evita que este overlay (que ocupa o hero
            inteiro) continue a bloquear cliques no CTA por baixo depois
            de as frases desaparecerem. */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-8 text-center">
          <AnimatePresence mode="wait">
            {!isRevealed && (
              <motion.p
                key={phase === 0 ? "phrase-0" : "phrase-1"}
                className="font-display text-2xl tracking-wide italic sm:text-3xl"
                style={{ color: "#5c4d43", textShadow: "0 1px 24px rgba(255,255,255,0.35)" }}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: -18,
                  filter: "blur(4px)",
                  transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                {phase === 0 ? "A sua beleza merece mais." : "Descubra o cuidado que faz a diferença."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Conteúdo — badge, título, CTA — stagger suave igual às frases */}
        <motion.div
          className="relative z-10 flex flex-col justify-between gap-0 px-7 py-8 sm:px-12"
          style={{ minHeight: "29rem", y: contentY, opacity: scrollOpacity }}
        >
          {/* Badge — desce suavemente de cima (delay 0) */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: isRevealed ? REVEAL_DELAY : 0 }}
          >
            <span
              className="rounded-full px-3 py-1 text-[11px] tracking-widest uppercase"
              style={{ background: "rgba(0,0,0,0.08)", color: "#4a3f38" }}
            >
              Nova Coleção
            </span>
          </motion.div>

          {/* Título + CTA agrupados — grupo sobe (mb maior) para reduzir o vazio
              sob a etiqueta e evitar a massa condensada junto à borda inferior;
              gap-6 dá respiração entre o título e o subtítulo/botão */}
          <div className="mb-14 flex flex-col gap-6 sm:mb-16">
            {/* Título */}
            <div className="-ml-3 flex flex-col gap-3 sm:-ml-4" style={{ maxWidth: "48%" }}>

              {/* "Autocuidado" — sobe devagar de baixo (delay 0.2) */}
              <motion.h1
                className="font-display leading-[0.9]"
                style={{ fontSize: "2.3rem", color: "#1a1410", textShadow: "0 1px 20px rgba(245,237,230,0.4)" }}
                initial={{ opacity: 0, y: 28 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: REVEAL_DELAY + 0.2 }}
              >
                Autocuidado
                <br />
                {/* "& Beleza" — aparece por último, ainda mais devagar (delay 0.6) */}
                <motion.span
                  style={{ color: "#6b5c52" }}
                  initial={{ opacity: 0 }}
                  animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: REVEAL_DELAY + 0.45 }}
                >
                  &amp; Beleza
                </motion.span>
              </motion.h1>
            </div>

            {/* CTA — sobe suavemente por último (delay 0.78) */}
            <motion.div
              className="flex flex-col gap-3"
              style={{ maxWidth: "52%" }}
              initial={{ opacity: 0, y: 24 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: REVEAL_DELAY + 0.78 }}
            >
              <p className="text-[0.8rem] leading-relaxed font-medium" style={{ color: "#5c4d43" }}>
                Beleza selecionada com qualidade em cada detalhe.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/produtos"
                  className="inline-flex items-center justify-between gap-1.5 rounded-full px-2.5 py-2 text-xs font-medium tracking-[0.06em] uppercase whitespace-nowrap"
                  style={{ background: "#1a1410", color: "#f5ede6" }}
                >
                  Explorar Coleção
                  <motion.span
                    className="flex items-center justify-center"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="size-3.5" style={{ color: "#f5ede6" }} strokeWidth={1.75} aria-hidden />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function HomeContent() {
  const [category, setCategory] = useState<Category>("Tudo");
  const { openProduct } = useShop();

  const products = useMemo(() => {
    if (category !== "Tudo") {
      return PRODUCTS.filter((p) => p.category === category).sort((a, b) => b.reviews - a.reviews);
    }
    return PRODUCTS;
  }, [category]);
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <>
      {/* ── HERO EDITORIAL REVEAL — anima uma vez por sessão (reset só com F5) ── */}
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
            <FadeUp key={`${category}-${product.id}`} delay={i * 0.04}>
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
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                width={800}
                height={800}
                className="aspect-[4/5] w-full rounded-3xl bg-secondary object-cover will-change-transform"
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
            { icon: Gem, title: "Produtos selecionados com cuidado", text: "Trabalhamos com produtos de marcas reconhecidas, escolhidos pensando na qualidade e no cuidado diário." },
            { icon: Truck, title: "Entrega rápida", text: "Entregas em Maputo & Matola. Levantamento nas Torres Vermelhas ou na Primeira Rotunda da circular, nos dias úteis." },
            { icon: MessageCircle, title: "Atendimento humano", text: "Fale connosco diretamente pelo WhatsApp." },
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
  return <HomeContent />;
}

