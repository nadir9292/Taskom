'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ApiRoutesContext = createContext()

export const ApiRoutesProvider = ({ children }) => {
  const [routes, setRoutes] = useState([])
  const NEXT_PUBLIC_API_URL = 'https://taskom-back-production.up.railway.app'

  useEffect(() => {
    fetch(NEXT_PUBLIC_API_URL + '/get-scrumtabs')
      .then((res) => res.json())
      .then(setRoutes)
      .catch(console.error)
  }, [])

  return (
    <ApiRoutesContext.Provider value={{ routes }}>
      {children}
    </ApiRoutesContext.Provider>
  )
}

export const useApiRoutes = () => useContext(ApiRoutesContext)
