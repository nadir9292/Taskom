'use client'

import { UserType } from '@/src/types/UserType'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PencilIcon } from '@heroicons/react/24/outline'
import { itemOnAppear } from '@/src/motion-tools/onAppear'

type Props = {
  user: UserType
  onEdit: () => void
}

const ProfileCard = ({ user, onEdit }: Props) => {
  return (
    <motion.div
      variants={itemOnAppear}
      initial="hidden"
      animate="visible"
      className="mx-auto w-[95vw] md:w-[70vw] mt-4"
    >
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/8 flex justify-between items-center">
          <p className="text-xs text-white/55 font-semibold uppercase tracking-wider">
            My profile
          </p>
          <button onClick={onEdit} className="btn-glass flex items-center gap-1 py-1 px-2.5 text-xs">
            <PencilIcon className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        <div className="flex items-center gap-4 px-5 py-4">
          <Image
            src={user.profileimage || '/default-profile.png'}
            width={56}
            height={56}
            quality={60}
            priority
            alt="profile"
            className="rounded-xl border border-white/14 object-cover shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-base text-white/90 font-medium">
                {user.firstname} <span className="uppercase">{user.lastname}</span>
              </p>
              {user.role === 'leader' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 font-semibold shrink-0">
                  Leader
                </span>
              )}
            </div>
            <p className="text-xs text-white/45 uppercase tracking-wide mt-0.5">{user.job}</p>
            <p className="text-xs text-white/30 mt-1">{user.email}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileCard
