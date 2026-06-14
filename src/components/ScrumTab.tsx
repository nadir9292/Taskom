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
  const [isOpenModalEditSprint, setIsOpenModalEditSprint] =
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
        className="carousel carousel-center w-full space-x-3 mt-4 px-4 pb-2 h-[calc(100vh-220px)] sm:h-[calc(100vh-150px)]"
      >
        {[...scrumSteps]
          .sort((a, b) => a.order - b.order)
          .map((step: ScrumStepType) => {
            const count = sprints.filter((s) => s.idscrumstep === step.idscrumstep).length
            return (
              <div
                key={step.idscrumstep}
                className="carousel-item glass-col rounded-2xl p-4 w-[88vw] sm:w-64 overflow-y-auto flex flex-col max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-210px)]"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                    {step.title}
                  </p>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/12 font-medium tabular-nums">
                    {count}
                  </span>
                </div>
                <div className="glass-divider -mx-1 mb-3" />
                <Sprints
                  sprints={sprints}
                  idscrumstep={step.idscrumstep}
                  openCreateModal={() => setIsOpenModalCreateSprint(true)}
                  openConfirmDeleteSprint={() => setOpenConfirmeMessage(true)}
                  openEditModal={() => setIsOpenModalEditSprint(true)}
                />
              </div>
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
