'use client'

import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

const ApiRoutesContext = createContext()

export const ApiRoutesProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState({})
  const [scrumtabs, setScrumtabs] = useState([])
  const [myTeam, setMyTeam] = useState([])

  useEffect(() => {
    if (!session || status !== 'authenticated') return

    const fetchUserAndScrumtabs = async () => {
      try {
        const [userRes, scrumtabRes] = await Promise.all([
          fetch(`/api/get-user?email=${session.user.email}`),
          fetch('/api/get-scrumtabs'),
        ])

        const userData = await userRes.json()
        const scrumtabData = await scrumtabRes.json()

        setUser(userData)
        setScrumtabs(scrumtabData)

        if (userData.idteam) {
          const teamRes = await fetch(
            `/api/get-my-team?idteam=${userData.idteam}`
          )
          const teamData = await teamRes.json()
          setMyTeam(teamData)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserAndScrumtabs()
  }, [session, status])

  return (
    <ApiRoutesContext.Provider value={{ user, scrumtabs, myTeam }}>
      {children}
    </ApiRoutesContext.Provider>
  )
}

export const useApiRoutes = () => useContext(ApiRoutesContext)
