'use client'

import './globals.css'
import NavBar from '@/src/components/NavBar'
import { ApiRoutesProvider } from '@/src/contexts/ApiContext'
import SessionWrapper from '@/src/components/auth/SessionWrapper'
import VantaBackground from '@/src/components/ui/VantaBackground'
import Loading from '@/src/components/Loading'

const RootLayoutClient = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-hidden">
        <SessionWrapper>
          <ApiRoutesProvider>
            <Loading />
            <VantaBackground />
            <NavBar />
            {children}
          </ApiRoutesProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}

export default RootLayoutClient
