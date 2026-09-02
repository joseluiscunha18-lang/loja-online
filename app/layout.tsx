import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { ShopShell } from '@/components/shop-shell'
import './globals.css'

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display' })
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })

const siteUrl = 'https://bliss-beauty-three.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bliss Beauty & Care — Cosmética e Beleza em Maputo e Matola',
    template: '%s — Bliss Beauty & Care',
  },
  description:
    'Loja online de cosmética, cuidado de pele, cabelo e acessórios de beleza. Entregas na Cidade de Maputo e Matola.',
  keywords: [
    'cosmética Maputo',
    'beleza Moçambique',
    'skincare Maputo',
    'loja de beleza Matola',
    'Bliss Beauty & Care',
  ],
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_MZ',
    url: siteUrl,
    siteName: 'Bliss Beauty & Care',
    title: 'Bliss Beauty & Care — Cosmética e Beleza em Maputo e Matola',
    description:
      'Loja online de cosmética, cuidado de pele, cabelo e acessórios de beleza. Entregas na Cidade de Maputo e Matola.',
    images: [{ url: '/assets/hero.jpg', width: 1200, height: 630, alt: 'Bliss Beauty & Care' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bliss Beauty & Care — Cosmética e Beleza em Maputo e Matola',
    description:
      'Loja online de cosmética, cuidado de pele, cabelo e acessórios de beleza. Entregas na Cidade de Maputo e Matola.',
    images: ['/assets/hero.jpg'],
  },
  robots: { index: true, follow: true },
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#1a1410' }

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Bliss Beauty & Care',
  description:
    'Loja online de cosmética, cuidado de pele, cabelo e acessórios de beleza. Entregas na Cidade de Maputo e Matola.',
  url: siteUrl,
  telephone: '+258860606170',
  areaServed: ['Maputo', 'Matola'],
  address: { '@type': 'PostalAddress', addressLocality: 'Maputo', addressCountry: 'MZ' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt" className={`${display.variable} ${sans.variable} bg-background`}><head><link rel="preload" as="image" href="/assets/hero.jpg" fetchPriority="high" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} /></head><body className="font-sans antialiased"><ShopShell>{children}</ShopShell>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
