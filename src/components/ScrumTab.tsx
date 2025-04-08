'use client'

import ScrumStep from '@/src/components/ScrumStep'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import React from 'react'

type Props = object

const ScrumTab = ({}: Props) => {
  const scrumSteps: ScrumStepType[] = []

  return (
    <div className="flex flex-nowrap overflow-x-auto scrolling-touch pt-2 pb-8">
      {scrumSteps.map((step: ScrumStepType) => (
        <div key={step.id} className="flex-shrink-0">
          <ScrumStep title={step.title} color={step.color} />
        </div>
      ))}
    </div>
  )
}

export default ScrumTab
