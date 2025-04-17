'use client'

import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ScrumTabType } from '@/src/types/ScrumTabType'
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
  }
  myTeam: UserType[]
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
  }>({ scrumtabs: [], scrumsteps: [] })
  const [myTeam, setMyTeam] = useState<UserType[]>([])

  useEffect(() => {
    if (!session || status !== 'authenticated') return

    const fetchUserAndScrumtabs = async () => {
      try {
        const userRes = await fetch(
          `/api/get-user?email=${session?.user?.email}`
        )
        const userData: UserType = await userRes.json()
        setUser(userData)

        if (userData?.idteam) {
          const teamRes = await fetch(
            `/api/get-my-team?idteam=${userData.idteam}`
          )
          const scrumtabRes = await fetch(
            `/api/get-scrumtabs?idteam=${userData.idteam}`
          )

          const teamData: UserType[] = await teamRes.json()
          const scrumtabData: {
            scrumtabs: ScrumTabType[]
            scrumsteps: ScrumStepType[]
          } = await scrumtabRes.json()

          setMyTeam(teamData)
          setScrumtabs(scrumtabData)
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

export const useApiRoutes = (): ApiRoutesContextType => {
  const context = useContext(ApiRoutesContext)
  if (!context) {
    throw new Error('useApiRoutes must be used within an ApiRoutesProvider')
  }
  return context
}
