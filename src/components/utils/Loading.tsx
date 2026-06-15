import { useApiRoutes } from '@/src/contexts/ApiContext'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Loading = () => {
  const pathname = usePathname()
  const { user } = useApiRoutes()
  const { status } = useSession()

  if (Object.keys(user!).length > 0 || pathname === '/login' || status === 'unauthenticated') return

  return (
    <div
      className="fixed inset-0 w-screen flex flex-col items-center justify-center"
      style={{
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        background: 'rgba(6, 6, 26, 0.75)',
      }}
    >
      <div className="text-center animate-fade-in-up">
        <Image
          className="animate-spin mx-auto opacity-90"
          src="/loading_logo.png"
          alt="loading"
          width={56}
          height={56}
          priority
        />
        <p className="mt-5 text-sm font-medium text-white/50 tracking-wider uppercase">
          Loading
        </p>
      </div>
    </div>
  )
}

export default Loading
