import { useApiRoutes } from '@/src/contexts/ApiContext'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { SprintType } from '@/src/types/SprintType'
import { UserType } from '@/src/types/UserType'
import UserAvatar from '@/src/components/utils/UserAvatar'
import { CalendarIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerOnAppear, itemOnAppear, sprintCardExit } from '@/src/motion-tools/onAppear'

type Props = {
  sprints: SprintType[]
  idscrumstep: number
  openCreateModal: () => void
  openConfirmDeleteSprint: () => void
  openEditModal: () => void
  onDragStart: (sprint: SprintType) => void
  onDrop: (idscrumstep: number) => void
}

const Sprints = ({
  sprints,
  idscrumstep,
  openCreateModal,
  openConfirmDeleteSprint,
  openEditModal,
  onDragStart,
  onDrop,
}: Props) => {
  const [selectedSprints, setSelectedSprints] = useState<SprintType[]>()
  const [isDragOver, setIsDragOver] = useState(false)
  const { setSprintSelected, setIsOpenSprintDetails } = useSelectContext()
  const { myTeam } = useApiRoutes()

  const getUser = (iduser?: number | null): UserType | undefined =>
    myTeam.find((m) => m.iduser === iduser)

  const getDeadlineInfo = (enddate?: Date) => {
    if (!enddate) return null
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const end = new Date(enddate)
    end.setHours(0, 0, 0, 0)
    const diffDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const label = end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    if (diffDays < 0) return { label, color: 'text-red-400' }
    if (diffDays <= 3) return { label, color: 'text-orange-400' }
    return { label, color: 'text-white/35' }
  }

  const getSprintMembers = (sprint: SprintType): UserType[] => {
    if (sprint.members?.length) {
      return sprint.members.map((id) => getUser(id)).filter((u): u is UserType => !!u)
    }
    const affected = getUser(sprint.iduseraffected)
    return affected ? [affected] : []
  }

  const onSelectSprint = (sprint: SprintType) => {
    setSprintSelected(sprint)
    setIsOpenSprintDetails(true)
  }

  useEffect(() => {
    setSelectedSprints(sprints.filter((s) => s.idscrumstep === idscrumstep))
  }, [sprints, idscrumstep])

  return (
    <div
      className={`flex flex-col flex-1 min-h-[60px] rounded-xl transition-colors duration-150 ${
        isDragOver ? 'bg-violet-500/10 ring-1 ring-violet-400/30' : ''
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragOver(false)
        onDrop(idscrumstep)
      }}
    >
      <motion.button
        onClick={openCreateModal}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center gap-1.5 w-full py-2.5 mb-3 rounded-xl text-white/50 text-xs border border-dashed border-white/12 hover:border-violet-400/50 hover:text-violet-300 hover:bg-violet-500/6 transition-all duration-200"
      >
        <PlusIcon className="w-3.5 h-3.5" />
        Add sprint
      </motion.button>

      <motion.div
        className="flex flex-col gap-2"
        variants={containerOnAppear}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence initial={false}>
          {selectedSprints?.map((sprint) => (
            <motion.div
              key={sprint.idsprint}
              variants={itemOnAppear}
              exit={sprintCardExit}
              layout
              whileHover={{ y: -2, transition: { duration: 0.18 } }}
              onClick={() => onSelectSprint(sprint)}
              draggable
              onDragStart={(e) => {
                e.stopPropagation()
                onDragStart(sprint)
              }}
              className="group glass-card rounded-xl p-3.5 cursor-grab active:cursor-grabbing active:opacity-60 active:scale-95 transition-[opacity,transform] duration-150"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="glass-badge">{sprint.tag}</span>
                <div className="flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSprintSelected(sprint)
                      openEditModal()
                    }}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <PencilSquareIcon className="w-3.5 h-3.5 text-white/60 hover:text-white/90" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSprintSelected(sprint)
                      openConfirmDeleteSprint()
                    }}
                    className="p-1 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    <TrashIcon className="w-3.5 h-3.5 text-red-400/60 hover:text-red-400" />
                  </button>
                </div>
              </div>

              {sprint.title && (
                <p className="text-sm font-medium text-white/90 mb-1.5 leading-snug">
                  {sprint.title}
                </p>
              )}

              <p className="text-xs text-white/58 leading-relaxed line-clamp-2">
                {sprint.shortdescription}
              </p>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/6">
                <div className="flex items-center -space-x-1.5">
                  {getSprintMembers(sprint).slice(0, 4).map((u) => (
                    <UserAvatar key={u.iduser} user={u} size={20} />
                  ))}
                  {getSprintMembers(sprint).length > 4 && (
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[9px] text-white/50">
                      +{getSprintMembers(sprint).length - 4}
                    </div>
                  )}
                </div>
                {(() => {
                  const deadline = getDeadlineInfo(sprint.enddate)
                  return deadline ? (
                    <span className={`flex items-center gap-1 text-[10px] ${deadline.color}`}>
                      <CalendarIcon className="w-3 h-3" />
                      {deadline.label}
                    </span>
                  ) : null
                })()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Sprints
