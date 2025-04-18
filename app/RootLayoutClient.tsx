'use client'

import './globals.css'
import NavBar from '@/src/components/NavBar'
import { ApiRoutesProvider } from '@/src/contexts/ApiContext'
import SessionWrapper from '@/src/components/auth/SessionWrapper'
import Loading from '@/src/components/utils/Loading'

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
            <NavBar />
            {children}
          </ApiRoutesProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}

export default RootLayoutClient
