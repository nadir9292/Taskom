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

  if (!mounted || !session || status !== 'authenticated') {
    return null
  }

  return (
    <>
      {windowWidth >= 600 ? (
        <>
          <div className=" w-[95vw] mx-auto navbar rounded-[22px] mt-4 shadow-lg bg-white/50 ">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl">
                Taskom
              </Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal items-center text-xs md:text-xl">
                <button className="btn btn-ghost">My team</button>
                <li style={{ zIndex: 100 }}>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="font-bold flex items-center"
                    >
                      <Image
                        src={
                          user?.profileimage
                            ? user.profileimage
                            : '/default-profile.png'
                        }
                        height={40}
                        width={40}
                        alt="profile image"
                        priority
                        className="rounded-[22px]"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-white/80 backdrop-blur-lg rounded-[22px] w-52 p-2 shadow-xl"
                    >
                      <li>
                        <button className="font-bold">My profile</button>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut()}
                          className="text-error font-bold"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95vw] p-2 flex justify-between gap-6 bg-white/50 rounded-[22px] shadow-lg z-10">
          {[
            { path: '/my-team', icon: UsersIcon, label: 'My team' },
            { path: '/', icon: HomeIcon, label: 'Home' },
          ].map(({ path, icon: Icon, label }) => (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex flex-col items-center justify-center w-28 h-16 rounded-[22px] transition-all ${
                pathname === path ? 'bg-[#ebe2e28d]' : ''
              }`}
            >
              <Icon className="w-7 h-7 text-gray-700" />
              <span className="text-xs font-medium text-gray-800 mt-1">
                {label}
              </span>
            </button>
          ))}

          <div className="relative">
            <div tabIndex={0} className="dropdown dropdown-top dropdown-end">
              <div className="flex flex-col items-center justify-center w-28 h-16 rounded-[22px] transition-all">
                <Image
                  src={session.user?.image || '/default-profile.png'}
                  height={36}
                  width={36}
                  className="rounded-xl"
                  alt="image profile"
                />
                <span className="text-xs font-medium text-gray-800 mt-1">
                  {session.user?.name?.split(' ')[0]}
                </span>
              </div>
              <ul className="dropdown-content menu p-2 shadow bg-zinc-50 rounded-[22px] w-40 z-50 font-bold">
                <li>
                  <p>My profile</p>
                </li>
                <li>
                  <p onClick={() => signOut()} className="text-error">
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
