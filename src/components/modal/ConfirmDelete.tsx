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
    <div className="fixed inset-0 h-full w-full backdrop-blur-xl z-50">
      <div className="p-4 max-w-md w-[95vw] mx-auto mt-32 bg-[#FDECEC]/90 backdrop-blur-xl rounded-[22px] shadow-lg relative flex flex-col">
        <button
          className="btn btn-ghost absolute top-4 right-2"
          onClick={closeCreateModal}
        >
          X
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
      </div>
    </div>
  )
}

export default ConfirmDelete
