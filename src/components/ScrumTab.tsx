'use client'

import CreateSprint from '@/src/components/modal/CreateSprint'
import Sprints from '@/src/components/Sprints'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { SprintType } from '@/src/types/SprintType'
import React, { useState } from 'react'

type Props = {
  scrumSteps: ScrumStepType[]
  sprints: SprintType[]
  iduser: number
}

const ScrumTab = ({ scrumSteps, sprints, iduser }: Props) => {
  const [isOpenModalCreateSprint, setIsOpenModalCreateSprint] =
    useState<boolean>(false)

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
    </>
  )
}

export default ScrumTab
