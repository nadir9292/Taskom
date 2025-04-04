import ScrumStep from '@/src/components/ScrumStep'
import React from 'react'

type Props = object

const ScrumTab = ({}: Props) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto scrolling-touch pt-2 pb-8">
      <div className="flex-shrink-0">
        <ScrumStep />
      </div>
      <div className="flex-shrink-0">
        <ScrumStep />
      </div>
      <div className="flex-shrink-0">
        <ScrumStep />
      </div>
    </div>
  )
}

export default ScrumTab
