import React, { FormEvent, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/src/components/ui/animated-modal'
import axios from 'axios'
import { UserType } from '@/src/types/UserType'
import TagInput from '@eidellev/react-tag-input'

type Props = { user: UserType }

const CreateScrumTabModal = ({ user }: Props) => {
  const [scrumTabName, setScrumTabName] = useState('')
  const [scrumSteps, setScrumStep] = useState<string[]>([
    'backlog',
    'to do',
    'doing',
    'test',
    'done',
  ])

  const handleScrumTabNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScrumTabName(e.target.value)
  }

  const handleScrumStepChange = (newTags: string[]) => {
    setScrumStep(newTags)
  }

  const createScrumTab = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!scrumTabName || scrumTabName.length <= 2) return

    await axios.post(`/api/create-scrumtab`, {
      idteam: user.idteam,
      title: scrumTabName,
      scrumsteps: scrumSteps,
    })
  }

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="flex justify-center group/modal-btn">
          <span className="text-center">New scrum tab</span>
        </ModalTrigger>
        <ModalBody className="rounded-2xl mx-4 md:mx-1">
          <ModalContent>
            <h1 className="text-center text-2xl mt-2 font-bold">
              New Scrum tab.
            </h1>
            <form className="mt-6" onSubmit={createScrumTab}>
              <input
                type="text"
                required
                placeholder="Title"
                className="input border mb-4 w-full rounded-[22px]"
                value={scrumTabName}
                onChange={handleScrumTabNameChange}
              />
              <div>
                <p className="text-center my-2">Scrum steps</p>
                <TagInput
                  value={scrumSteps}
                  onChange={handleScrumStepChange}
                  colorize
                />
              </div>
              <button
                className="btn btn-secondary relative z-10 mt-12 w-full shadow-sm"
                disabled={!scrumTabName || scrumTabName.length <= 2}
              >
                Create new scrum tab
              </button>
            </form>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CreateScrumTabModal
