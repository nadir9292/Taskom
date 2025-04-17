import React from 'react'

type Props = {
  title: string
  color: string
}

const ScrumStep = ({ title, color }: Props) => {
  return (
    <div>
      <p>{title}</p>
      <p>{color}</p>
    </div>
  )
}

export default ScrumStep
