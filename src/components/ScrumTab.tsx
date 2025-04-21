'use client'

import ConfirmDelete from '@/src/components/modal/ConfirmDelete'
import CreateSprint from '@/src/components/modal/CreateSprint'
import Sprints from '@/src/components/Sprints'
import SnackBar from '@/src/components/utils/SnackBar'
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
        className="carousel carousel-center w-full space-x-4 p-4"
        style={{ height: 'calc(100vh - 190px)' }}
      >
        {[...scrumSteps]
          .sort((a, b) => a.order - b.order)
          .map((step: ScrumStepType) => (
            <div
              key={step.idscrumstep}
              className="grid grid-cols-1 h-fit carousel-item bg-white/60 backdrop-blur-lg rounded-[22px] shadow-sm p-4 w-56 max-h-[620px] md:max-h-[720px] overflow-y-auto"
            >
              <div className="flex justify-between items-start w-full">
                <p className="font-medium">{step.title}</p>
                <p>...</p>
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
