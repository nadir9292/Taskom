'use client'

import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import { SprintType } from '@/src/types/SprintType'
import { UserType } from '@/src/types/UserType'
import { secureFetch, resetKey } from '@/src/lib/clientCrypto'
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
    resetKey()
    let isMounted = true

    const fetchAllData = async () => {
      try {
        const userData = await secureFetch<UserType>(
          `/api/get-user?email=${session.user?.email}`
        )

        if (!isMounted) return
        setUser(userData)

        if (userData?.idteam) {
          const [teamData, scrumtabData] = await Promise.all([
            secureFetch<UserType[]>(`/api/get-my-team?idteam=${userData.idteam}`),
            secureFetch<{ scrumtabs: ScrumTabType[]; scrumsteps: ScrumStepType[]; sprints: SprintType[] }>(
              `/api/get-scrumtabs?idteam=${userData.idteam}`
            ),
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
      const userData = await secureFetch<UserType>(
        `/api/get-user?email=${session.user?.email}`
      )
      setUser(userData)

      if (userData?.idteam) {
        const [teamData, scrumtabData] = await Promise.all([
          secureFetch<UserType[]>(`/api/get-my-team?idteam=${userData.idteam}`),
          secureFetch<{ scrumtabs: ScrumTabType[]; scrumsteps: ScrumStepType[]; sprints: SprintType[] }>(
            `/api/get-scrumtabs?idteam=${userData.idteam}`
          ),
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
