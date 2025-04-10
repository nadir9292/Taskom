'use client'

import './globals.css'
import NavBar from '@/src/components/NavBar'
import { ApiRoutesProvider } from '@/src/contexts/ApiContext'
import SessionWrapper from '@/src/components/auth/SessionWrapper'
import { AuroraBackground } from '@/src/components/ui/aurora-background'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
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

export default RootLayout
