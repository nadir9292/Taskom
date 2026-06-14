'use client'

import EditProfileModal from '@/src/components/modal/EditProfileModal'
import ProfileCard from '@/src/components/ProfileCard'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { useState } from 'react'

const Page = () => {
  const { user, refreshData } = useApiRoutes()
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false)

  if (!user?.email) return <div>Loading...</div>

  return (
    <div>
      <ProfileCard user={user} onEdit={() => setIsOpenEditProfile(true)} />
      <EditProfileModal
        user={user}
        isOpen={isOpenEditProfile}
        closeModal={() => setIsOpenEditProfile(false)}
        onSaved={refreshData}
      />
    </div>
  )
}

export default Page
