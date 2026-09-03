import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, SITE_URL, formatMZN } from "@/lib/shop-data";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return {};

  const title = product.name;
  const description = `${formatMZN(product.price)} — ${product.description}`;

  // Usa a API de optimização do Next.js/Vercel para servir a imagem
  // fisicamente redimensionada a 200×200px — o WhatsApp lê o tamanho
  // real do ficheiro, não as dimensões declaradas nas meta tags.
  const rawImage = encodeURIComponent(product.images[0]);
  const imageUrl = `${SITE_URL}/_next/image?url=${rawImage}&w=256&q=75`;

  return {
    title,
    description,
    alternates: { canonical: `/produto/${product.id}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/produto/${product.id}`,
      images: [{ url: imageUrl, width: 200, height: 200, alt: product.name, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <section className="mx-auto max-w-lg px-4 py-12">
      <div className="overflow-hidden rounded-3xl bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          width={800}
          height={800}
          className="aspect-square w-full object-cover"
        />
      </div>

      <p className="eyebrow mt-6">{product.category}</p>
      <h1 className="font-display mt-2 text-3xl">{product.name}</h1>
      <p className="font-display mt-2 text-2xl">{formatMZN(product.price)}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      <Link
        href={`/produtos?categoria=${encodeURIComponent(product.category)}`}
        className="mt-8 block rounded-full bg-primary px-6 py-4 text-center text-sm uppercase tracking-[0.06em] text-primary-foreground"
      >
        Ver na loja
      </Link>
    </section>
  );
}
