import React, { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
import { SprintType } from '@/src/types/SprintType'
import { ScrumStepType } from '@/src/types/ScrumStepType'

type Props = {
  idUser: number
  scrumsteps: ScrumStepType[]
  isOpen: boolean
  closeCreateModal: () => void
}

const tags = [
  'Front',
  'Back',
  'Bug',
  'UI/UX',
  'Integration',
  'Feature',
  'Refacto',
  'Testing',
  'Design',
  'API',
  'Performance',
  'Security',
  'Documentation',
  'DevOps',
  'Review',
  'Hotfix',
  'WIP', // Work In Progress
  'Done',
  'Blocked',
]

const CreateSprint = ({
  idUser,
  scrumsteps,
  isOpen,
  closeCreateModal,
}: Props) => {
  const [sprintForm, setSprintForm] = useState<SprintType>({
    tag: '',
    title: '',
    shortdescription: '',
    longdescription: '',
    startdate: new Date(),
    enddate: new Date(),
    idscrumstep: null,
    iduseraffected: null,
  })
  const [scrumstepsList, setScrumstepsList] = useState<ScrumStepType[]>([])

  useEffect(() => {
    setScrumstepsList([...scrumsteps].sort((a, b) => a.order - b.order))
  }, [scrumsteps])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setSprintForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSprintForm((prev) => ({ ...prev, [name]: new Date(value) }))
  }

  const createSprint = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const sprintToSend = {
      ...sprintForm,
      iduseraffected: idUser,
    }

    if (!sprintToSend.idscrumstep || !sprintToSend.iduseraffected) {
      console.error('Missing required fields')
      return
    }
    try {
      await axios.post('/api/create-sprint', sprintForm)
    } catch (error) {
      console.error('Failed to create sprint', error)
    }
  }

  if (!isOpen) return

  return (
    <div className="fixed inset-0 h-full w-full backdrop-blur-xl [perspective:800px] [transform-style:preserve-3d]">
      <div className="p-4 max-w-md w-[95vw] mx-auto mt-32 bg-[#FDECEC]/90 backdrop-blur-xl rounded-[22px] shadow-lg relative z-50 flex flex-col">
        <button
          className="btn btn-ghost absolute top-4 right-2"
          onClick={closeCreateModal}
        >
          X
        </button>
        <h1 className="text-center text-2xl mt-2 font-medium text-gray-900">
          New Sprint
        </h1>

        <form className="mt-6" onSubmit={createSprint}>
          <select
            name="idscrumstep"
            className="select mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
            value={sprintForm.idscrumstep ?? ''}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select step
            </option>
            {scrumstepsList.map((step) => (
              <option key={step.idscrumstep} value={step.idscrumstep}>
                {step.order} : {step.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="input mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
            value={sprintForm.title}
            onChange={handleChange}
          />

          <select
            name="tag"
            value={sprintForm.tag}
            onChange={handleChange}
            required
            className="select mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
          >
            <option value="" disabled>
              Select tag
            </option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <textarea
            name="shortdescription"
            placeholder="Short description"
            required
            className="textarea mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
            value={sprintForm.shortdescription}
            onChange={handleChange}
          />

          <textarea
            name="longdescription"
            placeholder="Long description"
            required
            className="textarea mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
            value={sprintForm.longdescription}
            onChange={handleChange}
          />

          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label className="mb-1 px-2">Start date</label>
              <input
                type="date"
                name="startdate"
                className="input input-md w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
                value={sprintForm?.startdate?.toISOString().split('T')[0]}
                onChange={handleDateChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-1 px-2">End date</label>
              <input
                type="date"
                name="enddate"
                className="input input-md w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
                value={sprintForm?.enddate?.toISOString().split('T')[0]}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <button className="btn btn-secondary btn-lg mt-4 w-full shadow-md">
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateSprint
