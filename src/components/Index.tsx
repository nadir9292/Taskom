'use client'

import React, { useEffect, useState } from 'react'
import CreateScrumTabModal from '@/src/components/modal/CreateScrumTabModal'
import ScrumTab from '@/src/components/ScrumTab'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import { UserType } from '@/src/types/UserType'
import { ScrumStepType } from '@/src/types/ScrumStepType'

type Props = { user: UserType }

const Index = ({ user }: Props) => {
  const { scrumtabs } = useApiRoutes()
  const [selectedTabId, setSelectedTabId] = useState<number | undefined>()
  const [selectedTab, setSelectedTab] = useState<ScrumTabType | undefined>()
  const [selectedSteps, setSelectedSteps] = useState<ScrumStepType[]>()

  useEffect(() => {
    if (!selectedTabId || !scrumtabs?.scrumtabs) return

    const tab = scrumtabs.scrumtabs.find(
      (tab) => tab.idscrumtab === selectedTabId
    )

    const step = scrumtabs.scrumsteps.filter(
      (step) => step.idscrumtab === selectedTabId
    )

    setSelectedTab(tab)
    setSelectedSteps(step)
  }, [selectedTabId, scrumtabs?.scrumtabs, scrumtabs?.scrumsteps])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTabId(Number(e.target.value))
  }

  return (
    <div className="grid grid-cols-1 mx-auto">
      <div className="flex flex-wrap gap-2 max-w-2xl mt-6 mb-2 mx-auto">
        <select
          onChange={handleSelectChange}
          value={selectedTabId ?? ''}
          className="flex-1 min-w-[200px] select bg-white/50 backdrop-blur-lg border-transparent shadow-lg rounded-[22px]"
        >
          <option value="" disabled>
            Select Scrum tab
          </option>
          {scrumtabs?.scrumtabs.map((tab) => (
            <option key={tab.idscrumtab} value={tab.idscrumtab}>
              {tab.title}
            </option>
          ))}
        </select>
        <div className="flex-1 min-w-[150px]">
          <CreateScrumTabModal user={user} />
        </div>
      </div>
      {selectedTab && (
        <ScrumTab
          scrumtab={selectedTab}
          scrumSteps={selectedSteps!}
          sprints={scrumtabs.sprints!}
          iduser={user.iduser!}
        />
      )}
    </div>
  )
}

export default Index
