'use client'

import ScrumTab from '@/src/components/ScrumTab'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import React from 'react'

type Props = object

const Index = ({}: Props) => {
  const scrumTabs: ScrumTabType[] = []

  return (
    <div className="grid grid-cols-1">
      <select
        defaultValue="Pick a scrum tab"
        className="select select-sm mx-auto mt-4 mb-2"
      >
        <option disabled={true}>Select Scrum tab</option>
        {scrumTabs.map((scrumTab: ScrumTabType) => (
          <option key={scrumTab.id} value={scrumTab.id}>
            {scrumTab.title}
          </option>
        ))}
      </select>
      <ScrumTab />
    </div>
  )
}

export default Index
