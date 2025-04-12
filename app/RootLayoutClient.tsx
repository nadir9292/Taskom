/* eslint-disable @next/next/no-page-custom-font */
'use client'

import './globals.css'
import NavBar from '@/src/components/NavBar'
import { ApiRoutesProvider } from '@/src/contexts/ApiContext'
import SessionWrapper from '@/src/components/auth/SessionWrapper'
import { AuroraBackground } from '@/src/components/ui/aurora-background'
import Head from 'next/head'

const RootLayoutClient = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.ts" />
        <link rel="icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#fafafa" />
      </Head>
      <body>
        <SessionWrapper>
          <ApiRoutesProvider>
            <AuroraBackground>
              <NavBar />
              {children}
            </AuroraBackground>
          </ApiRoutesProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}

export default RootLayoutClient
