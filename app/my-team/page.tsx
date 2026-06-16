'use client'

import AddMemberModal from '@/src/components/modal/AddMemberModal'
import CreateTeamModal from '@/src/components/modal/CreateTeamModal'
import TeamList from '@/src/components/TeamList'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import axios from 'axios'
import React, { useState } from 'react'
import ConfirmDelete from '@/src/components/modal/ConfirmDelete'

const Page = () => {
  const { myTeam, user, refreshData } = useApiRoutes()
  const [isOpenModalCreateTeam, setIsOpenModalCreateTeam] = useState(false)
  const [isOpenAddMember, setIsOpenAddMember] = useState(false)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [confirmTransfer, setConfirmTransfer] = useState<number | null>(null)

  const removeMember = async (iduser: number) => {
    try {
      await axios.delete('/api/remove-team-member', { data: { iduser } })
      refreshData()
    } catch (error) {
      console.error('Failed to remove member', error)
    }
  }

  const leaveTeam = async () => {
    try {
      await axios.patch('/api/leave-team', { iduser: user.iduser })
      refreshData()
    } catch {}
  }

  const transferLeadership = async () => {
    if (!confirmTransfer || !user.iduser || !user.idteam) return
    try {
      await axios.patch('/api/transfer-leadership', {
        currentLeaderId: user.iduser,
        newLeaderId: confirmTransfer,
        idteam: user.idteam,
      })
      refreshData()
    } catch {}
    setConfirmTransfer(null)
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
              onTransferLeadership={(iduser) => setConfirmTransfer(iduser)}
              onLeaveTeam={() => setConfirmLeave(true)}
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

      <ConfirmDelete
        isOpen={confirmLeave}
        closeCreateModal={() => setConfirmLeave(false)}
        confirmDeletion={leaveTeam}
        title="Leave the team?"
        description="You will lose access to all team boards and sprints."
        confirmLabel="Leave"
      />
      <ConfirmDelete
        isOpen={!!confirmTransfer}
        closeCreateModal={() => setConfirmTransfer(null)}
        confirmDeletion={transferLeadership}
        title="Transfer leadership?"
        description="This member will become the new team leader."
        confirmLabel="Transfer"
      />
    </div>
  )
}

export default Page
