import React, { useState, FormEvent } from 'react'
import axios from 'axios'
import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import SnackBar from '@/src/components/utils/SnackBar'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'

type Props = {
  idteam: number
  isOpen: boolean
  closeModal: () => void
}

const AddMemberModal = ({ idteam, isOpen, closeModal }: Props) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [snackBar, setSnackBar] = useState<{ error: SnackBarStatus; success: SnackBarStatus }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })

  const resetSnackBar = () => {
    setTimeout(() => {
      setSnackBar({ error: { active: false, message: null }, success: { active: false, message: null } })
      closeModal()
    }, 3000)
  }

  const addMember = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axios.post('/api/invite-member', { email, idteam })
      setEmail('')
      setSnackBar((prev) => ({ ...prev, success: { message: 'Invitation envoyée.', active: true } }))
      resetSnackBar()
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to add member.'
      setSnackBar((prev) => ({ ...prev, error: { message: msg, active: true } }))
      setTimeout(() => setSnackBar((prev) => ({ ...prev, error: { message: null, active: false } })), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeModal}>
      <button
        className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
        onClick={closeModal}
      >
        <XMarkIcon className="w-5 h-5 text-white/60" />
      </button>

      <h1 className="text-center text-xl font-semibold text-white mb-5">Add member</h1>

      <form className="space-y-3" onSubmit={addMember}>
        <input
          type="email"
          required
          placeholder="Email address"
          className="glass-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-violet btn-violet-lg">
          {isLoading ? <span className="loading loading-dots loading-md" /> : 'Envoyer l\'invitation'}
        </button>
      </form>

      <SnackBar error={snackBar.error} success={snackBar.success} />
    </AnimatedModal>
  )
}

export default AddMemberModal
