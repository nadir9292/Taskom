import { motion, AnimatePresence } from 'framer-motion'
import { useSelectContext } from '@/src/contexts/SelectedContext'
import { XMarkIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import axios from 'axios'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import SnackBar from '@/src/components/utils/SnackBar'
import { useApiRoutes } from '@/src/contexts/ApiContext'

type Props = {
  isOpen: boolean
  closeSprintDetails: () => void
  scrumSteps: ScrumStepType[]
}

type HistoryStep = { from: string; to: string; at: string }

const SprintDetails = ({ isOpen, closeSprintDetails, scrumSteps }: Props) => {
  const { refreshData, myTeam, user } = useApiRoutes()
  const { sprintSelected, setSprintSelected } = useSelectContext()
  const [snackBar, setSnackBar] = useState<{ error: SnackBarStatus; success: SnackBarStatus }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })

  const getMemberName = (iduser: number) => {
    const m = myTeam.find((u) => u.iduser === iduser)
    if (!m) return 'Unknown'
    return `${m.firstname} ${m.lastname?.toUpperCase()}`
  }

  const showError = (message: string) => {
    setSnackBar((prev) => ({ ...prev, error: { message, active: true } }))
    setTimeout(() => setSnackBar((prev) => ({ ...prev, error: { message: null, active: false } })), 3000)
  }

  const showSuccess = (message: string) => {
    setSnackBar((prev) => ({ ...prev, success: { message, active: true } }))
    setTimeout(() => setSnackBar((prev) => ({ ...prev, success: { message: null, active: false } })), 3000)
  }

  const updateMembers = async (members: number[], leaderId: number | null) => {
    if (!sprintSelected?.idsprint) return
    try {
      await axios.patch('/api/assign-sprint-members', {
        idsprint: sprintSelected.idsprint,
        members,
        leaderId,
      })
      setSprintSelected({ ...sprintSelected, members, iduseraffected: leaderId ?? undefined })
      await refreshData()
    } catch {
      showError('Failed to update members.')
    }
  }

  const handleSetLeader = async (iduser: number) => {
    const members = sprintSelected?.members ?? []
    await updateMembers(members, iduser)
    showSuccess(`${getMemberName(iduser)} set as leader.`)
  }

  const handleRemoveMember = async (iduser: number) => {
    const members = (sprintSelected?.members ?? []).filter((id) => id !== iduser)
    const currentLeader = sprintSelected?.iduseraffected
    const newLeader = currentLeader === iduser ? (members[0] ?? null) : (currentLeader ?? null)
    await updateMembers(members, newLeader)
    showSuccess(`${getMemberName(iduser)} removed.`)
  }

  const handleAddMember = async (iduser: number) => {
    const members = [...(sprintSelected?.members ?? []), iduser]
    const leader = sprintSelected?.iduseraffected ?? members[0] ?? null
    await updateMembers(members, leader)
    showSuccess(`${getMemberName(iduser)} added.`)
  }

  const updateSprintStep = async (step: ScrumStepType) => {
    const currentStep = scrumSteps.find((s) => s.idscrumstep === sprintSelected?.idscrumstep)
    try {
      await axios.post('/api/update-step-sprint', {
        idsprint: sprintSelected?.idsprint,
        idStep: step.idscrumstep,
        fromTitle: currentStep?.title,
        toTitle: step.title,
      })
      await refreshData()
      showSuccess(`Moved to ${step.title}`)
    } catch {
      showError('Failed to change status.')
    }
  }

  const getHistorySteps = (): HistoryStep[] => {
    try {
      const parsed = JSON.parse(sprintSelected?.history ?? '{}')
      return Array.isArray(parsed.steps) ? parsed.steps : []
    } catch {
      return []
    }
  }

  if (!isOpen) return null

  const members = sprintSelected?.members ?? []
  const leaderId = sprintSelected?.iduseraffected
  const unassigned = myTeam.filter((m) => !members.includes(m.iduser!))
  const historySteps = getHistorySteps()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 h-full w-full z-50"
          style={{ backdropFilter: 'blur(16px)', background: 'rgba(4, 4, 20, 0.62)' }}
          onClick={closeSprintDetails}
        >
          <motion.div
            className="glass-strong absolute inset-x-0 mx-auto bottom-0 p-5 max-w-2xl w-[95vw] max-h-[90%] rounded-t-2xl flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={closeSprintDetails}
                className="p-1.5 rounded-lg hover:bg-white/8 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-white/60" />
              </button>
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <span className="glass-badge">{sprintSelected?.tag}</span>
            </div>

            <h1 className="text-lg font-semibold text-white text-center mb-1.5">
              {sprintSelected?.title}
            </h1>
            <p className="text-xs text-white/50 text-center font-light mb-5">
              {sprintSelected?.startdate
                ? new Date(sprintSelected.startdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : '-'}
              {' - '}
              {sprintSelected?.enddate
                ? new Date(sprintSelected.enddate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : '-'}
            </p>

            <div className="space-y-3 flex-1 overflow-y-auto">
              <div className="glass-card rounded-xl p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-2">Members</p>
                <div className="flex flex-wrap gap-2">
                  {members.map((iduser) => {
                    const isLeader = iduser === leaderId
                    const isMe = iduser === user.iduser
                    return (
                      <div key={iduser} className="flex items-center gap-1">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                            isLeader
                              ? 'border-yellow-400/50 bg-yellow-500/15 text-yellow-200'
                              : 'border-violet-400/40 bg-violet-500/15 text-white/80'
                          }`}
                        >
                          {isLeader && <StarSolid className="w-3 h-3 text-yellow-300" />}
                          {getMemberName(iduser)}{isMe ? ' (me)' : ''}
                        </span>
                        {!isLeader && (
                          <button
                            onClick={() => handleSetLeader(iduser)}
                            className="p-1 rounded-lg border border-white/10 bg-white/5 text-white/25 hover:text-yellow-300/70 transition-colors"
                            title="Set as leader"
                          >
                            <StarIcon className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveMember(iduser)}
                          className="p-1 rounded-lg border border-white/10 bg-white/5 text-white/25 hover:text-red-400/70 transition-colors"
                          title="Remove"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </div>
                    )
                  })}
                  {unassigned.length > 0 && (
                    <select
                      className="text-xs px-2.5 py-1 rounded-lg border border-dashed border-white/20 bg-white/5 text-white/40 hover:text-white/60 transition-colors cursor-pointer"
                      value=""
                      onChange={(e) => { if (e.target.value) handleAddMember(Number(e.target.value)) }}
                    >
                      <option value="" disabled>+ Add member</option>
                      {unassigned.map((m) => (
                        <option key={m.iduser} value={m.iduser}>
                          {m.firstname} {m.lastname?.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="glass-card rounded-xl p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">Created by</p>
                <p className="text-sm text-white/80">
                  {sprintSelected?.idusercreator ? getMemberName(sprintSelected.idusercreator) : '-'}
                </p>
              </div>

              <div className="glass-card rounded-xl p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">Short description</p>
                <p className="text-sm text-white/80 leading-relaxed">{sprintSelected?.shortdescription || '-'}</p>
              </div>

              <div className="glass-card rounded-xl p-3">
                <p className="text-[10px] text-white/45 uppercase tracking-wider font-semibold mb-1.5">Long description</p>
                <p className="text-sm text-white/80 leading-relaxed">{sprintSelected?.longdescription || '-'}</p>
              </div>

              {historySteps.length > 0 && (
                <div className="glass-card rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ClockIcon className="w-3 h-3 text-white/40" />
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">History</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {historySteps.map((entry, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                        <span className="text-white/35 tabular-nums shrink-0">
                          {new Date(entry.at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </span>
                        <span className="text-white/40">{entry.from}</span>
                        <span className="text-white/25">→</span>
                        <span className="text-violet-300/80">{entry.to}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-white/8">
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold text-center mb-3">Move to</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[...scrumSteps]
                  .sort((a, b) => a.order - b.order)
                  .map((step) => (
                    <button
                      key={step.idscrumstep}
                      className="btn-glass text-xs py-1.5 px-3"
                      onClick={() => updateSprintStep(step)}
                    >
                      {step.title}
                    </button>
                  ))}
              </div>
            </div>

            <SnackBar error={snackBar.error} success={snackBar.success} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SprintDetails
