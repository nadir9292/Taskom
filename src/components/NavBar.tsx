'use client'

import { useApiRoutes } from '@/src/contexts/ApiContext'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const NavBar = () => {
  const { user } = useApiRoutes()
  const [userName, setUserName] = useState<string>('')
  const { data: session, status } = useSession()

  useEffect(() => {
    setUserName(user?.firstname ? user.firstname : '')
  }, [user])

  if (!session || status !== 'authenticated') {
    return null
  }

  return (
    <div
      className="navbar rounded-4xl mt-4 bg-[#F2F0EF] shadow-xl w-[95vw] mx-auto text-[#0e1111]"
      style={{ zIndex: 100 }}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Taskom</a>
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
                {userName}
                <Image
                  src={
                    user.profileimage
                      ? user.profileimage
                      : '/default-profile.png'
                  }
                  height={35}
                  width={35}
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
    </div>
  )
}

export default NavBar
