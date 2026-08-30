import { IconInstagram, IconMail, IconMapPin, IconPhone } from "./icons";

const channels = [
  {
    icon: IconMail,
    label: "E-mail de Suporte",
    value: "suporte@blissbeauty.co.mz",
    href: "mailto:suporte@blissbeauty.co.mz",
  },
  {
    icon: IconInstagram,
    label: "Instagram",
    value: "@blissbeautycare",
    href: "https://instagram.com/blissbeautycare",
  },
  {
    icon: IconPhone,
    label: "WhatsApp / Telefone",
    value: "+258 84 000 0000",
    href: "https://wa.me/258840000000",
  },
];

export function ContactSection() {
  return (
    <section className="mx-4 mb-6 rounded-2xl border border-line bg-white px-4 py-8 shadow-card md:mx-auto md:max-w-3xl md:px-10">
      <h3 className="mb-4 text-center font-display text-lg font-semibold text-ink">
        Contacte-nos
      </h3>
      <div className="grid gap-3 md:grid-cols-3">
        {channels.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center gap-3 rounded-xl bg-bone p-3 transition hover:bg-bone-dim"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-bone">
              <Icon size={18} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-ink-soft/70">{label}</p>
              <p className="truncate text-sm font-medium text-ink">{value}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-bone-dim p-3 text-center">
        <IconMapPin size={14} strokeWidth={1.8} className="text-emerald" />
        <p className="text-xs font-medium text-ink-soft">
          Atendimento e Entregas: Cidade de Maputo &amp; Matola
        </p>
      </div>
    </section>
  );
}
