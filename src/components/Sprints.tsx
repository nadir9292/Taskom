import { useSelectContext } from '@/src/contexts/SelectedContext'
import { SprintType } from '@/src/types/SprintType'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
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
  const { setSprintSelected } = useSelectContext()

  useEffect(() => {
    setSelectedSprints(
      sprints.filter((sprint) => sprint.idscrumstep === idscrumstep)
    )
  }, [sprints, idscrumstep])

  return (
    <>
      <div className="flex justify-center my-2 bg-white/60 rounded-[22px] shadow-sm p-3 max-h-12 mt-2">
        <button className="btn btn-secondary btn-xs" onClick={openCreateModal}>
          + New sprint
        </button>
      </div>
      {selectedSprints ? (
        selectedSprints.map((sprint) => (
          <div
            key={sprint.idsprint}
            onClick={() => setSprintSelected(sprint)}
            className="group my-2 bg-white/70 backdrop-blur-lg rounded-[22px] shadow-sm p-3 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="badge badge-primary">{sprint.tag}</div>
              <div className="flex items-center">
                <PencilSquareIcon
                  height={16}
                  width={16}
                  className="mx-1 md:opacity-0 md:group-hover:opacity-100 md:hover:scale-110 md:transition-opacity md:duration-200"
                  onClick={() => alert('display edit popup')}
                />
                <TrashIcon
                  onClick={openConfirmDeleteSprint}
                  height={16}
                  width={16}
                  className="text-red-500 md:opacity-0 md:group-hover:opacity-100 md:hover:scale-110 md:transition-opacity md:duration-200"
                />
              </div>
            </div>
            <p className="text-sm md:text-md my-2 text-pretty">
              {sprint.shortdescription}
            </p>
            <Image
              src="/default-profile.png"
              height={20}
              width={20}
              alt="profile image sprint"
              className="absolute right-3 bottom-3"
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  )
}
export default Sprints
