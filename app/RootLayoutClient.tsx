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

const RootLayoutClient = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 -z-10" aria-hidden>
          <div
            className="absolute rounded-full blur-[140px] opacity-30"
            style={{
              width: 600,
              height: 600,
              top: '-10%',
              left: '-10%',
              background:
                'radial-gradient(circle, #4f1fb5 0%, #1e0a5c 60%, transparent 100%)',
            }}
          />
          <div
            className="absolute rounded-full blur-[120px] opacity-20"
            style={{
              width: 500,
              height: 500,
              bottom: '-5%',
              right: '-5%',
              background:
                'radial-gradient(circle, #0e4d8a 0%, #051c3a 60%, transparent 100%)',
            }}
          />
          <div
            className="absolute rounded-full blur-[100px] opacity-15"
            style={{
              width: 350,
              height: 350,
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(circle, #6d28d9 0%, transparent 70%)',
            }}
          />
        </div>
        <SessionWrapper>
          <SelectedProvider>
            <ApiRoutesProvider>
              <Loading />
              <NavBar />
              {children}
            </ApiRoutesProvider>
          </SelectedProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}

export default RootLayoutClient
