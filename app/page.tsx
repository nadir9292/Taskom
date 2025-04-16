'use client'

import Index from '@/src/components/Index'
import ProfileFillModal from '@/src/components/ProfileFillModal'
import { useEffect, useState } from 'react'
import { useApiRoutes } from '@/src/contexts/ApiContext'

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
      {user && user.idteam ? (
        <Index />
      ) : (
        <div className="text-center">you are alone...</div>
      )}

      <ProfileFillModal userCheck={user!} />
    </>
  )
}

export default Home
