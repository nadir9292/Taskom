import React, { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
import SnackBar from '@/src/components/utils/SnackBar'
import { SprintType } from '@/src/types/SprintType'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  idUser: number
  scrumsteps: ScrumStepType[]
  isOpen: boolean
  closeCreateModal: () => void
}

const tags = [
  'Fullstack',
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
  'WIP',
  'Done',
  'Blocked',
]

const CreateSprint = ({
  idUser,
  scrumsteps,
  isOpen,
  closeCreateModal,
}: Props) => {
  const { refreshData } = useApiRoutes()
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
  const [sortedSteps, setSortedSteps] = useState<ScrumStepType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [snackBar, setSnackBar] = useState<{
    error: SnackBarStatus
    success: SnackBarStatus
  }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })

  useEffect(() => {
    setSortedSteps([...scrumsteps].sort((a, b) => a.order - b.order))
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

  const resetSnackBar = () => {
    setTimeout(() => {
      setSnackBar({
        error: { active: false, message: null },
        success: { active: false, message: null },
      })
      closeCreateModal()
    }, 3000)
  }

  const resetForm = () => {
    setSprintForm({
      enddate: new Date(),
      history: null,
      idscrumstep: null,
      idsprint: null,
      iduseraffected: null,
      longdescription: null,
      shortdescription: null,
      startdate: new Date(),
      tag: null,
      title: null,
    })
  }

  const createSprint = async (event: FormEvent) => {
    event.preventDefault()

    if (!sprintForm.idscrumstep) return

    setIsLoading(true)

    try {
      await axios.post('/api/create-sprint', {
        ...sprintForm,
        iduseraffected: idUser,
      })

      refreshData()

      setSnackBar((prev) => ({
        ...prev,
        success: { message: 'Sprint created.', active: true },
      }))
      resetForm()
      resetSnackBar()
    } catch {
      setSnackBar((prev) => ({
        ...prev,
        error: { message: 'Failed to create sprint.', active: true },
      }))
      setTimeout(() => {
        setSnackBar((prev) => ({
          ...prev,
          error: { message: null, active: false },
        }))
      }, 3000)
    } finally {
      setIsLoading(false)
    }
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
        New Sprint
      </h1>

      <form className="mt-6" onSubmit={createSprint}>
        <select
          name="idscrumstep"
          className="select mb-4 w-full rounded-[22px] bg-white/50 border-transparent shadow-md"
          value={sprintForm.idscrumstep ?? ''}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select step
          </option>
          {sortedSteps.map((step) => (
            <option key={step.idscrumstep} value={step.idscrumstep}>
              {step.order} : {step.title}
            </option>
          ))}
        </select>

        <input
          name="title"
          type="text"
          required
          placeholder="Title"
          className="input mb-4 w-full rounded-[22px] bg-white/50 border-transparent shadow-md"
          value={sprintForm.title ? sprintForm.title : ''}
          onChange={handleChange}
        />

        <select
          name="tag"
          value={sprintForm.tag ? sprintForm.tag : ''}
          onChange={handleChange}
          required
          className="select mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
        >
          <option value="" disabled>
            Select tag
          </option>
          {tags.map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <textarea
          name="shortdescription"
          placeholder="Short description"
          required
          className="textarea mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
          value={sprintForm.shortdescription ? sprintForm.shortdescription : ''}
          onChange={handleChange}
        />

        <textarea
          name="longdescription"
          placeholder="Long description"
          required
          className="textarea mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
          value={sprintForm.longdescription ? sprintForm.longdescription : ''}
          onChange={handleChange}
        />

        <div className="flex gap-4">
          {['startdate', 'enddate'].map((field) => (
            <div key={field} className="flex flex-col w-full">
              <label className="mb-1 px-2">
                {field === 'startdate' ? 'Start' : 'End'} date
              </label>
              <input
                type="date"
                name={field}
                className="input input-md w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
                value={(sprintForm as any)[field]?.toISOString().split('T')[0]}
                onChange={handleDateChange}
              />
            </div>
          ))}
        </div>

        <button className="btn btn-secondary btn-lg mt-4 w-full shadow-md">
          {isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            <span>Add new sprint</span>
          )}
        </button>
      </form>

      <SnackBar error={snackBar.error} success={snackBar.success} />
    </AnimatedModal>
  )
}

export default CreateSprint
