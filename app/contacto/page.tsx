import type { Metadata } from "next";
import { STORE } from "@/lib/shop-data";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Fale com a Bliss Beauty & Care por telefone ou WhatsApp. Entregas na Cidade de Maputo e Matola.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  return (
      <section className="mx-auto max-w-3xl px-4 py-20">
        <p className="eyebrow">Fale connosco</p>
        <h1 className="font-display mt-4 text-5xl">Estamos aqui para ajudar.</h1>

        <div className="mt-10 grid gap-4">
          <div className="rounded-2xl bg-secondary p-6">
            Telefone
            <br />
            <span className="text-muted-foreground">{STORE.phoneDisplay}</span>
          </div>

          <a
            className="rounded-2xl bg-secondary p-6"
            href={`https://wa.me/${STORE.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
            <br />
            <span className="text-muted-foreground">Fale connosco diretamente</span>
          </a>

          <a
            className="rounded-2xl bg-secondary p-6"
            href={STORE.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
            <br />
            <span className="text-muted-foreground">{STORE.instagram}</span>
          </a>

          <a
            className="rounded-2xl bg-secondary p-6"
            href={STORE.whatsappGroupUrl}
            target="_blank"
            rel="noreferrer"
          >
            Grupo de WhatsApp
            <br />
            <span className="text-muted-foreground">Novidades e promoções em primeira mão</span>
          </a>

          <div className="rounded-2xl bg-secondary p-6">
            Entregas
            <br />
            <span className="text-muted-foreground">{STORE.delivery}</span>
          </div>
        </div>
      </section>
  );
}
