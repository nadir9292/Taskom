'use client'

import Index from '@/src/components/Index'
import ProfileFillModal from '@/src/components/ProfileFillModal'
import { useEffect, useState } from 'react'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import CreateTeamModal from '@/src/components/CreateTeamModal'

const Home = () => {
  const { user } = useApiRoutes()
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (user && user.firstname !== undefined) {
      if (!user.firstname?.trim()) {
        setIsModalVisible(true)
      } else {
        setIsModalVisible(false)
      }
    }
  }, [user])

  useEffect(() => {
    const modal = document.getElementById('profileFill') as HTMLDialogElement
    if (isModalVisible && modal) {
      modal.showModal()
    }
  }, [isModalVisible])

  return (
    <>
      <Index />
      <CreateTeamModal user={user!} />
      <ProfileFillModal userCheck={user!} />
    </>
  )
}

export default Home
