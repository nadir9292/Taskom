import { motion, AnimatePresence } from 'framer-motion'
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
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 h-full w-full backdrop-blur-lg z-50">
          <motion.div
            className="absolute inset-x-0 mx-auto bottom-0 p-4 max-w-2xl w-[95vw] bg-[#F2F0EF]/70 h-full max-h-11/12 rounded-t-[22px] shadow-lg flex flex-col"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ precision: 0.001 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
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
                <span className="badge badge-primary">
                  {sprintSelected?.tag}
                </span>
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SprintDetails
