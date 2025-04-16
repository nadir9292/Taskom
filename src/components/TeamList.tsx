import { UserType } from '@/src/types/UserType'
import Image from 'next/image'
import React from 'react'

type Props = { myTeam: UserType[] }

const TeamList = ({ myTeam }: Props) => {
  return (
    <div className="mx-auto w-[95vw] md:w-[70vw]">
      <ul className="mt-10 py-2 rounded-[22px] list max-h-[650px] overflow-auto shadow-lg bg-white/60 backdrop-blur-lg">
        <li className="list-row p-4 pb-2 text-xs opacity-60 tracking-wide">
          <p className="font-bold">Your team</p>
          <p></p>
          <h1 className="italic">sprint counter</h1>
        </li>
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
                className="shadow-xl rounded-[22px] object-cover"
              />
            </div>
            <div>
              <div>
                {teammate.firstname}{' '}
                <span className="uppercase">{teammate.lastname}</span>
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {teammate.job}
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
