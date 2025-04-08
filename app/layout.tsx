'use client'

import './globals.css'
import NavBar from '@/src/components/NavBar'
import { ApiRoutesProvider } from '@/src/contexts/ApiContext'
import SessionWrapper from '@/src/components/auth/SessionWrapper'

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
            <NavBar />
            {children}
          </ApiRoutesProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}

export default RootLayout
