import LoginButton from '@/src/components/auth/LoginButton'
import LoginTypeWritterEffect from '@/src/components/LoginTypeWritterEffect'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Connexion / Login',
  description:
    "Connectez-vous à Taskom pour gérer vos projets Scrum : sprints, backlog et équipes. Sign in to Taskom to manage your Scrum projects: sprints, backlog and teams.",
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
