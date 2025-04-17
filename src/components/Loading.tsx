import { useApiRoutes } from '@/src/contexts/ApiContext'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = object

const Loading = ({}: Props) => {
  const pathname = usePathname()
  const { user } = useApiRoutes()

  if (Object.keys(user).length > 0 || pathname === '/login') return

  return (
    <div
      className="fixed inset-0 w-screen overflow-y-auto backdrop-blur-xl"
      style={{ zIndex: 100 }}
    >
      <div className="text-center mt-36">
        <Image
          className="animate-spin mx-auto"
          src="/loading_logo.png"
          alt="loading image"
          width={150}
          height={150}
          priority
        />
        <h1 className="mt-6 text-3xl animate-pulse font-bold">Loading...</h1>
      </div>
    </div>
  )
}

export default Loading
