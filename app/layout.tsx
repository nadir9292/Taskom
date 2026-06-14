import RootLayoutClient from '@/app/RootLayoutClient'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Taskom',
  description: 'Your app description',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>
}
