import Image from "next/image";
import { IconArrowRight } from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 md:items-stretch">
        <div className="relative order-2 flex flex-col justify-center px-6 py-12 md:order-1 md:px-14 md:py-0">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-brass-light">
            Discover
          </p>
          <h2 className="font-display text-5xl font-medium leading-[1.02] text-bone md:text-6xl lg:text-7xl">
            Autocuidado
            <br />
            &amp; Beleza
          </h2>
          <p className="mt-5 max-w-xs font-sans text-sm font-light text-bone/60 md:text-base">
            Cosméticos, acessórios e moda selecionados para o seu bem-estar
            diário — entregues em Maputo &amp; Matola.
          </p>
          <a
            href="#catalogo"
            className="mt-8 flex w-fit items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-medium text-ink shadow-lift transition hover:bg-brass-light"
          >
            Explorar Coleção <IconArrowRight size={16} strokeWidth={2} />
          </a>
        </div>

        <div className="relative order-1 h-[52vh] min-h-[340px] md:order-2 md:h-auto md:min-h-[560px]">
          <Image
            src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=1200&q=80"
            alt="Produtos de beleza Bliss Beauty & Care"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent md:bg-gradient-to-l" />
        </div>
      </div>
    </section>
  );
}
