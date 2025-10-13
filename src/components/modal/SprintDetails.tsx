import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  isOpen: boolean
  closeSprintDetails: () => void
}

const SprintDetails = ({ isOpen, closeSprintDetails }: Props) => {
  const { sprintSelected } = useSelectContext()

  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeSprintDetails}>
      <div className="flex justify-between items-center">
        <XMarkIcon
          onClick={closeSprintDetails}
          className="w-6 h-6 cursor-pointer"
        />
        <PencilSquareIcon className="w-6 h-6 text-orange-600 cursor-pointer" />
      </div>
      <h1 className="font-bold uppercase text-center flex-1 mb-4">
        {sprintSelected?.title}
      </h1>

      <div className="flex justify-between items-center mb-4">
        <span className="badge badge-primary">{sprintSelected?.tag}</span>
        <span className="text-xs italic">
          {sprintSelected?.startdate?.toString()} -{' '}
          {sprintSelected?.enddate?.toString()}
        </span>
      </div>

      <p>
        <span className="italic underline">Short description :</span>{' '}
        {sprintSelected?.shortdescription || 'No short description'}
      </p>

      <p>
        <span className="italic underline">Long description :</span>{' '}
        {sprintSelected?.longdescription || 'No long description'}
      </p>
    </AnimatedModal>
  )
}

export default SprintDetails
