'use client'

import ConfirmDelete from '@/src/components/modal/ConfirmDelete'
import CreateSprint from '@/src/components/modal/CreateSprint'
import Sprints from '@/src/components/Sprints'
import SnackBar from '@/src/components/utils/SnackBar'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { SprintType } from '@/src/types/SprintType'
import axios from 'axios'
import React, { useState } from 'react'

type Props = {
  scrumSteps: ScrumStepType[]
  sprints: SprintType[]
  iduser: number
}

const ScrumTab = ({ scrumSteps, sprints, iduser }: Props) => {
  const { refreshData } = useApiRoutes()
  const { sprintSelected } = useSelectContext()
  const [isOpenModalCreateSprint, setIsOpenModalCreateSprint] =
    useState<boolean>(false)
  const [openConfirmeMessage, setOpenConfirmeMessage] = useState<boolean>(false)
  const [snackBar, setSnackBar] = useState<{
    error: SnackBarStatus
    success: SnackBarStatus
  }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })

  const resetSnackBar = () => {
    setTimeout(() => {
      setSnackBar({
        error: { active: false, message: null },
        success: { active: false, message: null },
      })
    }, 3000)
  }

  const deleteSprint = async () => {
    try {
      await axios.delete('/api/delete-sprint', {
        data: { iduser, sprintid: sprintSelected?.idsprint },
      })
      await refreshData()
      setSnackBar((prev) => ({
        ...prev,
        success: { message: 'Sprint deleted.', active: true },
      }))
      resetSnackBar()
    } catch (error) {
      setSnackBar((prev) => ({
        ...prev,
        error: { message: 'Failed to delete sprint.', active: true },
      }))
      resetSnackBar()
      console.error('Erreur lors de la suppression du sprint', error)
    }
  }

  return (
    <>
      <div
        className="carousel carousel-center w-full space-x-3 mt-3 px-4"
        style={{ height: 'calc(100vh - 140px)' }}
      >
        {[...scrumSteps]
          .sort((a, b) => a.order - b.order)
          .map((step: ScrumStepType) => (
            <div
              key={step.idscrumstep}
              className="carousel-item glass rounded-2xl p-4 w-[85vw] md:w-60 overflow-y-auto flex flex-col"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                  {step.title}
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/8 text-white/40 border border-white/10">
                  {sprints.filter((s) => s.idscrumstep === step.idscrumstep).length}
                </span>
              </div>
              <Sprints
                sprints={sprints}
                idscrumstep={step.idscrumstep}
                openCreateModal={() => setIsOpenModalCreateSprint(true)}
                openConfirmDeleteSprint={() => setOpenConfirmeMessage(true)}
              />
            </div>
          ))}
      </div>

      <CreateSprint
        idUser={iduser}
        scrumsteps={scrumSteps}
        isOpen={isOpenModalCreateSprint}
        closeCreateModal={() => setIsOpenModalCreateSprint(false)}
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
