import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  isOpen: boolean
  closeCreateModal: () => void
  confirmDeletion: () => void
}

const ConfirmDelete = ({
  isOpen,
  closeCreateModal,
  confirmDeletion,
}: Props) => {
  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeCreateModal}>
      <button
        className="btn btn-ghost absolute top-4 right-2"
        onClick={closeCreateModal}
      >
         <XMarkIcon width={20} height={20} />
      </button>
      <h1 className="text-center text-2xl mt-8 font-medium text-gray-900">
        Are you sure you want to delete this sprint?
      </h1>
      <div className="flex items-center gap-x-2 justify-center mt-4">
        <button className="btn btn-secondary" onClick={closeCreateModal}>
          NO
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            closeCreateModal()
            confirmDeletion()
          }}
        >
          YES
        </button>
      </div>
    </AnimatedModal>
  )
}

export default ConfirmDelete
