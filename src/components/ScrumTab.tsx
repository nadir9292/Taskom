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
import { PencilSquareIcon } from '@heroicons/react/24/outline'
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
        data: {
          iduser: iduser,
          sprintid: sprintSelected?.idsprint,
        },
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
        className="carousel carousel-center w-full space-x-4 mt-2 px-4"
        style={{ height: 'calc(100vh - 140px)' }}
      >
        {[...scrumSteps]
          .sort((a, b) => a.order - b.order)
          .map((step: ScrumStepType) => (
            <div
              key={step.idscrumstep}
              className="grid grid-cols-1 h-fit carousel-item bg-white/30 rounded-3xl shadow-sm p-4 w-[85vw] md:w-56 overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              <div className="flex justify-between items-center w-full">
                <p className="font-medium ml-1 uppercase">{step.title}</p>
                <PencilSquareIcon height={20} width={20} />
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
