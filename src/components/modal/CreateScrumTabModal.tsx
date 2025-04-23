import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import TagInput from '@eidellev/react-tag-input'
import SnackBar from '@/src/components/utils/SnackBar'
import { UserType } from '@/src/types/UserType'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { containerOnAppear } from '@/src/motion-tools/onAppear'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  user: UserType
  closeCreateModal: () => void
  isOpen: boolean
}

const defaultSteps = ['backlog', 'to do', 'doing', 'test', 'done']

const CreateScrumTabModal = ({ user, closeCreateModal, isOpen }: Props) => {
  const [scrumTabName, setScrumTabName] = useState('')
  const [scrumSteps, setScrumSteps] = useState(defaultSteps)
  const [isLoading, setIsLoading] = useState(false)
  const [snackBar, setSnackBar] = useState<{
    error: SnackBarStatus
    success: SnackBarStatus
  }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })

  const handleStepChange = (newTags: string[]) => {
    setScrumSteps(newTags)
  }

  const resetSnackBar = () => {
    setTimeout(() => {
      setSnackBar({
        error: { active: false, message: null },
        success: { active: false, message: null },
      })
      closeCreateModal()
    }, 3000)
  }

  const createScrumTab = async (e: FormEvent) => {
    e.preventDefault()
    if (scrumTabName.length <= 2) return

    setIsLoading(true)
    try {
      await axios.post('/api/create-scrumtab', {
        idteam: user.idteam,
        title: scrumTabName,
        scrumsteps: scrumSteps.map((step, i) => ({
          stepName: step,
          order: i + 1,
        })),
      })

      setSnackBar((prev) => ({
        ...prev,
        success: { active: true, message: 'Success.' },
      }))
    } catch {
      setSnackBar((prev) => ({
        ...prev,
        error: { active: true, message: 'Error.' },
      }))
    } finally {
      setIsLoading(false)
      resetSnackBar()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 h-full w-full backdrop-blur-xl z-50">
          <motion.div
            variants={containerOnAppear}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="p-4 max-w-md w-[95vw] mx-auto mt-32 bg-[#FDECEC]/90 rounded-[22px] shadow-lg relative flex flex-col">
              <button
                className="btn btn-ghost absolute top-4 right-2"
                onClick={closeCreateModal}
              >
                X
              </button>
              <h1 className="text-center text-2xl mt-2 font-medium text-gray-900">
                New Sprint
              </h1>
              <form className="mt-6" onSubmit={createScrumTab}>
                <input
                  type="text"
                  required
                  placeholder="Title"
                  className="input mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
                  value={scrumTabName}
                  onChange={(e) => setScrumTabName(e.target.value)}
                />
                <TagInput
                  value={scrumSteps}
                  onChange={handleStepChange}
                  colorize
                />
                <button className="btn btn-secondary btn-lg mt-4 w-full shadow-md">
                  {isLoading ? (
                    <span className="loading loading-dots loading-lg"></span>
                  ) : (
                    'New tab'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
          <SnackBar error={snackBar.error} success={snackBar.success} />
        </div>
      )}
    </AnimatePresence>
  )
}

export default CreateScrumTabModal
