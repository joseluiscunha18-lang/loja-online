import Link from "next/link";
import type { Metadata } from "next";
import { heroImage, editorial } from "@/lib/shop-data";

export const metadata: Metadata = {
  title: "A Nossa Hist\u00f3ria",
  description:
    "A Bliss Beauty & Care nasceu de uma pergunta simples: e se cuidar de n\u00f3s pudesse ser ainda mais especial? Conhe\u00e7a a nossa hist\u00f3ria.",
  alternates: { canonical: "/sobre" },
};

export default function Sobre() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="eyebrow">A nossa hist\u00f3ria</p>
      <h1 className="font-display mt-2 max-w-2xl text-4xl leading-tight sm:text-5xl">
        E se cuidar de n\u00f3s pudesse ser ainda mais especial?
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
          Foi dessa pergunta que nasceu a Bliss Beauty &amp; Care &mdash; uma marca criada para
          celebrar a beleza, o autocuidado e aqueles pequenos momentos em que escolhemos parar e
          cuidar de n\u00f3s.
        </p>
        <p>
          Acreditamos que n\u00e3o \u00e9 preciso esperar por uma ocasi\u00e3o especial para nos mimarmos.
          \u00c0s vezes, um bom produto, uma rotina de cuidado ou alguns minutos s\u00f3 para n\u00f3s s\u00e3o
          suficientes para transformar o nosso dia.
        </p>
        <p>
          Por isso, cri\u00e1mos a Bliss para trazer at\u00e9 si uma sele\u00e7\u00e3o de produtos de beleza,
          skincare, body care e cuidados pessoais &mdash; escolhidos para tornar a sua rotina mais
          bonita, prazerosa e especial.
        </p>
        <p>
          <em>Bliss</em> significa aquele sentimento de felicidade e bem-estar que desejamos
          proporcionar em cada experi\u00eancia. Mais do que uma loja, queremos ser aquele pequeno
          lembrete de que si tamb\u00e9m merece cuidado.
        </p>
        <p className="font-medium text-foreground">E esta \u00e9 apenas a nossa primeira p\u00e1gina.</p>
      </div>

      <img
        src={editorial}
        alt="Frascos de skincare sobre superf\u00edcie de m\u00e1rmore bege"
        loading="lazy"
        width={1280}
        height={800}
        className="mt-10 h-64 w-full rounded-[2rem] object-cover sm:h-80"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["Curadoria", "Cada produto \u00e9 escolhido com cuidado antes de entrar na loja."],
          ["Transpar\u00eancia", "Pre\u00e7os claros em meticais, sem surpresas."],
          ["Proximidade", "Atendimento por WhatsApp, de pessoa para pessoa."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-3xl bg-card p-6 shadow-card">
            <p className="font-display text-xl">{title}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-secondary px-8 py-10 text-center">
        <p className="font-display text-2xl">Bem-vinda \u00e0 Bliss Beauty &amp; Care.</p>
        <p className="mt-3 text-sm text-muted-foreground">
          O seu cuidado, o seu momento <em>Bliss</em>.
        </p>
        <Link
          href="/produtos"
          className="mt-6 inline-block rounded-full bg-primary px-7 py-4 text-sm tracking-[0.06em] text-primary-foreground uppercase"
        >
          Explorar Cole\u00e7\u00e3o
        </Link>
      </div>
    </div>
  );
}

