'use client'

import { SprintType } from '@/src/types/SprintType'
import { createContext, ReactNode, useContext, useState } from 'react'

type SelectedContextType = {
  sprintSelected: SprintType | undefined
  setSprintSelected: React.Dispatch<
    React.SetStateAction<SprintType | undefined>
  >
}

const SelectedContext = createContext<SelectedContextType | undefined>(
  undefined
)

type SelectedContextProviderProps = {
  children: ReactNode
}

export const SelectedProvider = ({
  children,
}: SelectedContextProviderProps) => {
  const [sprintSelected, setSprintSelected] = useState<SprintType | undefined>()

  return (
    <SelectedContext.Provider value={{ sprintSelected, setSprintSelected }}>
      {children}
    </SelectedContext.Provider>
  )
}

export const useSelectContext = (): SelectedContextType => {
  const context = useContext(SelectedContext)
  if (!context) {
    throw new Error('selectedContext must be used within a SelectedProvider')
  }
  return context
}
