import LoginButton from '@/src/components/auth/LoginButton'
import LoginTypeWritterEffect from '@/src/components/LoginTypeWritterEffect'
import React from 'react'

const Login = () => {
  return (
    <div className="relative w-[90vw] mx-auto">
      <LoginTypeWritterEffect />
      <LoginButton />
    </div>
  )
}

export default Login
