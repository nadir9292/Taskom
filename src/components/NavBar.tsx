'use client'

import { BackgroundGradient } from '@/src/components/ui/background-gradient'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { user } = useApiRoutes()
  const { data: session, status } = useSession()

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
        <div className="w-[95vw] mt-4 mx-auto">
          <BackgroundGradient className="navbar rounded-[22px] bg-[#F5F5F5] dark:bg-[#0e1111]">
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
                          user.profileimage
                            ? user.profileimage
                            : '/default-profile.png'
                        }
                        height={40}
                        width={40}
                        alt="profile image"
                        priority
                        className="ml-2 rounded-full"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-[#F2F0EF] rounded-box z-1 w-52 p-2 shadow-sm"
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
          </BackgroundGradient>
        </div>
      ) : (
        <div className="fixed bottom-4 w-[95vw] mx-auto left-0 right-0">
          <BackgroundGradient className="dock dock-lg rounded-[22px] bg-[#F5F5F5] dark:bg-[#0e1111]">
            <button>
              <UserGroupIcon height={30} />
              <span className="dock-label">My team</span>
            </button>

            <button>
              <HomeIcon height={30} />
              <span className="dock-label">Home</span>
            </button>

            <button
              tabIndex={0}
              role="button"
              className="dropdown dropdown-top dropdown-end"
            >
              <Image
                src={
                  user.profileimage ? user.profileimage : '/default-profile.png'
                }
                height={40}
                width={40}
                alt="profile image"
                priority
                className="rounded-full border-2 border-black mx-auto"
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#F2F0EF] rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <div className="font-bold">My profile</div>
                </li>
                <li>
                  <div
                    onClick={() => signOut()}
                    className="text-error font-bold"
                  >
                    Logout
                  </div>
                </li>
              </ul>
            </button>
          </BackgroundGradient>
        </div>
      )}
    </>
  )
}

export default NavBar
