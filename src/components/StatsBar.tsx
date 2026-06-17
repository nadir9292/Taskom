'use client'

import { SprintType } from '@/src/types/SprintType'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type Props = {
  sprints: SprintType[]
  scrumsteps: ScrumStepType[]
}

const StatsBar = ({ sprints, scrumsteps }: Props) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const overdue = sprints.filter((s) => {
    if (!s.enddate) return false
    const end = new Date(s.enddate)
    end.setHours(0, 0, 0, 0)
    return end < today
  })

  const sortedSteps = [...scrumsteps].sort((a, b) => a.order - b.order)

  return (
    <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto flex-nowrap">
      <div className="glass-card rounded-xl px-3 py-1.5 flex items-center gap-2">
        <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Total</span>
        <span className="text-sm font-semibold text-white/85 tabular-nums">{sprints.length}</span>
      </div>

      {overdue.length > 0 && (
        <div className="glass-card rounded-xl px-3 py-1.5 flex items-center gap-1.5 border border-red-400/25 bg-red-500/8">
          <ExclamationTriangleIcon className="w-3.5 h-3.5 text-red-400" />
          <span className="text-[10px] text-red-300/80 uppercase tracking-wider font-semibold">Overdue</span>
          <span className="text-sm font-semibold text-red-300 tabular-nums">{overdue.length}</span>
        </div>
      )}

      {sortedSteps.map((step) => {
        const count = sprints.filter((s) => s.idscrumstep === step.idscrumstep).length
        return (
          <div key={step.idscrumstep} className="glass-card rounded-xl px-3 py-1.5 flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: step.color && step.color !== '#F5F5F5' ? step.color : 'rgba(255,255,255,0.3)' }}
            />
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold truncate max-w-[80px]">
              {step.title}
            </span>
            <span className="text-sm font-semibold text-white/85 tabular-nums">{count}</span>
          </div>
        )
      })}
    </div>
  )
}

export default StatsBar
