import RootLayoutClient from '@/app/RootLayoutClient'
import type { Metadata, Viewport } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://taskom.app'

const title = 'Taskom — Outil de gestion de projet Scrum / Scrum Project Management'
const description =
  "Taskom est un outil de gestion de projet spécialisé Scrum : sprints, backlog, équipes et tableaux pour organiser vos projets agiles. Taskom is a Scrum-focused project management tool: sprints, backlog, teams and boards to run your agile projects."

const keywords = [
  'Taskom',
  'Scrum',
  'gestion de projet',
  'project management',
  'agile',
  'sprint',
  'backlog',
  'scrum board',
  'tableau scrum',
  'gestion de sprint',
  'sprint planning',
  'product backlog',
  'gestion agile',
  'agile project management',
  'collaboration équipe',
  'team collaboration',
  'kanban',
  'outil scrum',
]

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Taskom',
  },
  description,
  keywords,
  applicationName: 'Taskom',
  authors: [{ name: 'Taskom' }],
  creator: 'Taskom',
  publisher: 'Taskom',
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
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Taskom',
    title,
    description,
    url: siteUrl,
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@taskom',
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
