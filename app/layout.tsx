import RootLayoutClient from '@/app/RootLayoutClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Taskom',
  description: 'Your app description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>
}
