'use client'

import './globals.css'
import NavBar from '@/src/components/NavBar'
import { ApiRoutesProvider } from '@/src/contexts/ApiContext'
import SessionWrapper from '@/src/components/auth/SessionWrapper'
import Loading from '@/src/components/utils/Loading'
import { SelectedProvider } from '@/src/contexts/SelectedContext'

const RootLayoutClient = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-hidden">
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
