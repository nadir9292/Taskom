import RootLayoutClient from '@/app/RootLayoutClient'
import type { Metadata, Viewport } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://flowboro.app'

const title =
  'Flowboro — Logiciel kanban open source pour équipes agiles'
const description =
  "Flowboro est le logiciel kanban open source qui réunit tableaux visuels et sprints agiles. Gratuit, auto-hébergeable et entièrement transparent : un outil de gestion de projet que vous contrôlez vraiment, sans vendor lock-in."

const keywords = [
  'Flowboro',
  'logiciel kanban open source',
  'kanban open source',
  'kanban auto-hébergé',
  'outil de gestion de projet open source',
  'alternative open source à un outil de gestion par tableaux',
  'tableau kanban en ligne',
  'gestion de sprint open source',
  'logiciel de gestion de projet agile',
  'gestion de projet agile',
  'sprint planning',
  'product backlog',
  'tableau de tâches pour équipe',
  'self-hosted kanban',
  'team collaboration',
  'kanban board',
  'outil scrum open source',
]

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Flowboro',
  },
  description,
  keywords,
  applicationName: 'Flowboro',
  authors: [{ name: 'Flowboro' }],
  creator: 'Flowboro',
  publisher: 'Flowboro',
  category: 'productivity',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Flowboro',
    title,
    description,
    url: siteUrl,
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@flowboro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2b34e2',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>
}
