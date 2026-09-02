import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display' })
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = { title: 'Bliss Beauty & Care — Maputo', description: 'Cosmética, acessórios e moda selecionados. Entregas em Maputo e Matola.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f7f4ef' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt" className={`${display.variable} ${sans.variable} bg-background`}><head><link rel="preload" as="image" href="/assets/hero.jpg" fetchPriority="high" /></head><body className="font-sans antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
