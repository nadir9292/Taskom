'use client'

import CreateTeamModal from '@/src/components/modal/CreateTeamModal'
import TeamList from '@/src/components/TeamList'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import React, { useState } from 'react'

const Page = () => {
  const { myTeam, user } = useApiRoutes()
  const [isOpenModalCreateTeam, setIsOpenModalCreateTeam] =
    useState<boolean>(false)

  return (
    <div>
      {user && user.idteam ? (
        myTeam ? (
          <TeamList myTeam={myTeam} />
        ) : (
          <div>Loading team...</div>
        )
      ) : user ? (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setIsOpenModalCreateTeam(true)}
          >
            New team
          </button>
          <button className="btn btn-secondary btn-lg">Join team</button>
          <CreateTeamModal
            user={user}
            isOpen={isOpenModalCreateTeam}
            closeCreateModal={() => setIsOpenModalCreateTeam(false)}
          />
        </div>
      ) : (
        <div>Loading user...</div>
      )}
    </div>
  )
}

export default Page
