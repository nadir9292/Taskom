'use client'

import { useApiRoutes } from '@/src/contexts/ApiContext'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import React from 'react'

type Props = object

const Index = ({}: Props) => {
  const { scrumtabs } = useApiRoutes()
  return (
    <div className="grid grid-cols-1 items-center">
      <select
        defaultValue="Pick a scrum tab"
        className="select bg-white/50 backdrop-blur-lg border-transparent shadow-lg rounded-[22px] mx-auto mt-4 mb-2"
      >
        <option disabled={true}>Select Scrum tab</option>
        {scrumtabs.map((scrumTab: ScrumTabType) => (
          <option key={scrumTab.idscrumtab} value={scrumTab.idscrumtab}>
            {scrumTab.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Index
