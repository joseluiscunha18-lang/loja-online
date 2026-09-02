import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todos os produtos",
  description:
    "Explore skincare, cabelo, banho e acessórios de beleza da Bliss Beauty & Care, com entrega em Maputo e Matola.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
