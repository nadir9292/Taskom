import { useApiRoutes } from '@/src/contexts/ApiContext'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { SprintType } from '@/src/types/SprintType'
import { UserType } from '@/src/types/UserType'
import UserAvatar from '@/src/components/utils/UserAvatar'
import { CalendarIcon, LockClosedIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { GripVertical } from 'lucide-react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerOnAppear, itemOnAppear, sprintCardExit } from '@/src/motion-tools/onAppear'

type Props = {
  sprints: SprintType[]
  idscrumstep: number
  isClosed?: boolean
  openCreateModal: () => void
  openConfirmDeleteSprint: () => void
  openEditModal: () => void
}

type SprintCardProps = {
  sprint: SprintType
  isClosed: boolean
  onSelect: (s: SprintType) => void
  onEdit: (s: SprintType) => void
  onDelete: (s: SprintType) => void
  getDeadlineInfo: (d?: Date) => { label: string; color: string } | null
  getSprintMembers: (s: SprintType) => UserType[]
}

function SprintCard({ sprint, isClosed, onSelect, onEdit, onDelete, getDeadlineInfo, getSprintMembers }: SprintCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: sprint.idsprint!,
    disabled: isClosed,
    data: { sprint },
  })

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      variants={itemOnAppear}
      exit={sprintCardExit}
      layout
      whileHover={{ y: isClosed ? 0 : -2, transition: { duration: 0.18 } }}
      onClick={() => onSelect(sprint)}
      className={`group glass-card rounded-xl p-3.5 transition-opacity duration-150 select-none ${
        isClosed
          ? 'cursor-default border border-emerald-500/20 bg-emerald-500/5 opacity-75'
          : isDragging
          ? 'opacity-30'
          : 'opacity-100'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {!isClosed && (
            <button
              {...listeners}
              onClick={(e) => e.stopPropagation()}
              aria-label="Drag sprint"
              className="touch-none cursor-grab active:cursor-grabbing p-0.5 -ml-0.5 rounded text-white/25 hover:text-white/55 transition-colors"
            >
              <GripVertical className="w-3.5 h-3.5" />
            </button>
          )}
          {isClosed && <LockClosedIcon className="w-3 h-3 text-emerald-400/70 shrink-0" />}
          <span className={`glass-badge ${isClosed ? 'opacity-60' : ''}`}>{sprint.tag}</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(sprint) }}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <PencilSquareIcon className="w-3.5 h-3.5 text-white/60 hover:text-white/90" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(sprint) }}
            className="p-1 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <TrashIcon className="w-3.5 h-3.5 text-red-400/60 hover:text-red-400" />
          </button>
        </div>
      </div>

      {sprint.title && (
        <p className={`text-sm font-medium mb-1.5 leading-snug ${isClosed ? 'text-white/55' : 'text-white/90'}`}>
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
        {isClosed ? (
          <span className="flex items-center gap-1 text-[10px] text-emerald-400/70">
            <LockClosedIcon className="w-3 h-3" />
            Closed
          </span>
        ) : (() => {
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
  )
}

const Sprints = ({
  sprints,
  idscrumstep,
  isClosed = false,
  openCreateModal,
  openConfirmDeleteSprint,
  openEditModal,
}: Props) => {
  const [selectedSprints, setSelectedSprints] = useState<SprintType[]>()
  const { setSprintSelected, setIsOpenSprintDetails } = useSelectContext()
  const { myTeam } = useApiRoutes()

  const { setNodeRef, isOver } = useDroppable({
    id: idscrumstep,
    disabled: isClosed,
  })

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
      ref={setNodeRef}
      className={`flex flex-col flex-1 min-h-[60px] rounded-xl transition-colors duration-150 ${
        isOver && !isClosed ? 'bg-violet-500/10 ring-1 ring-violet-400/30' : ''
      }`}
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
            <SprintCard
              key={sprint.idsprint}
              sprint={sprint}
              isClosed={isClosed}
              onSelect={onSelectSprint}
              onEdit={(s) => { setSprintSelected(s); openEditModal() }}
              onDelete={(s) => { setSprintSelected(s); openConfirmDeleteSprint() }}
              getDeadlineInfo={getDeadlineInfo}
              getSprintMembers={getSprintMembers}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Sprints
