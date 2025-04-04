import SprintCard from '@/src/components/SprintCard'
import React from 'react'

type Props = {
  title: string
}

const ScrumStep = ({ title }: Props) => {
  return (
    <div className="card max-w-sm w-72 bg-base-300 mx-4 shadow-lg h-[700px]">
      <div className="card-body">
        <h1 className="text-lg text-base-content italic">{title}</h1>
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
          <li>
            <SprintCard />
          </li>
          <li>
            <SprintCard />
          </li>
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
