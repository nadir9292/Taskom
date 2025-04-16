'use client'

import CreateTeamModal from '@/src/components/CreateTeamModal'
import TeamList from '@/src/components/TeamList'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { UserType } from '@/src/types/UserType'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { user } = useApiRoutes()
  const [myTeam, setMyTeam] = useState<UserType[]>()

  useEffect(() => {
    if (!user || !user.idteam) return

    const fetchTeam = async () => {
      try {
        const res = await axios.get(`/api/get-my-team?idteam=${user.idteam}`)
        setMyTeam(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchTeam()
  }, [user])

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
