'use client'

import CreateTeamModal from '@/src/components/modal/CreateTeamModal'
import TeamList from '@/src/components/TeamList'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import React from 'react'

const Page = () => {
  const { myTeam, user } = useApiRoutes()

  return (
    <div>
      {user && user.idteam ? (
        myTeam ? (
          <TeamList myTeam={myTeam} />
        ) : (
          <div>Loading team...</div>
        )
      ) : user ? (
        <CreateTeamModal user={user} />
      ) : (
        <div>Loading user...</div>
      )}
    </div>
  )
}

export default Page
