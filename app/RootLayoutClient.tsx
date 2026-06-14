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
      <body className="relative min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 -z-10" aria-hidden>
          <div
            className="absolute rounded-full animate-float-slow"
            style={{
              width: 700,
              height: 700,
              top: '-15%',
              left: '-12%',
              background:
                'radial-gradient(circle at 40% 40%, rgba(79,31,181,0.55) 0%, rgba(30,10,92,0.3) 55%, transparent 80%)',
              filter: 'blur(80px)',
              mixBlendMode: 'screen',
              opacity: 0.7,
            }}
          />
          <div
            className="absolute rounded-full animate-float-medium"
            style={{
              width: 550,
              height: 550,
              bottom: '-8%',
              right: '-8%',
              background:
                'radial-gradient(circle at 60% 60%, rgba(14,77,138,0.5) 0%, rgba(5,28,58,0.3) 55%, transparent 80%)',
              filter: 'blur(70px)',
              mixBlendMode: 'screen',
              opacity: 0.6,
            }}
          />
          <div
            className="absolute rounded-full animate-float-subtle"
            style={{
              width: 380,
              height: 380,
              top: '45%',
              left: '50%',
              background:
                'radial-gradient(circle at 50% 50%, rgba(109,40,217,0.35) 0%, transparent 70%)',
              filter: 'blur(60px)',
              mixBlendMode: 'screen',
              opacity: 0.5,
            }}
          />
          <div
            className="absolute rounded-full animate-float-teal"
            style={{
              width: '42vw',
              height: '42vw',
              top: '30%',
              right: '-8%',
              background:
                'radial-gradient(circle, rgba(14,122,114,0.5) 0%, transparent 70%)',
              filter: 'blur(90px)',
              mixBlendMode: 'screen',
              opacity: 0.55,
            }}
          />
          <div
            className="absolute rounded-full animate-float-gold"
            style={{
              width: '28vw',
              height: '28vw',
              top: '8%',
              right: '22%',
              background:
                'radial-gradient(circle, rgba(196,122,0,0.45) 0%, transparent 70%)',
              filter: 'blur(80px)',
              mixBlendMode: 'screen',
              opacity: 0.35,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(255,255,255,0.018) 1px, transparent 0)
              `,
              backgroundSize: '28px 28px',
            }}
          />
          <div className="bg-grain" />
          <div className="bg-vignette" />
        </div>
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
      </body>
    </html>
  )
}

export default RootLayoutClient
