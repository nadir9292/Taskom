'use client'

import CreateSprint from '@/src/components/modal/CreateSprint'
import Sprints from '@/src/components/Sprints'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import { SprintType } from '@/src/types/SprintType'
import React, { useState } from 'react'

type Props = {
  scrumtab: ScrumTabType
  scrumSteps: ScrumStepType[]
  sprints: SprintType[]
  iduser: number
}

const ScrumTab = ({ scrumtab, scrumSteps, sprints, iduser }: Props) => {
  const [isOpenModalCreateSprint, setIsOpenModalCreateSprint] =
    useState<boolean>(false)

  return (
    <>
      <div className="w-[95vw] mx-auto mt-2 rounded-[22px] shadow-lg bg-white/50 backdrop-blur-lg">
        <h1 className="text-center font-medium text-xl md:text-2xl my-2">
          {scrumtab.title}
        </h1>
        <div className="carousel carousel-center w-full space-x-4 p-4">
          {[...scrumSteps]
            .sort((a, b) => a.order - b.order)
            .map((step: ScrumStepType) => (
              <div
                key={step.idscrumstep}
                className="grid grid-cols-1 h-fit carousel-item bg-white/60 backdrop-blur-lg rounded-[22px] shadow-sm p-4 w-56 max-h-[620px] overflow-y-auto"
              >
                <div className="flex justify-between items-start w-full mb-2">
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
