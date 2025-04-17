'use client'

import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ScrumTabType } from '@/src/types/ScrumTabType'
import React from 'react'

type Props = { scrumtab: ScrumTabType; scrumSteps: ScrumStepType[] }

const ScrumTab = ({ scrumtab, scrumSteps }: Props) => {
  return (
    <div className="w-[95vw] mx-auto mt-2 rounded-[22px] shadow-lg bg-white/50 backdrop-blur-lg">
      <h1 className="text-center font-medium text-xl md:text-2xl my-2">
        {scrumtab.title}
      </h1>
      <div className="carousel carousel-center w-full space-x-4 p-4">
        {scrumSteps.map((step: ScrumStepType) => (
          <div
            key={step.idscrumstep}
            className="carousel-item bg-white/60 backdrop-blur-lg rounded-[22px] shadow-sm p-4 w-56 min-h-[150px] max-h-[620px] overflow-y-auto"
          >
            <div className="flex justify-between items-start w-full">
              <p className="font-medium">{step.title}</p>
              <p>...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrumTab
