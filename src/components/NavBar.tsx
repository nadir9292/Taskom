'use client'

import { useApiRoutes } from '@/src/contexts/ApiContext'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline'

const NavBar = () => {
  const [mounted, setMounted] = useState(false)
  const { user } = useApiRoutes()
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !session || status !== 'authenticated') return null

  return (
    <>
      {/* Desktop top nav */}
      <div className="hidden sm:flex w-[95vw] mx-auto mt-4 glass rounded-2xl px-5 py-3 items-center justify-between animate-fade-in-up">
        <Link
          href="/"
          className="text-[17px] font-semibold tracking-tight text-white hover:text-white/90 transition-colors"
        >
          Taskom
        </Link>

        <div className="flex items-center gap-2.5">
          <Link href="/my-team" className="btn-glass text-sm px-4 py-2">
            My team
          </Link>

          <div className="relative" style={{ zIndex: 100 }}>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer group">
                <Image
                  src={user?.profileimage ?? '/default-profile.png'}
                  height={36}
                  width={36}
                  alt="profile"
                  priority
                  className="rounded-xl border border-white/15 object-cover transition-all group-hover:border-violet-400/50 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content glass rounded-xl w-44 p-1.5 shadow-2xl mt-2.5"
              >
                <li>
                  <Link
                    href="/my-profile"
                    className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                  >
                    My profile
                  </Link>
                </li>
                <div className="glass-divider mx-2" />
                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92vw] p-1.5 flex justify-between items-center glass rounded-2xl z-10">
        {[
          { path: '/my-team', icon: UsersIcon, label: 'My team' },
          { path: '/', icon: HomeIcon, label: 'Home' },
        ].map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => router.push(path)}
            className={`flex flex-col items-center justify-center flex-1 h-14 rounded-xl transition-all duration-200 ${
              pathname === path
                ? 'bg-white/12 border border-violet-400/25 shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                : 'hover:bg-white/6'
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-colors ${
                pathname === path ? 'text-white' : 'text-white/55'
              }`}
            />
            <span
              className={`text-[10px] font-medium mt-1 transition-colors ${
                pathname === path ? 'text-white/90' : 'text-white/50'
              }`}
            >
              {label}
            </span>
          </button>
        ))}

        <div className="relative flex-1 flex justify-center">
          <div className="dropdown dropdown-top dropdown-end">
            <div
              tabIndex={0}
              className="flex flex-col items-center justify-center h-14 rounded-xl hover:bg-white/6 transition-all px-4"
            >
              <Image
                src={user?.profileimage ?? session.user?.image ?? '/default-profile.png'}
                height={30}
                width={30}
                className="rounded-lg border border-white/15 object-cover"
                alt="profile"
              />
              <span className="text-[10px] font-medium text-white/50 mt-1">
                {(user?.firstname || session.user?.name)?.split(' ')[0]}
              </span>
            </div>
            <ul className="dropdown-content glass p-1.5 rounded-xl w-36 z-50">
              <li>
                <Link
                  href="/my-profile"
                  className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                >
                  My profile
                </Link>
              </li>
              <div className="glass-divider mx-2" />
              <li>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-3 py-2 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
