import Link from "next/link";
import type { Metadata } from "next";
import { heroImage, editorial } from "@/lib/shop-data";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "Conheça a Bliss Beauty & Care: curadoria própria de skincare, cabelo e acessórios, com entrega pessoal em Maputo e Matola.",
  alternates: { canonical: "/sobre" },
};

export default function Sobre() {
  return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="eyebrow">A nossa história</p>
        <h1 className="font-display mt-2 max-w-2xl text-4xl leading-tight sm:text-5xl">
          Beleza que se sente no cuidado de todos os dias.
        </h1>

        <img
          src={heroImage}
          alt="Retrato editorial de pele luminosa"
          loading="lazy"
          width={1024}
          height={1280}
          className="mt-8 h-72 w-full rounded-[2rem] object-cover object-[70%_center] sm:h-96"
        />

        <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            A Bliss Beauty &amp; Care nasceu de um gesto simples: escolher bem. Começámos a partilhar
            com amigas e amigos os produtos que realmente funcionavam — um sérum que devolve o brilho,
            um óleo que transforma a pele, uma bolsa que dura anos.
          </p>
          <p>
            Hoje somos uma loja com curadoria própria de skincare, acessórios e moda. Trabalhamos com
            fórmulas seguras e peças intemporais, para mulheres, homens e opções unissexo — porque o
            autocuidado não tem género.
          </p>
          <p>
            Cada encomenda é conferida à mão e entregue com atendimento pessoal na Cidade de Maputo e
            na Matola. Se tiver dúvidas sobre a rotina ideal para a sua pele, fale connosco: ajudamos
            a escolher.
          </p>
        </div>

        <img
          src={editorial}
          alt="Frascos de skincare sobre superfície de mármore bege"
          loading="lazy"
          width={1280}
          height={800}
          className="mt-10 h-64 w-full rounded-[2rem] object-cover sm:h-80"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Curadoria", "Cada produto é testado antes de entrar na loja."],
            ["Transparência", "Preços claros em meticais, sem surpresas."],
            ["Proximidade", "Atendimento por WhatsApp, de pessoa para pessoa."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-card p-6 shadow-card">
              <p className="font-display text-xl">{title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/produtos"
          className="mt-10 inline-block rounded-full bg-primary px-7 py-4 text-sm tracking-[0.06em] text-primary-foreground uppercase"
        >
          Explorar Coleção
        </Link>
      </div>
  );
}
