'use client'

import { signIn, signOut } from 'next-auth/react'
import React from 'react'

type Props = object

const Login = ({}: Props) => {
  return (
    <div className="grid grid-cols-1 mx-auto max-w-xs md:max-w-xl mt-24">
      <h1 className="text-center text-xl md:text-2xl">
        Bienvenue sur Task organization manager
      </h1>
      <button
        className="btn btn-lg md:btn-xl mt-12 mb-8"
        onClick={() => signIn('github')}
      >
        Login with GitHub
      </button>
      <button className="btn btn-lg md:btn-xl" onClick={() => signOut()}>
        logout
      </button>
    </div>
  )
}

export default Login
