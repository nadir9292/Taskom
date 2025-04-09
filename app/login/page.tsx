import LoginButton from '@/src/components/auth/LoginButton'
import React from 'react'

type Props = object

const Login = ({}: Props) => {
  return (
    <div className="grid grid-cols-1 mx-auto max-w-xs md:max-w-xl bg-[#F5F5F5] py-8 px-3 mt-24 rounded-2xl shadow-2xl">
      <h1 className="text-center text-2xl md:text-4xl mb-12">
        Bienvenue sur Task organization manager
      </h1>
      <LoginButton />
    </div>
  )
}

export default Login
