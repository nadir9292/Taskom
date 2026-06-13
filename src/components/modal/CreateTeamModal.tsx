import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import { UserType } from '@/src/types/UserType'
import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  user: UserType
  isOpen: boolean
  closeCreateModal: () => void
}

export default function CreateTeamModal({
  user,
  isOpen,
  closeCreateModal,
}: Props) {
  const [teamName, setTeamName] = useState('')

  const createTeam = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!teamName || teamName.length <= 2) return

    await axios.post(`/api/create-team`, {
      idleader: user.iduser,
      name: teamName,
    })
  }

  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeCreateModal}>
      <button
        className="btn btn-ghost absolute top-4 right-2"
        onClick={closeCreateModal}
      >
        <XMarkIcon width={20} height={20} />
      </button>
      <h1 className="text-center text-2xl mt-2 font-medium text-gray-900">
        Create your team
      </h1>
      <p className="text-center text-xs italic">
        You can also join a team{' '}
        <span className="underline text-blue-600 cursor-pointer">here</span>
      </p>
      <form className="mt-8" onSubmit={createTeam}>
        <input
          type="text"
          required
          placeholder="Team's name"
          className="input mb-4 w-full rounded-[22px] bg-white/50 border-transparent shadow-md"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button
          className="btn btn-secondary btn-lg mt-4 w-full shadow-md"
          disabled={!teamName || teamName.length <= 2}
        >
          Create your team
        </button>
      </form>
    </AnimatedModal>
  )
}
