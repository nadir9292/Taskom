'use client'

import { BackgroundGradient } from '@/src/components/ui/background-gradient'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { user } = useApiRoutes()
  const { data: session, status } = useSession()
  const pathname = usePathname()

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
          <div></div>
          <div className="w-[95vw] mt-4 mx-auto border-[#F5F5F5]">
            <BackgroundGradient className="navbar rounded-[20px] bg-[#F5F5F5] dark:bg-[#0e1111]">
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
                        className="dropdown-content menu bg-[#F5F5F5] rounded-box z-1 w-52 p-2 shadow-xl"
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
        </>
      ) : (
        <div className="fixed bottom-6 w-[95vw] mx-auto left-0 right-0">
          <BackgroundGradient className="dock dock-lg rounded-[20px] bg-[#F5F5F5] border border-[#F5F5F5]">
            <button
              className={`${
                pathname === '/my-team' ? 'bg-[#e8e6e6] scale-90' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <span className="dock-label">My team</span>
            </button>
            <button
              className={`${pathname === '/' ? 'bg-[#e8e6e6] scale-90' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <span className="dock-label">Home</span>
            </button>
            <button className="relative">
              <div className="dropdown dropdown-top dropdown-end">
                <div
                  tabIndex={0}
                  className="flex flex-col items-center justify-center w-16"
                >
                  <Image
                    src={
                      session.user?.image
                        ? session.user.image
                        : '/default-profile.png'
                    }
                    height={40}
                    width={40}
                    className="rounded-full"
                    alt="image profile"
                  />
                  <span className="dock-label">
                    {session.user?.name ? session.user.name.split(' ')[0] : ''}
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-50"
                >
                  <li>
                    <p>My profile</p>
                  </li>
                  <li>
                    <p
                      onClick={() => signOut()}
                      className="font-bold text-error"
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            </button>
          </BackgroundGradient>
        </div>
      )}
    </>
  )
}

export default NavBar
