import ScrumTab from '@/src/components/ScrumTab'
import React from 'react'

type Props = object

const Index = ({}: Props) => {
  return (
    <div className="grid grid-cols-1">
      <select
        defaultValue="Pick a color"
        className="select select-sm mx-auto mt-4 mb-2"
      >
        <option disabled={true}>Select Scrum tab</option>
        <option>Scrum 1</option>
        <option>Scrum 2</option>
        <option>Scrum 3</option>
      </select>
      <ScrumTab />
    </div>
  )
}

export default Index
