import { UserType } from '@/src/types/UserType'
import Image from 'next/image'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerOnAppear } from '@/src/motion-tools/onAppear'

type Props = { myTeam: UserType[] }

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const TeamList = ({ myTeam }: Props) => {
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
                <div className="px-5 py-3 border-b border-white/8 flex justify-between items-center">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">
                    Your team
                  </p>
                  <p className="text-xs text-white/30 italic">sprint counter</p>
                </div>

                {myTeam.map((teammate, index) => (
                  <motion.div
                    variants={itemVariants}
                    key={index}
                    className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/4 transition-colors"
                  >
                    <Image
                      src={teammate.profileimage || '/default-profile.png'}
                      width={38}
                      height={38}
                      quality={40}
                      priority
                      alt="profile"
                      className="rounded-xl border border-white/12 object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-white/85 font-medium">
                        {teammate.firstname}{' '}
                        <span className="uppercase">{teammate.lastname}</span>
                      </p>
                      <p className="text-xs text-white/35 uppercase tracking-wide mt-0.5">
                        {teammate.job}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="glass-badge">Doing: 0</span>
                      <span
                        className="glass-badge"
                        style={{
                          background: 'rgba(6, 182, 212, 0.15)',
                          borderColor: 'rgba(6, 182, 212, 0.3)',
                          color: '#67e8f9',
                        }}
                      >
                        Pending: 0
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TeamList
