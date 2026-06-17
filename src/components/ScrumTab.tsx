'use client'

import ConfirmDelete from '@/src/components/modal/ConfirmDelete'
import CreateSprint from '@/src/components/modal/CreateSprint'
import EditSprint from '@/src/components/modal/EditSprint'
import Sprints from '@/src/components/Sprints'
import SnackBar from '@/src/components/utils/SnackBar'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { SprintType } from '@/src/types/SprintType'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { columnOnAppear } from '@/src/motion-tools/onAppear'

type Props = {
  scrumSteps: ScrumStepType[]
  sprints: SprintType[]
  iduser: number
  filter?: { query: string; tag: string; member: string }
}

const ScrumTab = ({ scrumSteps, sprints, iduser, filter }: Props) => {
  const { refreshData } = useApiRoutes()
  const { sprintSelected } = useSelectContext()
  const [isOpenModalCreateSprint, setIsOpenModalCreateSprint] = useState(false)
  const [isOpenModalEditSprint, setIsOpenModalEditSprint] = useState(false)
  const [openConfirmeMessage, setOpenConfirmeMessage] = useState(false)
  const [snackBar, setSnackBar] = useState<{ error: SnackBarStatus; success: SnackBarStatus }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })
  const draggedSprintRef = useRef<SprintType | null>(null)

  const sortedSteps = [...scrumSteps].sort((a, b) => a.order - b.order)
  const lastStepId = sortedSteps[sortedSteps.length - 1]?.idscrumstep

  const resetSnackBar = () => {
    setTimeout(() => {
      setSnackBar({ error: { active: false, message: null }, success: { active: false, message: null } })
    }, 3000)
  }

  const deleteSprint = async () => {
    try {
      await axios.delete('/api/delete-sprint', {
        data: { iduser, sprintid: sprintSelected?.idsprint },
      })
      await refreshData()
      setSnackBar((prev) => ({ ...prev, success: { message: 'Sprint deleted.', active: true } }))
      resetSnackBar()
    } catch {
      setSnackBar((prev) => ({ ...prev, error: { message: 'Failed to delete sprint.', active: true } }))
      resetSnackBar()
    }
  }

  const handleDrop = async (targetStepId: number) => {
    const sprint = draggedSprintRef.current
    if (!sprint || sprint.idscrumstep === targetStepId) return
    if (targetStepId === lastStepId) return
    const fromStep = scrumSteps.find((s) => s.idscrumstep === sprint.idscrumstep)
    const toStep = scrumSteps.find((s) => s.idscrumstep === targetStepId)
    try {
      await axios.post('/api/update-step-sprint', {
        idsprint: sprint.idsprint,
        idStep: targetStepId,
        fromTitle: fromStep?.title,
        toTitle: toStep?.title,
      })
      await refreshData()
    } catch {
      setSnackBar((prev) => ({ ...prev, error: { message: 'Failed to move sprint.', active: true } }))
      resetSnackBar()
    } finally {
      draggedSprintRef.current = null
    }
  }

  const filterSprints = (stepSprints: SprintType[]) => {
    if (!filter) return stepSprints
    return stepSprints.filter((s) => {
      const q = filter.query.toLowerCase()
      const matchQuery =
        !q ||
        s.title?.toLowerCase().includes(q) ||
        s.shortdescription?.toLowerCase().includes(q) ||
        s.tag?.toLowerCase().includes(q)
      const matchTag = !filter.tag || s.tag === filter.tag
      const matchMember =
        !filter.member ||
        s.members?.includes(Number(filter.member)) ||
        s.iduseraffected === Number(filter.member)
      return matchQuery && matchTag && matchMember
    })
  }

  return (
    <>
      <div className="carousel carousel-center w-full space-x-3 mt-4 px-4 pb-2 h-[calc(100vh-260px)] sm:h-[calc(100vh-190px)]">
        {sortedSteps
          .map((step: ScrumStepType, index: number) => {
            const isClosed = step.idscrumstep === lastStepId
            const filtered = filterSprints(sprints.filter((s) => s.idscrumstep === step.idscrumstep))
            return (
              <motion.div
                key={step.idscrumstep}
                custom={index}
                variants={columnOnAppear}
                initial="hidden"
                animate="visible"
                className={`carousel-item rounded-2xl p-4 w-[88vw] sm:w-64 overflow-y-auto flex flex-col max-h-[calc(100vh-330px)] sm:max-h-[calc(100vh-250px)] ${
                  isClosed
                    ? 'border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl'
                    : 'glass-col'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <p className={`text-xs font-semibold uppercase tracking-widest ${isClosed ? 'text-emerald-400/80' : 'text-white/80'}`}>
                    {step.title}
                  </p>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium tabular-nums ${
                    isClosed
                      ? 'bg-emerald-500/15 text-emerald-400/70 border-emerald-500/25'
                      : 'bg-white/10 text-white/60 border-white/12'
                  }`}>
                    {filtered.length}
                  </span>
                </div>
                <div className="glass-divider -mx-1 mb-3" />
                <Sprints
                  sprints={filtered}
                  idscrumstep={step.idscrumstep}
                  isClosed={isClosed}
                  openCreateModal={() => setIsOpenModalCreateSprint(true)}
                  openConfirmDeleteSprint={() => setOpenConfirmeMessage(true)}
                  openEditModal={() => setIsOpenModalEditSprint(true)}
                  onDragStart={(sprint) => { draggedSprintRef.current = sprint }}
                  onDrop={handleDrop}
                />
              </motion.div>
            )
          })}
      </div>

      <CreateSprint
        idUser={iduser}
        scrumsteps={scrumSteps}
        isOpen={isOpenModalCreateSprint}
        closeCreateModal={() => setIsOpenModalCreateSprint(false)}
      />
      <EditSprint
        idUser={iduser}
        scrumsteps={scrumSteps}
        isOpen={isOpenModalEditSprint}
        closeEditModal={() => setIsOpenModalEditSprint(false)}
      />
      <ConfirmDelete
        isOpen={openConfirmeMessage}
        closeCreateModal={() => setOpenConfirmeMessage(false)}
        confirmDeletion={() => deleteSprint()}
      />
      <SnackBar error={snackBar.error} success={snackBar.success} />
    </>
  )
}

export default ScrumTab
