import SprintCard from '@/src/components/SprintCard'
import React from 'react'

type Props = {
  title: string
  color: string
}

const ScrumStep = ({ title, color }: Props) => {
  return (
    <div
      className={`card max-w-sm w-72 mx-4 shadow-lg max-h-[700px] bg-[${color}]`}
    >
      <div className="card-body">
        <h1 className="text-lg text-gray-900 -my-2 font-bold italic">
          {title}
        </h1>
        <ul className="overflow-auto max-h-[620px]">
          <li>
            <SprintCard />
          </li>
          <li>
            <SprintCard />
          </li>
          <li>
            <SprintCard />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ScrumStep
