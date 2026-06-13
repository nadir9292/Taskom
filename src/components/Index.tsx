'use client'

import React, { useEffect, useState } from 'react'
import CreateScrumTabModal from '@/src/components/modal/CreateScrumTabModal'
import ScrumTab from '@/src/components/ScrumTab'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import { UserType } from '@/src/types/UserType'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline'
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
            className="flex items-center mx-auto mt-4 text-white/50 hover:text-white/80 transition-colors"
          >
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                isOpenDisclosure ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpenDisclosure && (
            <div className="mx-auto mt-2">
              <div className="flex items-center gap-2">
                <select
                  onChange={handleSelectChange}
                  value={selectedTabId ?? ''}
                  className="glass-input w-48 text-sm"
                >
                  <option value="" disabled>
                    Select board
                  </option>
                  {scrumtabs?.scrumtabs.map((tab) => (
                    <option key={tab.idscrumtab} value={tab.idscrumtab}>
                      {tab.title}
                    </option>
                  ))}
                </select>
                <button
                  className="btn-glass flex items-center gap-1.5 py-2 px-3"
                  onClick={() => setIsOpenModalCreateScrumtab(true)}
                >
                  <PlusIcon className="w-4 h-4" />
                  New board
                </button>
              </div>
            </div>
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
