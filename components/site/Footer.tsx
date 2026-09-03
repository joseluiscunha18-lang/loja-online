"use client";
import Link from "next/link";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { STORE } from "@/lib/shop-data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h2 className="font-display text-2xl leading-snug">
              Bliss <span className="italic">Beauty</span> &amp; Care
            </h2>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Cosmética, acessórios e moda selecionados para o seu ritual diário de autocuidado.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Contacto</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${STORE.email}`}
                  className="flex items-center gap-2.5 hover:text-muted-foreground"
                >
                  <Mail className="size-4 shrink-0" aria-hidden />
                  <span>E-mail de suporte: {STORE.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0" aria-hidden />
                <span>Telefone: {STORE.phoneDisplay}</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-muted-foreground"
                >
                  <MessageCircle className="size-4 shrink-0" aria-hidden />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={STORE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-muted-foreground"
                >
                  <MessageCircle className="size-4 shrink-0" aria-hidden />
                  <span>Instagram: {STORE.instagram}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="size-4 shrink-0" aria-hidden />
                <span>{STORE.logistics}</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Navegação</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/produtos" className="hover:text-muted-foreground">
                  Loja completa
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-muted-foreground">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-muted-foreground">
                  Contacto &amp; entregas
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-muted-foreground">
                  Finalizar compra
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bliss Beauty &amp; Care. Todos os direitos reservados.</p>
          <p>{STORE.delivery}</p>
        </div>
      </div>
    </footer>
  );
}
