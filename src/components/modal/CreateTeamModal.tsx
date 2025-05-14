import React, { FormEvent, useState } from 'react'
import TagInput from '@eidellev/react-tag-input'
import axios from 'axios'
import { UserType } from '@/src/types/UserType'
import AnimatedModal from '@/src/components/utils/AnimatedModal'

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
  const [tags, setTags] = useState<string[]>([])
  const [teamName, setTeamName] = useState('')

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value)
  }

  const handleTagsChange = (newTags: string[]) => {
    const validEmails = newTags.filter((tag) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(tag)
    )

    if (validEmails.length < newTags.length) {
      alert('Some emails were invalid and not added.')
    }

    setTags(validEmails)
  }

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
        X
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
          onChange={handleTeamNameChange}
        />
        <TagInput
          value={tags}
          onChange={handleTagsChange}
          colorize
          placeholder="add teammates emails"
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
