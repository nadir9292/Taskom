'use client'

import { useApiRoutes } from '@/src/contexts/ApiContext'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline'

const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { user } = useApiRoutes()
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const handleWindowResize = () => setWindowWidth(window.innerWidth)
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  if (!mounted || !session || status !== 'authenticated') return null

  return (
    <>
      {windowWidth >= 600 ? (
        <div className="w-[95vw] mx-auto mt-4 glass rounded-2xl px-5 py-2.5 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-white/90 hover:text-white transition-colors"
          >
            Taskom
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/my-team"
              className="btn-glass text-sm px-4 py-2"
            >
              My team
            </Link>

            <div className="relative" style={{ zIndex: 100 }}>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="cursor-pointer">
                  <Image
                    src={user?.profileimage ?? '/default-profile.png'}
                    height={36}
                    width={36}
                    alt="profile"
                    priority
                    className="rounded-xl border border-white/15 object-cover"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content glass rounded-xl w-44 p-1.5 shadow-2xl mt-2"
                >
                  <li>
                    <Link
                      href="/my-profile"
                      className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                    >
                      My profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92vw] p-1.5 flex justify-between items-center glass rounded-2xl z-10">
          {[
            { path: '/my-team', icon: UsersIcon, label: 'My team' },
            { path: '/', icon: HomeIcon, label: 'Home' },
          ].map(({ path, icon: Icon, label }) => (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex flex-col items-center justify-center flex-1 h-14 rounded-xl transition-all ${
                pathname === path
                  ? 'bg-white/10 border border-white/15'
                  : 'hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5 text-white/70" />
              <span className="text-[10px] font-medium text-white/60 mt-1">
                {label}
              </span>
            </button>
          ))}

          <div className="relative flex-1 flex justify-center">
            <div className="dropdown dropdown-top dropdown-end">
              <div
                tabIndex={0}
                className="flex flex-col items-center justify-center h-14 rounded-xl hover:bg-white/5 transition-all px-4"
              >
                <Image
                  src={session.user?.image ?? '/default-profile.png'}
                  height={30}
                  width={30}
                  className="rounded-lg border border-white/15"
                  alt="profile"
                />
                <span className="text-[10px] font-medium text-white/60 mt-1">
                  {session.user?.name?.split(' ')[0]}
                </span>
              </div>
              <ul className="dropdown-content glass p-1.5 rounded-xl w-36 z-50">
                <li>
                  <p className="px-3 py-2 text-sm text-white/70">My profile</p>
                </li>
                <li>
                  <p
                    onClick={() => signOut()}
                    className="px-3 py-2 text-sm text-red-400 cursor-pointer hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar
