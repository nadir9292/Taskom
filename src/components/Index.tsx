'use client'

import React, { useEffect, useState } from 'react'
import CreateScrumTabModal from '@/src/components/modal/CreateScrumTabModal'
import ScrumTab from '@/src/components/ScrumTab'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import { UserType } from '@/src/types/UserType'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import * as motion from 'motion/react-client'
import { containerOnAppear } from '@/src/motion-tools/onAppear'
import SprintDetails from '@/src/components/modal/SprintDetails'
import { useSelectContext } from '@/src/contexts/SelectedContext'

type Props = { user: UserType }

const Index = ({ user }: Props) => {
  const { scrumtabs } = useApiRoutes()
  const [selectedTabId, setSelectedTabId] = useState<number | undefined>()
  const [selectedTab, setSelectedTab] = useState<ScrumTabType | undefined>()
  const [selectedSteps, setSelectedSteps] = useState<ScrumStepType[]>()
  const [isOpenDisclosure, setIsOpenDisclosure] = useState<boolean>(true)
  const [isOpenModalCreateScrumtab, setIsOpenModalCreateScrumtab] =
    useState<boolean>(false)
  const { isOpenSprintDetails, setIsOpenSprintDetails } = useSelectContext()

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

  useEffect(() => {
    if (scrumtabs.scrumtabs.length > 0) {
      setSelectedTabId(scrumtabs.scrumtabs[0].idscrumtab)
    }
  }, [scrumtabs.scrumtabs])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTabId(Number(e.target.value))
  }

  return (
    <>
      <motion.div
        variants={containerOnAppear}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 mx-auto">
          <button
            onClick={() => setIsOpenDisclosure((prev) => !prev)}
            className="flex items-center mx-auto italic text-sm mt-4"
          >
            <span className="font-bold text-zinc-100">
              {!isOpenDisclosure ? 'Open menu ' : ''}
            </span>
            <ChevronDownIcon
              className={`w-5 transition-transform mx-2 text-zinc-100 ${
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
                  className="select bg-white/50 border-transparent shadow-lg rounded-[22px]"
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
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsOpenModalCreateScrumtab(true)}
                  >
                    New scrum tab
                  </button>
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
      </motion.div>
      <CreateScrumTabModal
        user={user}
        closeCreateModal={() => setIsOpenModalCreateScrumtab(false)}
        isOpen={isOpenModalCreateScrumtab}
      />
      <SprintDetails
        scrumSteps={scrumtabs.scrumsteps}
        closeSprintDetails={() => setIsOpenSprintDetails(false)}
        isOpen={isOpenSprintDetails}
      />
    </>
  )
}

export default Index
