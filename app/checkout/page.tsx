"use client";
import { Phone } from "lucide-react";
import { useShop } from "@/lib/shop-context";
import { formatMZN, productUrl, STORE } from "@/lib/shop-data";

export default function Checkout() {
  const { detailed, subtotal } = useShop();

  const message = encodeURIComponent(
    [
      "Ol\u00e1, bom dia! \uD83D\uDC4B",
      "Gostaria de fazer a seguinte encomenda:",
      "",
      ...detailed.map(
        ({ product, item }) =>
          `\u25B8 ${item.quantity}x ${product.name}\n   ${productUrl(product.id)}`,
      ),
      "",
      `\uD83D\uDCB0 Total: ${formatMZN(subtotal)}`,
      "",
      "Aguardo confirma\u00e7\u00e3o de disponibilidade e informa\u00e7\u00f5es sobre a entrega. Obrigado/a! \uD83D\uDE4F",
    ].join("\n"),
  );

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <p className="eyebrow">Finalizar encomenda</p>
      <h1 className="font-display mt-3 text-5xl">A sua sacola</h1>

      {detailed.length === 0 ? (
        <p className="mt-8 text-muted-foreground">A sua sacola est\u00e1 vazia.</p>
      ) : (
        <>
          <div className="mt-8 divide-y border-y">
            {detailed.map(({ product, item, total }) => (
              <div className="flex justify-between py-4" key={`${product.id}-${item.variant}`}>
                <span>
                  {item.quantity}x {product.name}
                </span>
                <span>{formatMZN(total)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-6 text-lg font-medium">
            <span>Total</span>
            <span>{formatMZN(subtotal)}</span>
          </div>
          <a
            href={`https://wa.me/${STORE.whatsapp}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-full bg-primary px-6 py-4 text-center text-sm uppercase text-primary-foreground"
          >
            Encomendar pelo WhatsApp
          </a>
        </>
      )}

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Phone className="size-4" aria-hidden />
        <span>Prefere ligar? {STORE.phoneDisplay}</span>
      </div>
    </section>
  );
}
