import { useSelectContext } from '@/src/contexts/SelectedContext'
import { SprintType } from '@/src/types/SprintType'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
  sprints: SprintType[]
  idscrumstep: number
  openCreateModal: () => void
  openConfirmDeleteSprint: () => void
}

const Sprints = ({
  sprints,
  idscrumstep,
  openCreateModal,
  openConfirmDeleteSprint,
}: Props) => {
  const [selectedSprints, setSelectedSprints] = useState<SprintType[]>()
  const { setSprintSelected, setIsOpenSprintDetails } = useSelectContext()

  const onSelectSprint = (sprint: SprintType) => {
    setSprintSelected(sprint)
    setIsOpenSprintDetails(true)
  }

  useEffect(() => {
    setSelectedSprints(
      sprints.filter((sprint) => sprint.idscrumstep === idscrumstep)
    )
  }, [sprints, idscrumstep])

  return (
    <>
      <button
        onClick={openCreateModal}
        className="flex items-center justify-center gap-1.5 w-full py-2 mb-2 rounded-xl text-white/40 text-xs border border-dashed border-white/10 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/5 transition-all"
      >
        <PlusIcon className="w-3.5 h-3.5" />
        New sprint
      </button>

      {selectedSprints?.map((sprint) => (
        <div
          key={sprint.idsprint}
          onClick={() => onSelectSprint(sprint)}
          className="group glass-card rounded-xl p-3 mb-2 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="glass-badge">{sprint.tag}</span>
            <div className="flex items-center gap-1.5">
              <Image
                src="/default-profile.png"
                height={18}
                width={18}
                alt="assignee"
                className="rounded-md opacity-60"
              />
              <TrashIcon
                onClick={(e) => {
                  e.stopPropagation()
                  setSprintSelected(sprint)
                  openConfirmDeleteSprint()
                }}
                className="w-3.5 h-3.5 text-red-400/50 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:text-red-400"
              />
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
            {sprint.shortdescription}
          </p>
        </div>
      ))}
    </>
  )
}

export default Sprints
