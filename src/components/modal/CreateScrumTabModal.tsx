import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import TagInput from '@eidellev/react-tag-input'
import SnackBar from '@/src/components/utils/SnackBar'
import { UserType } from '@/src/types/UserType'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  user: UserType
  closeCreateModal: () => void
  isOpen: boolean
}

const defaultSteps = ['backlog', 'to do', 'doing', 'test', 'done']

const CreateScrumTabModal = ({ user, closeCreateModal, isOpen }: Props) => {
  const { refreshData } = useApiRoutes()
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

  const handleStepChange = (newTags: string[]) => setScrumSteps(newTags)

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
        scrumsteps: scrumSteps.map((step, i) => ({ stepName: step, order: i + 1 })),
      })
      await refreshData()
      setSnackBar((prev) => ({
        ...prev,
        success: { active: true, message: 'Board created.' },
      }))
    } catch {
      setSnackBar((prev) => ({
        ...prev,
        error: { active: true, message: 'Error creating board.' },
      }))
    } finally {
      setIsLoading(false)
      resetSnackBar()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeCreateModal}>
      <button
        className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
        onClick={closeCreateModal}
      >
        <XMarkIcon className="w-5 h-5 text-white/60" />
      </button>

      <h1 className="text-center text-xl font-semibold text-white mb-5">
        New Board
      </h1>

      <form className="space-y-3" onSubmit={createScrumTab}>
        <input
          type="text"
          required
          placeholder="Board name"
          className="glass-input"
          value={scrumTabName}
          onChange={(e) => setScrumTabName(e.target.value)}
        />
        <TagInput value={scrumSteps} onChange={handleStepChange} colorize />
        <button className="btn-violet btn-violet-lg">
          {isLoading ? (
            <span className="loading loading-dots loading-md" />
          ) : (
            'Create board'
          )}
        </button>
      </form>

      <SnackBar error={snackBar.error} success={snackBar.success} />
    </AnimatedModal>
  )
}

export default CreateScrumTabModal
