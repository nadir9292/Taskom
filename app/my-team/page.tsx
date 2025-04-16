'use client'

import CreateTeamModal from '@/src/components/CreateTeamModal'
import TeamList from '@/src/components/TeamList'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import React from 'react'

const Page = () => {
  const { myTeam, user } = useApiRoutes()

  return (
    <div>
      {user && user.idteam ? (
        <TeamList myTeam={myTeam!} />
      ) : (
        <div>
          <CreateTeamModal user={user!} />
        </div>
      )}
    </div>
  )
}

export default Page
