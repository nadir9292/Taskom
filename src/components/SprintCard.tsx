import Image from 'next/image'
import React from 'react'

type Props = object

const SprintCard = ({}: Props) => {
  return (
    <div className="card my-4 px-2 py-1 bg-base-200 card-xs shadow-sm">
      <div className="card-body">
        <h2 className="badge badge-primary badge-sm">sprint tag</h2>
        <p>short description of sprint here</p>
        <div className="justify-between card-actions mt-2">
          <Image
            priority
            alt="icon member"
            src="/icon-example.png"
            className="rounded-full border"
            width={15}
            height={15}
          />
          <button className="">3 days remaining</button>
        </div>
      </div>
    </div>
  )
}

export default SprintCard
