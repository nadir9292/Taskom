'use client'

import Index from '@/src/components/Index'
import ProfileFillModal from '@/src/components/modal/ProfileFillModal'
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

  return (
    <>
      {user && user.idteam ? (
        <Index user={user} />
      ) : (
        <div className="text-center">you are alone...</div>
      )}

      {user && (
        <ProfileFillModal
          userCheck={user}
          isOpen={isModalVisible}
          closeCreateModal={() => setIsModalVisible(false)}
        />
      )}
    </>
  )
}

export default Home
