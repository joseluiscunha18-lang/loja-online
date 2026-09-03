import Link from "next/link";
import type { Metadata } from "next";
import { heroImage, editorial } from "@/lib/shop-data";

export const metadata: Metadata = {
  title: "A Nossa História",
  description:
    "A Bliss Beauty & Care nasceu de uma pergunta simples: e se cuidar de nós pudesse ser ainda mais especial? Conheça a nossa história.",
  alternates: { canonical: "/sobre" },
};

export default function Sobre() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="eyebrow">A nossa história</p>
      <h1 className="font-display mt-2 max-w-2xl text-4xl leading-tight sm:text-5xl">
        E se cuidar de nós pudesse ser ainda mais especial?
      </h1>

      <img
        src={heroImage}
        alt="Retrato editorial de pele luminosa"
        loading="lazy"
        width={1024}
        height={1280}
        className="mt-8 h-72 w-full rounded-[2rem] object-cover object-[70%_center] sm:h-96"
      />

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Foi dessa pergunta que nasceu a Bliss Beauty &amp; Care — uma marca criada para
          celebrar a beleza, o autocuidado e aqueles pequenos momentos em que escolhemos parar e
          cuidar de nós.
        </p>
        <p>
          Acreditamos que não é preciso esperar por uma ocasião especial para nos mimarmos.
          Às vezes, um bom produto, uma rotina de cuidado ou alguns minutos só para nós são
          suficientes para transformar o nosso dia.
        </p>
        <p>
          Por isso, criámos a Bliss para trazer até si uma seleção de produtos de beleza,
          skincare, body care e cuidados pessoais — escolhidos para tornar a sua rotina mais
          bonita, prazerosa e especial.
        </p>
        <p>
          <em>Bliss</em> significa aquele sentimento de felicidade e bem-estar que desejamos
          proporcionar em cada experiência. Mais do que uma loja, queremos ser aquele pequeno
          lembrete de que si também merece cuidado.
        </p>
        <p className="font-medium text-foreground">E esta é apenas a nossa primeira página.</p>
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
          ["Curadoria", "Cada produto é escolhido com cuidado antes de entrar na loja."],
          ["Transparência", "Preços claros em meticais, sem surpresas."],
          ["Proximidade", "Atendimento por WhatsApp, de pessoa para pessoa."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-3xl bg-card p-6 shadow-card">
            <p className="font-display text-xl">{title}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-secondary px-8 py-10 text-center">
        <p className="font-display text-2xl">Bem-vinda à Bliss Beauty &amp; Care.</p>
        <p className="mt-3 text-sm text-muted-foreground">
          O seu cuidado, o seu momento <em>Bliss</em>.
        </p>
        <Link
          href="/produtos"
          className="mt-6 inline-block rounded-full bg-primary px-7 py-4 text-sm tracking-[0.06em] text-primary-foreground uppercase"
        >
          Explorar Coleção
        </Link>
      </div>
    </div>
  );
}
