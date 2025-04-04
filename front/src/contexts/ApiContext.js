'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ApiRoutesContext = createContext()

export const ApiRoutesProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [scrumSteps, setScrumSteps] = useState([])

  const NEXT_PUBLIC_API_URL = 'https://taskom-back-production.up.railway.app'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, scrumStepsRes] = await Promise.all([
          fetch(NEXT_PUBLIC_API_URL + '/get-users'),
          fetch(NEXT_PUBLIC_API_URL + '/get-scrumsteps'),
        ])

        const usersData = await usersRes.json()
        const scrumStepsData = await scrumStepsRes.json()

        setUsers(usersData)
        setScrumSteps(scrumStepsData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <ApiRoutesContext.Provider value={{ users, scrumSteps }}>
      {children}
    </ApiRoutesContext.Provider>
  )
}

export const useApiRoutes = () => useContext(ApiRoutesContext)
