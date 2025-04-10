'use client'

import ScrumTab from '@/src/components/ScrumTab'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import React from 'react'

type Props = object

const Index = ({}: Props) => {
  const { scrumtabs } = useApiRoutes()

  return (
    <div className="grid grid-cols-1">
      <select
        defaultValue="Pick a scrum tab"
        className="select bg-[#F2F0EF] border-transparent shadow-lg rounded-2xl mx-auto mt-4 mb-2"
      >
        <option disabled={true}>Select Scrum tab</option>
        {scrumtabs.map((scrumTab: ScrumTabType) => (
          <option key={scrumTab.idscrumtab} value={scrumTab.idscrumtab}>
            {scrumTab.title}
          </option>
        ))}
      </select>
      <ScrumTab />
    </div>
  )
}

export default Index
