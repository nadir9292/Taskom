'use client'

import ScrumStep from '@/src/components/ScrumStep'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import React from 'react'

type Props = object

const ScrumTab = ({}: Props) => {
  const { scrumSteps } = useApiRoutes()

  return (
    <div className="flex flex-nowrap overflow-x-auto scrolling-touch pt-2 pb-8">
      {scrumSteps.map((step: ScrumStepType) => (
        <div key={step.id} className="flex-shrink-0">
          <ScrumStep title={step.title} />
        </div>
      ))}
    </div>
  )
}

export default ScrumTab
