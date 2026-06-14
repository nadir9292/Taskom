import Image from 'next/image'
import { UserType } from '@/src/types/UserType'

type Props = {
  user: UserType
  size?: number
  className?: string
}

const getInitials = (user: UserType) =>
  `${user.firstname?.[0] ?? ''}${user.lastname?.[0] ?? ''}`.toUpperCase()

const UserAvatar = ({ user, size = 20, className = '' }: Props) => {
  const style = { width: size, height: size, minWidth: size }

  if (user.profileimage) {
    return (
      <Image
        src={user.profileimage}
        alt={`${user.firstname} ${user.lastname}`}
        width={size}
        height={size}
        className={`rounded-full object-cover border border-white/20 shrink-0 ${className}`}
      />
    )
  }

  return (
    <div
      style={style}
      className={`rounded-full bg-violet-500/40 border border-white/20 flex items-center justify-center text-[9px] font-semibold text-white/80 shrink-0 ${className}`}
      title={`${user.firstname} ${user.lastname}`}
    >
      {getInitials(user)}
    </div>
  )
}

export default UserAvatar
