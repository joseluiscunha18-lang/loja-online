export {
  Menu as IconMenu,
  Search as IconSearch,
  ShoppingBag as IconBag,
  X as IconClose,
  Star as IconStar,
  Heart as IconHeart,
  Plus as IconPlus,
  Minus as IconMinus,
  ArrowRight as IconArrowRight,
  Mail as IconMail,
  Instagram as IconInstagram,
  Phone as IconPhone,
  MapPin as IconMapPin,
} from "lucide-react";

/** Marca da loja: monograma "B" sobre uma etiqueta suspensa — ecoa o
 * motivo de etiqueta de preço usado nos cartões de produto. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 4h13.5L28 12.5v13a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V6.5A2.5 2.5 0 0 1 6 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="21" cy="11" r="1.6" stroke="currentColor" strokeWidth="1.2" />
      <text
        x="15"
        y="21"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="12"
        fill="currentColor"
      >
        B
      </text>
    </svg>
  );
}
