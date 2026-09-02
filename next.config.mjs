/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Manter unoptimized:true para assets locais (Vercel free tier)
    // mas activar formatos modernos para quando for activado
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  // Comprimir respostas HTTP (reduz tempo de carregamento)
  compress: true,
  // Experimental: package imports tree-shaking para lucide-react
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
