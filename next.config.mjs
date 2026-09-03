/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Optimização activada para que /_next/image?url=...&w=256 funcione
    // e sirva imagens fisicamente pequenas para o WhatsApp.
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  // Comprimir respostas HTTP (reduz tempo de carregamento)
  compress: true,
  // Experimental: package imports tree-shaking para lucide-react
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
