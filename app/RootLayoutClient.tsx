'use client'

import './globals.css'
import NavBar from '@/src/components/NavBar'
import { ApiRoutesProvider } from '@/src/contexts/ApiContext'
import SessionWrapper from '@/src/components/auth/SessionWrapper'
import Loading from '@/src/components/utils/Loading'
import { SelectedProvider } from '@/src/contexts/SelectedContext'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://flowboro.app'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Flowboro',
  url: siteUrl,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Project Management',
  operatingSystem: 'Web',
  description:
    'Flowboro est un logiciel kanban pour équipes qui réunit tableaux visuels et sprints agiles. Une alternative simple aux outils de gestion de projet par tableaux.',
  inLanguage: 'fr',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Flowboro',
    url: siteUrl,
    logo: `${siteUrl}/icon-512x512.png`,
  },
}

const RootLayoutClient = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="fr" className={montserrat.className}>
      <body className="min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="fixed inset-0 z-0" aria-hidden style={{ background: '#06061a' }}>
          <div className="absolute rounded-full animate-float-slow blob-purple" />
          <div className="absolute rounded-full animate-float-medium blob-blue" />
          <div className="absolute rounded-full animate-float-subtle blob-violet" />
          <div className="absolute rounded-full animate-float-teal blob-teal" />
          <div className="absolute rounded-full animate-float-gold blob-gold" />
          <div className="bg-dots" />
          <div className="bg-grain" />
          <div className="bg-vignette" />
        </div>
        <div className="relative z-10">
        <SessionWrapper>
          <SelectedProvider>
            <ApiRoutesProvider>
              <Loading />
              <NavBar />
              <main className="pb-28 sm:pb-4">
                {children}
              </main>
            </ApiRoutesProvider>
          </SelectedProvider>
        </SessionWrapper>
        </div>
      </body>
    </html>
  )
}

export default RootLayoutClient
