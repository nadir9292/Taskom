import LoginButton from '@/src/components/auth/LoginButton'
import LoginTypeWritterEffect from '@/src/components/LoginTypeWritterEffect'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Connexion',
  description:
    "Connectez-vous à Flowboro, le kanban open source, pour gérer vos tableaux et vos sprints : backlog, étapes et équipes dans un seul flux.",
  alternates: {
    canonical: '/login',
  },
}

const Login = () => {
  return (
    <div className="relative w-[90vw] mx-auto">
      <LoginTypeWritterEffect />
      <LoginButton />
    </div>
  )
}

export default Login
