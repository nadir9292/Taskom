'use client'

import React, { useEffect, useState } from 'react'
import CreateScrumTabModal from '@/src/components/modal/CreateScrumTabModal'
import ScrumTab from '@/src/components/ScrumTab'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import { UserType } from '@/src/types/UserType'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type Props = { user: UserType }

const Index = ({ user }: Props) => {
  const { scrumtabs } = useApiRoutes()
  const [selectedTabId, setSelectedTabId] = useState<number | undefined>()
  const [selectedTab, setSelectedTab] = useState<ScrumTabType | undefined>()
  const [selectedSteps, setSelectedSteps] = useState<ScrumStepType[]>()
  const [isOpenDisclosure, setIsOpenDisclosure] = useState<boolean>(true)

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
    setIsOpenDisclosure(false)
  }, [selectedTabId, scrumtabs?.scrumtabs, scrumtabs?.scrumsteps])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTabId(Number(e.target.value))
  }

  return (
    <div className="grid grid-cols-1 mx-auto">
      <button
        onClick={() => setIsOpenDisclosure((prev) => !prev)}
        className="flex items-center mx-auto italic text-sm my-2"
      >
        <span>{!isOpenDisclosure ? 'Open filter ' : ''}</span>
        <ChevronDownIcon
          className={`w-5 transition-transform ${
            isOpenDisclosure ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpenDisclosure ? (
        <div className="mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <select
              onChange={handleSelectChange}
              value={selectedTabId ?? ''}
              className="select bg-white/50 backdrop-blur-lg border-transparent shadow-lg rounded-[22px]"
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
            <div className="min-w-[150px]">
              <CreateScrumTabModal user={user} />
            </div>
          </div>
          <div className="flex justify-center filter items-center">
            <input
              className="btn filter-reset btn-sm"
              type="radio"
              name="metaframeworks"
              aria-label="All"
            />
            <input
              className="btn btn-sm"
              type="radio"
              name="metaframeworks"
              aria-label="Front"
            />
            <input
              className="btn btn-sm"
              type="radio"
              name="metaframeworks"
              aria-label="Back"
            />
            <input
              className="btn btn-sm"
              type="radio"
              name="metaframeworks"
              aria-label="Bug"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {selectedTab && (
        <ScrumTab
          scrumSteps={selectedSteps!}
          sprints={scrumtabs.sprints!}
          iduser={user.iduser!}
        />
      )}
    </div>
  )
}

export default Index
