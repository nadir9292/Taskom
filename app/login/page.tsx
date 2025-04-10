import LoginButton from '@/src/components/auth/LoginButton'
import React from 'react'

type Props = object

const Login = ({}: Props) => {
  return (
    <div className="relative w-[90vw] mx-auto">
      <h1 className="text-center text-xl md:text-2xl py-2 px-1 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint non
        blanditiis aut? Quia consequatur eligendi doloribus praesentium in,
        temporibus repellendus, maxime sit sint delectus sunt. Fuga repellat
        nihil quos saepe.
      </h1>
      <LoginButton />
    </div>
  )
}

export default Login
