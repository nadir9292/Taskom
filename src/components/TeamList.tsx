import { UserType } from '@/src/types/UserType'
import Image from 'next/image'
import React from 'react'

type Props = { myTeam: UserType[] }

const TeamList = ({ myTeam }: Props) => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-center mt-6 text-3xl font-bold">Your team</h1>
      <ul className="mt-10 rounded-2xl list">
        {myTeam?.map((teammate, index) => (
          <li className="list-row" key={index}>
            <div>
              <Image
                src={teammate.profileimage || '/default-profile.png'}
                width={50}
                height={50}
                quality={70}
                priority
                alt="profile image team"
                className="shadow-xl rounded-xl object-cover"
              />
            </div>
            <div>
              <div>
                {teammate.firstname}{' '}
                <span className="uppercase">{teammate.lastname}</span>
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                Developper
              </div>
            </div>
            <div
              className="badge badge-primary badge-xs md:badge-md"
              style={{ padding: '8px' }}
            >
              Doing : <span className="font-bold">0</span>
            </div>
            <div
              className="badge badge-secondary badge-xs md:badge-md"
              style={{ padding: '8px' }}
            >
              Pending : <span className="font-bold">0</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TeamList
