import { formatMZN } from "@/lib/format";

/**
 * The store's signature element: a small paper price tag, the kind that
 * really hangs off clothing, bags and jewellery. It carries the price in a
 * mono "ticket" typeface, punched with a hole and tilted as if swinging on
 * a thread — a literal nod to what this shop actually sells.
 */
export function PriceTag({
  price,
  className = "",
}: {
  price: number;
  className?: string;
}) {
  return (
    <div
      className={`group/tag pointer-events-none absolute left-3 top-3 -rotate-6 transition-transform duration-300 group-hover:rotate-0 ${className}`}
    >
      <div className="relative flex items-center gap-1.5 rounded-[4px] rounded-l-none bg-bone px-2.5 py-1 shadow-tag ring-1 ring-ink/10 before:absolute before:-left-[7px] before:top-1/2 before:h-3.5 before:w-3.5 before:-translate-y-1/2 before:rotate-45 before:bg-bone before:content-[''] before:ring-1 before:ring-ink/10">
        <span className="relative z-10 h-1 w-1 rounded-full bg-ink/20 ring-1 ring-ink/20" />
        <span className="relative z-10 font-mono text-[11px] font-medium tracking-tight text-ink">
          {formatMZN(price)}
        </span>
      </div>
    </div>
  );
}
