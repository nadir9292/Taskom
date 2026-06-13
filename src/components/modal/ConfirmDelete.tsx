import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  isOpen: boolean
  closeCreateModal: () => void
  confirmDeletion: () => void
}

const ConfirmDelete = ({ isOpen, closeCreateModal, confirmDeletion }: Props) => {
  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeCreateModal}>
      <button
        className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
        onClick={closeCreateModal}
      >
        <XMarkIcon className="w-5 h-5 text-white/60" />
      </button>

      <h1 className="text-center text-lg font-semibold text-white mt-4 mb-6">
        Delete this sprint?
      </h1>

      <div className="flex gap-3">
        <button
          className="btn-glass flex-1 py-2.5"
          onClick={closeCreateModal}
        >
          Cancel
        </button>
        <button
          className="btn-danger-glass flex-1 py-2.5"
          onClick={() => {
            closeCreateModal()
            confirmDeletion()
          }}
        >
          Delete
        </button>
      </div>
    </AnimatedModal>
  )
}

export default ConfirmDelete
