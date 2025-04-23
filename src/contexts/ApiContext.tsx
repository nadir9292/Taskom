'use client'

import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import { SprintType } from '@/src/types/SprintType'
import { UserType } from '@/src/types/UserType'
import { useSession } from 'next-auth/react'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

type ApiRoutesContextType = {
  user: UserType
  scrumtabs: {
    scrumtabs: ScrumTabType[]
    scrumsteps: ScrumStepType[]
    sprints: SprintType[]
  }
  myTeam: UserType[]
  refreshData: () => void
}

const ApiRoutesContext = createContext<ApiRoutesContextType | undefined>(
  undefined
)

type ApiRoutesProviderProps = {
  children: ReactNode
}

export const ApiRoutesProvider = ({ children }: ApiRoutesProviderProps) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserType>({})
  const [scrumtabs, setScrumtabs] = useState<{
    scrumtabs: ScrumTabType[]
    scrumsteps: ScrumStepType[]
    sprints: SprintType[]
  }>({ scrumtabs: [], scrumsteps: [], sprints: [] })
  const [myTeam, setMyTeam] = useState<UserType[]>([])

  useEffect(() => {
    if (!session || status !== 'authenticated') return
    let isMounted = true

    const fetchAllData = async () => {
      try {
        const userRes = await fetch(
          `/api/get-user?email=${session.user?.email}`
        )
        const userData: UserType = await userRes.json()

        if (!isMounted) return
        setUser(userData)

        if (userData?.idteam) {
          const [teamRes, scrumtabRes] = await Promise.all([
            fetch(`/api/get-my-team?idteam=${userData.idteam}`),
            fetch(`/api/get-scrumtabs?idteam=${userData.idteam}`),
          ])

          const [teamData, scrumtabData] = await Promise.all([
            teamRes.json(),
            scrumtabRes.json(),
          ])

          if (!isMounted) return
          setMyTeam(teamData)
          setScrumtabs(scrumtabData)
        }
      } catch (error) {
        console.error('fetchAllData error:', error)
      }
    }

    fetchAllData()

    return () => {
      isMounted = false
    }
  }, [session, status])

  const refreshData = async () => {
    try {
      if (!session) return
      const userRes = await fetch(`/api/get-user?email=${session.user?.email}`)
      const userData: UserType = await userRes.json()
      setUser(userData)

      if (userData?.idteam) {
        const [teamRes, scrumtabRes] = await Promise.all([
          fetch(`/api/get-my-team?idteam=${userData.idteam}`),
          fetch(`/api/get-scrumtabs?idteam=${userData.idteam}`),
        ])
        const [teamData, scrumtabData] = await Promise.all([
          teamRes.json(),
          scrumtabRes.json(),
        ])

        setMyTeam(teamData)
        setScrumtabs(scrumtabData)
      }
    } catch (err) {
      console.error('refreshData error', err)
    }
  }

  return (
    <ApiRoutesContext.Provider value={{ user, scrumtabs, myTeam, refreshData }}>
      {children}
    </ApiRoutesContext.Provider>
  )
}

export const useApiRoutes = (): ApiRoutesContextType => {
  const context = useContext(ApiRoutesContext)
  if (!context) {
    throw new Error('useApiRoutes must be used within an ApiRoutesProvider')
  }
  return context
}
