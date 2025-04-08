import React from 'react'
import { SessionProvider } from 'next-auth/react'

type Props = { children: any }

const SessionWrapper = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default SessionWrapper
