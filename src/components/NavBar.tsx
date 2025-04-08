'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const NavBar = () => {
  const { data: session } = useSession()
  if (!session) {
    return null
  }

  return (
    <div
      className="navbar mt-4 bg-primary-content text-base-content shadow-sm w-[95vw] mx-auto rounded-sm"
      style={{ zIndex: 100 }}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">T.O.M</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
          <li style={{ zIndex: 100 }}>
            <details>
              <summary>Parent</summary>
              <ul className="bg-primary-content rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
