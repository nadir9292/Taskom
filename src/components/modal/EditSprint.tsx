import React, { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
import SnackBar from '@/src/components/utils/SnackBar'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { XMarkIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { SprintType } from '@/src/types/SprintType'

type Props = {
  idUser: number
  scrumsteps: ScrumStepType[]
  isOpen: boolean
  closeEditModal: () => void
}

const tags = [
  'Fullstack', 'Front', 'Back', 'Bug', 'UI/UX', 'Integration',
  'Feature', 'Refacto', 'Testing', 'Design', 'API', 'Performance',
  'Security', 'Documentation', 'DevOps', 'Review', 'Hotfix', 'WIP', 'Done', 'Blocked',
]

const EditSprint = ({ idUser, scrumsteps, isOpen, closeEditModal }: Props) => {
  const { refreshData, myTeam } = useApiRoutes()
  const { sprintSelected } = useSelectContext()
  const [sprintForm, setSprintForm] = useState<SprintType>({})
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

  useEffect(() => {
    if (sprintSelected) {
      const members = sprintSelected.members?.length
        ? sprintSelected.members
        : sprintSelected.iduseraffected ? [sprintSelected.iduseraffected] : []
      setSprintForm({ ...sprintSelected, members })
    }
  }, [sprintSelected])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setSprintForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSprintForm((prev) => ({ ...prev, [name]: new Date(value) }))
  }

  const toggleMember = (iduser: number) => {
    setSprintForm((prev) => {
      const current = prev.members ?? []
      const next = current.includes(iduser)
        ? current.filter((id) => id !== iduser)
        : [...current, iduser]
      const leader = prev.iduseraffected
      return {
        ...prev,
        members: next,
        iduseraffected: leader && next.includes(leader) ? leader : next[0] ?? null,
      }
    })
  }

  const setLeader = (iduser: number) => {
    setSprintForm((prev) => ({ ...prev, iduseraffected: iduser }))
  }

  const resetSnackBar = () => {
    setTimeout(() => {
      setSnackBar({
        error: { active: false, message: null },
        success: { active: false, message: null },
      })
      closeEditModal()
    }, 3000)
  }

  const toDateString = (date: Date | undefined) => {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
  }

  const updateSprint = async (event: FormEvent) => {
    event.preventDefault()
    if (!sprintForm.idscrumstep || !sprintForm.idsprint) return
    setIsLoading(true)
    try {
      await axios.patch('/api/update-sprint', sprintForm)
      refreshData()
      setSnackBar((prev) => ({
        ...prev,
        success: { message: 'Sprint updated.', active: true },
      }))
      resetSnackBar()
    } catch {
      setSnackBar((prev) => ({
        ...prev,
        error: { message: 'Failed to update sprint.', active: true },
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
    <AnimatedModal isOpen={isOpen} onClose={closeEditModal}>
      <button
        className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
        onClick={closeEditModal}
      >
        <XMarkIcon className="w-5 h-5 text-white/60" />
      </button>

      <h1 className="text-center text-xl font-semibold text-white mb-5">
        Edit Sprint
      </h1>

      <form className="space-y-3" onSubmit={updateSprint}>
        <select
          name="idscrumstep"
          className="glass-input"
          value={sprintForm.idscrumstep ?? ''}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select step</option>
          {sortedSteps.map((step) => (
            <option key={step.idscrumstep} value={step.idscrumstep}>
              {step.order} : {step.title}
            </option>
          ))}
        </select>

        <div className="glass-card rounded-xl p-3">
          <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-2">
            Assign to — star to set leader
          </p>
          <div className="flex flex-wrap gap-2">
            {myTeam.map((member) => {
              const selected = sprintForm.members?.includes(member.iduser!) ?? false
              const isLeader = sprintForm.iduseraffected === member.iduser
              return (
                <div key={member.iduser} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleMember(member.iduser!)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      selected
                        ? 'border-violet-400/60 bg-violet-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-white/40 hover:text-white/60'
                    }`}
                  >
                    {member.firstname} {member.lastname?.toUpperCase()}
                    {member.iduser === idUser ? ' (me)' : ''}
                  </button>
                  {selected && (
                    <button
                      type="button"
                      onClick={() => setLeader(member.iduser!)}
                      className={`p-1 rounded-lg border transition-colors ${
                        isLeader
                          ? 'border-yellow-400/60 bg-yellow-500/20 text-yellow-300'
                          : 'border-white/10 bg-white/5 text-white/20 hover:text-yellow-300/60'
                      }`}
                      title={isLeader ? 'Leader' : 'Set as leader'}
                    >
                      {isLeader
                        ? <StarSolid className="w-3 h-3" />
                        : <StarIcon className="w-3 h-3" />
                      }
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <input
          name="title"
          type="text"
          required
          placeholder="Title"
          className="glass-input"
          value={sprintForm.title ?? ''}
          onChange={handleChange}
        />

        <select
          name="tag"
          value={sprintForm.tag ?? ''}
          onChange={handleChange}
          required
          className="glass-input"
        >
          <option value="" disabled>Select tag</option>
          {tags.map((tag, i) => (
            <option key={i} value={tag}>{tag}</option>
          ))}
        </select>

        <textarea
          name="shortdescription"
          placeholder="Short description"
          required
          className="glass-input resize-none"
          rows={2}
          value={sprintForm.shortdescription ?? ''}
          onChange={handleChange}
        />

        <textarea
          name="longdescription"
          placeholder="Long description"
          required
          className="glass-input resize-none"
          rows={3}
          value={sprintForm.longdescription ?? ''}
          onChange={handleChange}
        />

        <div className="flex gap-3">
          {(['startdate', 'enddate'] as const).map((field) => (
            <div key={field} className="flex flex-col w-full gap-1">
              <label className="text-xs text-white/40 px-1">
                {field === 'startdate' ? 'Start' : 'End'} date
              </label>
              <input
                type="date"
                name={field}
                className="glass-input"
                value={toDateString((sprintForm as any)[field])}
                onChange={handleDateChange}
              />
            </div>
          ))}
        </div>

        <button className="btn-violet btn-violet-lg">
          {isLoading ? (
            <span className="loading loading-dots loading-md" />
          ) : (
            'Save changes'
          )}
        </button>
      </form>

      <SnackBar error={snackBar.error} success={snackBar.success} />
    </AnimatedModal>
  )
}

export default EditSprint
