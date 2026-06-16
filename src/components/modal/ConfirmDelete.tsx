import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  isOpen: boolean
  closeCreateModal: () => void
  confirmDeletion: () => void
}

const ConfirmDelete = ({ isOpen, closeCreateModal, confirmDeletion }: Props) => {
  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeCreateModal} variant="delete">
      <button
        className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
        onClick={closeCreateModal}
      >
        <XMarkIcon className="w-5 h-5 text-white/60" />
      </button>

      <div className="flex flex-col items-center gap-3 mt-4 mb-6">
        <div className="p-3 rounded-full bg-red-500/15 border border-red-500/25">
          <TrashIcon className="w-6 h-6 text-red-400" />
        </div>
        <h1 className="text-center text-lg font-semibold text-white">
          Delete this sprint?
        </h1>
        <p className="text-xs text-white/40 text-center">This action cannot be undone.</p>
      </div>

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
