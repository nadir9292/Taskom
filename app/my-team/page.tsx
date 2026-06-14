'use client'

import AddMemberModal from '@/src/components/modal/AddMemberModal'
import CreateTeamModal from '@/src/components/modal/CreateTeamModal'
import TeamList from '@/src/components/TeamList'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import axios from 'axios'
import React, { useState } from 'react'

const Page = () => {
  const { myTeam, user, refreshData } = useApiRoutes()
  const [isOpenModalCreateTeam, setIsOpenModalCreateTeam] = useState(false)
  const [isOpenAddMember, setIsOpenAddMember] = useState(false)

  const removeMember = async (iduser: number) => {
    try {
      await axios.delete('/api/remove-team-member', { data: { iduser } })
      refreshData()
    } catch (error) {
      console.error('Failed to remove member', error)
    }
  }

  return (
    <div>
      {user && user.idteam ? (
        myTeam ? (
          <>
            <TeamList
              myTeam={myTeam}
              currentUser={user}
              onAddMember={() => setIsOpenAddMember(true)}
              onRemoveMember={removeMember}
            />
            {user.role === 'leader' && (
              <AddMemberModal
                idteam={user.idteam}
                isOpen={isOpenAddMember}
                closeModal={() => setIsOpenAddMember(false)}
              />
            )}
          </>
        ) : (
          <div>Loading team...</div>
        )
      ) : user ? (
        <div className="flex justify-center gap-3 mt-8">
          <button
            className="btn-violet py-3 px-6 text-sm"
            onClick={() => setIsOpenModalCreateTeam(true)}
          >
            New team
          </button>
          <button className="btn-glass py-3 px-6 text-sm">Join team</button>
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
