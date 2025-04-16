import { useApiRoutes } from '@/src/contexts/ApiContext'
import React from 'react'

type Props = object

const Loading = ({}: Props) => {
  const { user } = useApiRoutes()

  if (Object.keys(user).length < 0) return

  return (
    <div className="z-50">
      <h1 className="text-center">Loading...</h1>
    </div>
  )
}

export default Loading
