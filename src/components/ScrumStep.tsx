import SprintCard from '@/src/components/SprintCard'
import React from 'react'
import tinycolor from 'tinycolor2'

type Props = {
  title: string
  color: string
}

const ScrumStep = ({ title, color }: Props) => {
  const gradientColor = tinycolor(color).lighten(10).toHexString()

  return (
    <div
      className="card max-w-sm w-72 mx-4 shadow-lg max-h-[700px]"
      style={{
        background: `linear-gradient(135deg, ${color}, ${gradientColor})`,
      }}
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
