'use client'

import { SprintType } from '@/src/types/SprintType'
import { createContext, ReactNode, useContext, useState } from 'react'

type SelectedContextType = {
  sprintSelected: SprintType | undefined
  setSprintSelected: React.Dispatch<
    React.SetStateAction<SprintType | undefined>
  >
  isOpenSprintDetails: boolean
  setIsOpenSprintDetails: React.Dispatch<React.SetStateAction<boolean>>
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
  const [sprintSelected, setSprintSelected] = useState<SprintType | undefined>(
    undefined
  )
  const [isOpenSprintDetails, setIsOpenSprintDetails] = useState<boolean>(false)

  return (
    <SelectedContext.Provider
      value={{
        sprintSelected,
        setSprintSelected,
        isOpenSprintDetails,
        setIsOpenSprintDetails,
      }}
    >
      {children}
    </SelectedContext.Provider>
  )
}

export const useSelectContext = (): SelectedContextType => {
  const context = useContext(SelectedContext)
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectedProvider')
  }
  return context
}
