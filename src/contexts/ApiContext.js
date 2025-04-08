'use client'

import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

const ApiRoutesContext = createContext()

export const ApiRoutesProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!session || status !== 'authenticated') return

    const fetchData = async () => {
      try {
        const [userRes] = await Promise.all([
          fetch(`api/get-user?email=${session.user.email}`),
        ])

        const userData = await userRes.json()

        setUser(userData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [session, status])

  return (
    <ApiRoutesContext.Provider value={{ user }}>
      {children}
    </ApiRoutesContext.Provider>
  )
}

export const useApiRoutes = () => useContext(ApiRoutesContext)
