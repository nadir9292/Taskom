import { useSelectContext } from '@/src/contexts/SelectedContext'
import { SprintType } from '@/src/types/SprintType'
import { TrashIcon } from '@heroicons/react/24/outline'
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
      <div className="flex justify-center bg-white/60 rounded-2xl shadow-sm max-h-12 py-3 px-2 my-1.5">
        <button className="btn btn-secondary btn-xs" onClick={openCreateModal}>
          + New sprint
        </button>
      </div>
      {selectedSprints ? (
        selectedSprints.map((sprint) => (
          <div
            key={sprint.idsprint}
            onClick={() => onSelectSprint(sprint)}
            className="group bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm hover:scale-105 cursor-pointer p-2 my-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="badge badge-primary">{sprint.tag}</div>
                <Image
                  src="/default-profile.png"
                  height={20}
                  width={20}
                  alt="profile image sprint"
                />
              </div>
              <div className="flex items-center">
                <TrashIcon
                  onClick={(e) => {
                    e.stopPropagation()
                    openConfirmDeleteSprint()
                  }}
                  height={16}
                  width={16}
                  className="text-red-500 md:opacity-0 md:group-hover:opacity-100 md:hover:scale-110 md:transition-opacity md:duration-200"
                />
              </div>
            </div>
            <p className="text-sm md:text-md text-pretty">
              {sprint.shortdescription}
            </p>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  )
}
export default Sprints
