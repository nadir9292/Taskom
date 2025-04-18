import { SprintType } from '@/src/types/SprintType'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = { sprints: SprintType[]; idscrumstep: number }

const Sprints = ({ sprints, idscrumstep }: Props) => {
  const [selectedSprints, setSelectedSprints] = useState<SprintType[]>()

  useEffect(() => {
    setSelectedSprints(
      sprints.filter((sprint) => sprint.idscrumstep === idscrumstep)
    )
  }, [sprints, idscrumstep])

  return (
    <>
      <div className="flex justify-center my-2 bg-white/70 backdrop-blur-lg rounded-[22px] shadow-sm p-3 max-h-12">
        <button className="btn btn-secondary btn-xs">+ New sprint</button>
      </div>
      {selectedSprints ? (
        selectedSprints.map((sprint) => (
          <div
            key={sprint.idsprint}
            className="group my-2 bg-white/80 backdrop-blur-lg rounded-[22px] shadow-sm p-3 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="badge badge-primary">{sprint.tag}</div>
              <PencilSquareIcon
                height={22}
                width={22}
                className="md:opacity-0 md:group-hover:opacity-100 md:hover:scale-110 md:transition-opacity md:duration-200"
                onClick={() => alert('display edit popup')}
              />
            </div>
            <p className="text-sm md:text-md my-2 text-pretty">
              {sprint.shortdescription}
            </p>
            <Image
              src="/default-profile.png"
              height={22}
              width={22}
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
