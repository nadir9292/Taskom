import { motion, AnimatePresence } from 'framer-motion'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import axios from 'axios'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import SnackBar from '@/src/components/utils/SnackBar'
import { useApiRoutes } from '@/src/contexts/ApiContext'

type Props = {
  isOpen: boolean
  closeSprintDetails: () => void
  scrumSteps: ScrumStepType[]
}

const SprintDetails = ({ isOpen, closeSprintDetails, scrumSteps }: Props) => {
  const { refreshData } = useApiRoutes()
  const { sprintSelected } = useSelectContext()
  const [snackBar, setSnackBar] = useState<{
    error: SnackBarStatus
    success: SnackBarStatus
  }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })

  const resetSnackBar = () => {
    setTimeout(() => {
      setSnackBar({
        error: { active: false, message: null },
        success: { active: false, message: null },
      })
    }, 3000)
  }

  const updateSprintStep = async (step: ScrumStepType) => {
    try {
      await axios.post('/api/update-step-sprint', {
        idsprint: sprintSelected?.idsprint,
        idStep: step.idscrumstep,
      })

      await refreshData()

      setSnackBar((prev) => ({
        ...prev,
        success: {
          message: `the sprint is move to ${step.title}`,
          active: true,
        },
      }))
      resetSnackBar()
    } catch {
      setSnackBar((prev) => ({
        ...prev,
        error: {
          message: 'Failed to change the status sprint.',
          active: true,
        },
      }))
      setTimeout(() => {
        setSnackBar((prev) => ({
          ...prev,
          error: { message: null, active: false },
        }))
      }, 3000)
    }
  }

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

              <h1 className="font-bold uppercase p-2 text-center flex-1 my-4">
                {sprintSelected?.title}
              </h1>
              <div className="flex justify-between items-center mb-4">
                <span className="badge badge-primary">
                  {sprintSelected?.tag}
                </span>
                <span className="font-thin italic">
                  {sprintSelected?.startdate?.toString()} -{' '}
                  {sprintSelected?.enddate?.toString()}
                </span>
              </div>
              <p className="my-2 text-pretty">
                <span className="font-semibold underline">
                  Short description :<br />
                </span>
                {sprintSelected?.shortdescription || 'No short description'}
              </p>
              <p className="my-2 text-pretty">
                <span className="font-semibold underline">
                  Long description :<br />
                </span>
                {sprintSelected?.longdescription || 'No long description'}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 mb-4 p-2 text-center">
              <p className="mb-2 font-medium">Change status of sprint</p>
              <div>
                {[...scrumSteps]
                  .sort((a, b) => a.order - b.order)
                  .map((step) => (
                    <button
                      key={step.idscrumstep}
                      className="btn btn-secondary mx-2"
                      onClick={() => updateSprintStep(step)}
                    >
                      {step.title}
                    </button>
                  ))}
              </div>
            </div>
            <SnackBar error={snackBar.error} success={snackBar.success} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SprintDetails
