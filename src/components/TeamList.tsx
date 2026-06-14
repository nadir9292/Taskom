import { UserType } from '@/src/types/UserType'
import Image from 'next/image'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerOnAppear } from '@/src/motion-tools/onAppear'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useApiRoutes } from '@/src/contexts/ApiContext'

type Props = {
  myTeam: UserType[]
  currentUser: UserType
  onAddMember: () => void
  onRemoveMember: (iduser: number) => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const TeamList = ({ myTeam, currentUser, onAddMember, onRemoveMember }: Props) => {
  const { scrumtabs } = useApiRoutes()
  const { sprints, scrumsteps } = scrumtabs

  const getSprintCountsByUser = (iduser: number) => {
    const userSprints = sprints.filter((s) => s.iduseraffected === iduser)
    const counts: Record<string, { count: number; color: string }> = {}
    for (const sprint of userSprints) {
      const step = scrumsteps.find((s) => s.idscrumstep === sprint.idscrumstep)
      if (!step) continue
      if (!counts[step.title]) counts[step.title] = { count: 0, color: step.color }
      counts[step.title].count++
    }
    return counts
  }

  const isLeader = currentUser.role === 'leader'

  return (
    <div>
      <AnimatePresence>
        {myTeam.length > 0 && (
          <motion.div
            variants={containerOnAppear}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 16 }}
          >
            <div className="mx-auto w-[95vw] md:w-[70vw]">
              <div className="mt-4 glass rounded-2xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-white/8 flex justify-between items-center">
                  <p className="text-xs text-white/55 font-semibold uppercase tracking-wider">
                    Your team
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-white/35">Sprint counter</p>
                    {isLeader && (
                      <button
                        onClick={onAddMember}
                        className="btn-glass flex items-center gap-1 py-1 px-2.5 text-xs"
                      >
                        <PlusIcon className="w-3.5 h-3.5" />
                        Add member
                      </button>
                    )}
                  </div>
                </div>

                {myTeam.map((teammate, index) => {
                  const counts = getSprintCountsByUser(teammate.iduser!)
                  const hasNoSprints = Object.keys(counts).length === 0

                  return (
                    <motion.div
                      variants={itemVariants}
                      key={index}
                      className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors duration-200"
                    >
                      <Image
                        src={teammate.profileimage || '/default-profile.png'}
                        width={38}
                        height={38}
                        quality={40}
                        priority
                        alt="profile"
                        className="rounded-xl border border-white/14 object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm text-white/90 font-medium truncate">
                            {teammate.firstname}{' '}
                            <span className="uppercase">{teammate.lastname}</span>
                          </p>
                          {teammate.role === 'leader' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 font-semibold shrink-0">
                              Leader
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/45 uppercase tracking-wide mt-0.5 truncate">
                          {teammate.job}
                        </p>
                        {!hasNoSprints && (
                          <div className="flex flex-wrap gap-1.5 mt-2 sm:hidden">
                            {Object.entries(counts).map(([title, { count, color }]) => (
                              <span
                                key={title}
                                className="glass-badge"
                                style={{
                                  background: `${color}22`,
                                  borderColor: `${color}44`,
                                  color,
                                }}
                              >
                                {title}: {count}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end">
                        {hasNoSprints ? (
                          <span className="text-xs text-white/25">—</span>
                        ) : (
                          Object.entries(counts).map(([title, { count, color }]) => (
                            <span
                              key={title}
                              className="glass-badge"
                              style={{
                                background: `${color}22`,
                                borderColor: `${color}44`,
                                color,
                              }}
                            >
                              {title}: {count}
                            </span>
                          ))
                        )}
                      </div>

                      {isLeader && teammate.iduser !== currentUser.iduser && (
                        <button
                          onClick={() => onRemoveMember(teammate.iduser!)}
                          className="p-1.5 rounded-lg hover:bg-red-500/15 transition-colors shrink-0"
                          title="Remove from team"
                        >
                          <XMarkIcon className="w-3.5 h-3.5 text-white/40 hover:text-red-400" />
                        </button>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TeamList
