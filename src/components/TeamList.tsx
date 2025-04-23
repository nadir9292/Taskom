import { UserType } from '@/src/types/UserType'
import Image from 'next/image'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerOnAppear } from '@/src/motion-tools/onAppear'

type Props = { myTeam: UserType[] }

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="mx-auto w-[95vw] md:w-[70vw]">
              <ul className="mt-4 py-2 rounded-[22px] max-h-[650px] overflow-auto shadow-lg bg-white/50">
                <li className="list-row p-4 pb-2 opacity-60 tracking-wide text-xs flex justify-between">
                  <p className="font-bold">Your team</p>
                  <h1 className="italic">sprint counter</h1>
                </li>
                {myTeam.map((teammate, index) => (
                  <motion.li
                    variants={itemVariants}
                    key={index}
                    className="list-row p-4 flex items-center gap-4"
                  >
                    <Image
                      src={teammate.profileimage || '/default-profile.png'}
                      width={40}
                      height={40}
                      quality={40}
                      priority
                      alt="profile image team"
                      className="shadow-xl rounded-[22px] object-cover"
                    />
                    <div className="flex-1 text-sm md:text-md">
                      <div>
                        {teammate.firstname}{' '}
                        <span className="uppercase">{teammate.lastname}</span>
                      </div>
                      <div className="uppercase font-medium opacity-60">
                        {teammate.job}
                      </div>
                    </div>
                    <div className="badge badge-primary badge-xs md:badge-sm">
                      Doing : <span className="font-bold">0</span>
                    </div>
                    <div className="badge badge-secondary badge-xs md:badge-sm">
                      Pending : <span className="font-bold">0</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TeamList
