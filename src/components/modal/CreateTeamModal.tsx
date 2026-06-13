import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import { UserType } from '@/src/types/UserType'
import AnimatedModal from '@/src/components/utils/AnimatedModal'
import SnackBar from '@/src/components/utils/SnackBar'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  user: UserType
  isOpen: boolean
  closeCreateModal: () => void
}

export default function CreateTeamModal({ user, isOpen, closeCreateModal }: Props) {
  const { refreshData } = useApiRoutes()
  const [teamName, setTeamName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [snackBar, setSnackBar] = useState<{
    error: SnackBarStatus
    success: SnackBarStatus
  }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })

  const createTeam = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!teamName || teamName.length <= 2) return
    setIsLoading(true)
    try {
      await axios.post('/api/create-team', { idleader: user.iduser, name: teamName })
      await refreshData()
      setSnackBar((prev) => ({
        ...prev,
        success: { active: true, message: 'Team created.' },
      }))
      setTimeout(() => {
        setSnackBar({ error: { active: false, message: null }, success: { active: false, message: null } })
        closeCreateModal()
      }, 3000)
    } catch {
      setSnackBar((prev) => ({
        ...prev,
        error: { active: true, message: 'Error creating team.' },
      }))
      setTimeout(() => {
        setSnackBar((prev) => ({ ...prev, error: { active: false, message: null } }))
      }, 3000)
    } finally {
      setIsLoading(false)
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

      <h1 className="text-center text-xl font-semibold text-white mb-1">
        Create your team
      </h1>
      <p className="text-center text-xs text-white/40 mb-5">
        Or{' '}
        <span className="underline text-violet-400 cursor-pointer">
          join an existing team
        </span>
      </p>

      <form className="space-y-3" onSubmit={createTeam}>
        <input
          type="text"
          required
          placeholder="Team name"
          className="glass-input"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button
          className="btn-violet btn-violet-lg"
          disabled={isLoading || !teamName || teamName.length <= 2}
          style={{ opacity: isLoading || !teamName || teamName.length <= 2 ? 0.5 : 1 }}
        >
          {isLoading ? <span className="loading loading-dots loading-md" /> : 'Create team'}
        </button>
      </form>

      <SnackBar error={snackBar.error} success={snackBar.success} />
    </AnimatedModal>
  )
}
