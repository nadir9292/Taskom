import LoginButton from '@/src/components/auth/LoginButton'
import LoginTypeWritterEffect from '@/src/components/LoginTypeWritterEffect'
import React from 'react'

type Props = object

const Login = ({}: Props) => {
  return (
    <div className="relative w-[90vw] mx-auto">
      <div className="text-zinc-50">I</div>
      <LoginTypeWritterEffect />
      <LoginButton />
    </div>
  )
}

export default Login
