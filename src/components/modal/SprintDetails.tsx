import { motion, AnimatePresence } from 'framer-motion'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
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
        success: { message: `Moved to ${step.title}`, active: true },
      }))
      resetSnackBar()
    } catch {
      setSnackBar((prev) => ({
        ...prev,
        error: { message: 'Failed to change status.', active: true },
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
        <motion.div
          className="fixed inset-0 h-full w-full z-50"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(5, 5, 26, 0.5)' }}
          onClick={closeSprintDetails}
        >
          <motion.div
            className="glass-strong absolute inset-x-0 mx-auto bottom-0 p-5 max-w-2xl w-[95vw] max-h-[90%] rounded-t-2xl flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={closeSprintDetails}
                className="p-1.5 rounded-lg hover:bg-white/8 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-white/60" />
              </button>
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <span className="glass-badge">{sprintSelected?.tag}</span>
            </div>

            <h1 className="text-lg font-semibold text-white text-center mb-1">
              {sprintSelected?.title}
            </h1>
            <p className="text-xs text-white/40 text-center italic mb-5">
              {sprintSelected?.startdate?.toString()} — {sprintSelected?.enddate?.toString()}
            </p>

            <div className="space-y-3 flex-1 overflow-y-auto">
              <div className="glass-card rounded-xl p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                  Short description
                </p>
                <p className="text-sm text-white/75 leading-relaxed">
                  {sprintSelected?.shortdescription || '—'}
                </p>
              </div>
              <div className="glass-card rounded-xl p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">
                  Long description
                </p>
                <p className="text-sm text-white/75 leading-relaxed">
                  {sprintSelected?.longdescription || '—'}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/8">
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold text-center mb-3">
                Move to
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[...scrumSteps]
                  .sort((a, b) => a.order - b.order)
                  .map((step) => (
                    <button
                      key={step.idscrumstep}
                      className="btn-glass text-xs py-1.5 px-3"
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
