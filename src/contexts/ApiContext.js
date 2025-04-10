'use client'

import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

const ApiRoutesContext = createContext()

export const ApiRoutesProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState({})
  const [scrumtabs, setScrumtabs] = useState([])

  useEffect(() => {
    if (!session || status !== 'authenticated') return

    const fetchData = async () => {
      try {
        const [userRes, scrumtabRes] = await Promise.all([
          fetch(`api/get-user?email=${session.user.email}`),
          fetch('/api/get-scrumtabs'),
        ])

        const userData = await userRes.json()
        const scrumtabData = await scrumtabRes.json()

        setUser(userData)
        setScrumtabs(scrumtabData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [session, status])

  return (
    <ApiRoutesContext.Provider value={{ user, scrumtabs }}>
      {children}
    </ApiRoutesContext.Provider>
  )
}

export const useApiRoutes = () => useContext(ApiRoutesContext)
