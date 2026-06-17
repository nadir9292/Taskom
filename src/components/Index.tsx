'use client'

import React, { useEffect, useState } from 'react'
import CreateScrumTabModal from '@/src/components/modal/CreateScrumTabModal'
import EditBoardModal from '@/src/components/modal/EditBoardModal'
import ScrumTab from '@/src/components/ScrumTab'
import StatsBar from '@/src/components/StatsBar'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { SprintType } from '@/src/types/SprintType'
import { UserType } from '@/src/types/UserType'
import {
  ChevronDownIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'framer-motion'
import { containerOnAppear } from '@/src/motion-tools/onAppear'
import SprintDetails from '@/src/components/modal/SprintDetails'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import axios from 'axios'
import ConfirmDelete from '@/src/components/modal/ConfirmDelete'

type Props = { user: UserType }

const Index = ({ user }: Props) => {
  const { scrumtabs, refreshData, myTeam } = useApiRoutes()
  const [selectedTabId, setSelectedTabId] = useState<number | undefined>()
  const [selectedTab, setSelectedTab] = useState<ScrumTabType | undefined>()
  const [selectedSteps, setSelectedSteps] = useState<ScrumStepType[]>([])
  const [isOpenDisclosure, setIsOpenDisclosure] = useState(true)
  const [isOpenModalCreateScrumtab, setIsOpenModalCreateScrumtab] = useState(false)
  const [isEditingBoardName, setIsEditingBoardName] = useState(false)
  const [boardNameInput, setBoardNameInput] = useState('')
  const [isOpenEditSteps, setIsOpenEditSteps] = useState(false)
  const [isConfirmDeleteBoard, setIsConfirmDeleteBoard] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [filterQuery, setFilterQuery] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [filterMember, setFilterMember] = useState('')
  const { isOpenSprintDetails, setIsOpenSprintDetails } = useSelectContext()

  useEffect(() => {
    if (!selectedTabId || !scrumtabs?.scrumtabs) return
    const tab = scrumtabs.scrumtabs.find((t) => t.idscrumtab === selectedTabId)
    const steps = scrumtabs.scrumsteps.filter((s) => s.idscrumtab === selectedTabId)
    setSelectedTab(tab)
    setSelectedSteps(steps)
    setIsOpenDisclosure(false)
  }, [selectedTabId, scrumtabs?.scrumtabs, scrumtabs?.scrumsteps])

  useEffect(() => {
    if (scrumtabs.scrumtabs.length > 0 && !selectedTabId) {
      setSelectedTabId(scrumtabs.scrumtabs[0].idscrumtab)
    }
  }, [scrumtabs.scrumtabs])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTabId(Number(e.target.value))
  }

  const saveRenameBoard = async () => {
    if (!selectedTabId || !boardNameInput.trim()) return
    try {
      await axios.patch('/api/update-scrumtab', { idscrumtab: selectedTabId, title: boardNameInput.trim() })
      await refreshData()
    } catch {}
    setIsEditingBoardName(false)
  }

  const deleteBoard = async () => {
    if (!selectedTabId) return
    try {
      await axios.delete('/api/update-scrumtab', { data: { idscrumtab: selectedTabId } })
      setSelectedTabId(undefined)
      setSelectedTab(undefined)
      setSelectedSteps([])
      await refreshData()
    } catch {}
  }

  const allTags = [...new Set(scrumtabs.sprints.map((s: SprintType) => s.tag).filter(Boolean))] as string[]
  const hasFilter = filterQuery || filterTag || filterMember

  const boardSprints = scrumtabs.sprints.filter((s: SprintType) =>
    selectedSteps.some((step) => step.idscrumstep === s.idscrumstep)
  )

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
            <motion.div
              animate={{ rotate: isOpenDisclosure ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpenDisclosure && (
              <motion.div
                key="disclosure"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mx-auto mt-2 px-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isEditingBoardName ? (
                      <div className="flex items-center gap-2">
                        <input
                          autoFocus
                          value={boardNameInput}
                          onChange={(e) => setBoardNameInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveRenameBoard()
                            if (e.key === 'Escape') setIsEditingBoardName(false)
                          }}
                          className="glass-input w-48 text-sm"
                        />
                        <button onClick={saveRenameBoard} className="btn-glass py-2 px-3 text-xs">Save</button>
                        <button onClick={() => setIsEditingBoardName(false)} className="p-2 rounded-lg hover:bg-white/8 transition-colors">
                          <XMarkIcon className="w-4 h-4 text-white/50" />
                        </button>
                      </div>
                    ) : (
                      <select
                        onChange={handleSelectChange}
                        value={selectedTabId ?? ''}
                        className="glass-input w-48 text-sm"
                      >
                        <option value="" disabled>Select board</option>
                        {scrumtabs?.scrumtabs.map((tab) => (
                          <option key={tab.idscrumtab} value={tab.idscrumtab}>{tab.title}</option>
                        ))}
                      </select>
                    )}

                    {selectedTab && !isEditingBoardName && (
                      <>
                        <button
                          onClick={() => {
                            setBoardNameInput(selectedTab.title ?? '')
                            setIsEditingBoardName(true)
                          }}
                          className="p-2 rounded-lg hover:bg-white/8 transition-colors"
                          title="Rename board"
                        >
                          <PencilSquareIcon className="w-4 h-4 text-white/50 hover:text-white/80" />
                        </button>
                        <button
                          onClick={() => setIsOpenEditSteps(true)}
                          className="p-2 rounded-lg hover:bg-white/8 transition-colors"
                          title="Edit steps"
                        >
                          <Cog6ToothIcon className="w-4 h-4 text-white/50 hover:text-white/80" />
                        </button>
                        <button
                          onClick={() => setIsConfirmDeleteBoard(true)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                          title="Delete board"
                        >
                          <TrashIcon className="w-4 h-4 text-red-400/50 hover:text-red-400" />
                        </button>
                      </>
                    )}

                    <button
                      className="btn-glass flex items-center gap-1.5 py-2 px-3"
                      onClick={() => setIsOpenModalCreateScrumtab(true)}
                    >
                      <PlusIcon className="w-4 h-4" />
                      New board
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {selectedTab && (
            <>
              <div className="flex items-center gap-2 px-4 mt-3">
                <div className="flex items-center gap-2 flex-1 glass-card rounded-xl px-3 py-2">
                  <MagnifyingGlassIcon className="w-3.5 h-3.5 text-white/40 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search sprints…"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="bg-transparent text-sm text-white/80 placeholder:text-white/30 outline-none flex-1 min-w-0"
                  />
                  {filterQuery && (
                    <button onClick={() => setFilterQuery('')}>
                      <XMarkIcon className="w-3.5 h-3.5 text-white/40 hover:text-white/70" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowFilter((p) => !p)}
                  className={`p-2.5 rounded-xl transition-colors ${
                    hasFilter
                      ? 'bg-violet-500/25 text-violet-300 border border-violet-400/30'
                      : 'glass-card text-white/50 hover:text-white/80'
                  }`}
                >
                  <FunnelIcon className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence>
                {showFilter && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden px-4 mt-2"
                  >
                    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                      <select
                        value={filterTag}
                        onChange={(e) => setFilterTag(e.target.value)}
                        className="glass-input text-sm py-1.5"
                      >
                        <option value="">All tags</option>
                        {allTags.map((tag) => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                      <select
                        value={filterMember}
                        onChange={(e) => setFilterMember(e.target.value)}
                        className="glass-input text-sm py-1.5"
                      >
                        <option value="">All members</option>
                        {myTeam.map((m) => (
                          <option key={m.iduser} value={m.iduser}>
                            {m.firstname} {m.lastname?.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      {hasFilter && (
                        <button
                          onClick={() => { setFilterQuery(''); setFilterTag(''); setFilterMember('') }}
                          className="col-span-2 sm:col-auto btn-glass py-1.5 px-3 text-xs"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <StatsBar sprints={boardSprints} scrumsteps={selectedSteps} />

              <ScrumTab
                scrumSteps={selectedSteps}
                sprints={scrumtabs.sprints}
                iduser={user.iduser!}
                filter={{ query: filterQuery, tag: filterTag, member: filterMember }}
              />
            </>
          )}
        </div>
      </motion.div>

      <CreateScrumTabModal
        user={user}
        closeCreateModal={() => setIsOpenModalCreateScrumtab(false)}
        isOpen={isOpenModalCreateScrumtab}
      />
      {selectedTab && (
        <EditBoardModal
          idscrumtab={selectedTab.idscrumtab}
          idteam={user.idteam!}
          currentSteps={selectedSteps}
          isOpen={isOpenEditSteps}
          closeModal={() => setIsOpenEditSteps(false)}
        />
      )}
      <ConfirmDelete
        isOpen={isConfirmDeleteBoard}
        closeCreateModal={() => setIsConfirmDeleteBoard(false)}
        confirmDeletion={deleteBoard}
        title="Delete this board?"
        description="All steps and sprints in this board will be permanently deleted."
        confirmLabel="Delete board"
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
