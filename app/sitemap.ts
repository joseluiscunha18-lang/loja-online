import type { MetadataRoute } from "next";
import { PRODUCTS, SITE_URL } from "@/lib/shop-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/produtos", "/sobre", "/contacto"];

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE_URL}/produto/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
