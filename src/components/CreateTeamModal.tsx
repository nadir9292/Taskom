import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/src/components/ui/animated-modal'
import React, { FormEvent, useState } from 'react'
import TagInput from '@eidellev/react-tag-input'
import axios from 'axios'
import { UserType } from '@/src/types/UserType'

type Props = { user: UserType }

export default function CreateTeamModal({ user }: Props) {
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

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="btn btn-primary flex justify-center group/modal-btn">
          <span className="text-center">Create your team</span>
        </ModalTrigger>
        <ModalBody className="rounded-2xl mx-4 md:mx-1">
          <ModalContent>
            <h1 className="text-center text-2xl mt-2 font-bold">
              Create your team
            </h1>
            <p className="text-center text-xs italic">
              You can also join a team{' '}
              <span className="underline text-blue-600 cursor-pointer">
                here
              </span>
            </p>
            <form className="mt-8" onSubmit={createTeam}>
              <input
                type="text"
                required
                placeholder="Team's name"
                className="input border mb-4 w-full"
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
                className="btn btn-primary relative z-10 mt-12 w-full"
                disabled={!teamName || teamName.length <= 2}
              >
                Create your team
              </button>
            </form>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  )
}
