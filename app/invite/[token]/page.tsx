'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type InviteInfo = {
  email: string
  idteam: number
  teamName: string
}

type Props = {
  params: Promise<{ token: string }>
}

const InvitePage = ({ params }: Props) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [invite, setInvite] = useState<InviteInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAccepting, setIsAccepting] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    params.then(({ token }) => setToken(token))
  }, [params])

  useEffect(() => {
    if (!token) return
    const fetchInvite = async () => {
      try {
        const { data } = await axios.get(`/api/invite/${token}`)
        setInvite(data)
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Invitation invalide')
      } finally {
        setIsLoading(false)
      }
    }
    fetchInvite()
  }, [token])

  const accept = async () => {
    if (!session?.user?.email || !token) return
    setIsAccepting(true)
    try {
      await axios.post(`/api/invite/${token}/accept`, { userEmail: session.user.email })
      setAccepted(true)
      setTimeout(() => router.push('/my-team'), 2000)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Échec de l'acceptation")
    } finally {
      setIsAccepting(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-dots loading-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-20 gap-4">
        <p className="text-red-400 text-lg">{error}</p>
        <button className="btn btn-primary" onClick={() => router.push('/')}>
          Retour à l&apos;accueil
        </button>
      </div>
    )
  }

  if (accepted) {
    return (
      <div className="flex flex-col items-center mt-20 gap-4">
        <p className="text-green-400 text-xl font-semibold">
          Tu as rejoint {invite?.teamName} !
        </p>
      </div>
    )
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="glass p-8 rounded-2xl flex flex-col items-center gap-5 max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-white">Invitation</h1>
        <p className="text-white/70 text-center">
          Tu as été invité à rejoindre{' '}
          <span className="text-white font-medium">{invite?.teamName}</span>
        </p>

        {status === 'authenticated' ? (
          session?.user?.email === invite?.email ? (
            <button
              className="btn-violet btn-violet-lg w-full"
              onClick={accept}
              disabled={isAccepting}
            >
              {isAccepting ? (
                <span className="loading loading-dots loading-md" />
              ) : (
                "Accepter l'invitation"
              )}
            </button>
          ) : (
            <p className="text-red-400 text-sm text-center">
              Cette invitation est destinée à <strong>{invite?.email}</strong>, mais tu es connecté
              avec <strong>{session?.user?.email}</strong>.
            </p>
          )
        ) : (
          <button
            className="btn-violet btn-violet-lg w-full"
            onClick={() => router.push(`/login?callbackUrl=/invite/${token}`)}
          >
            Se connecter pour accepter
          </button>
        )}
      </div>
    </div>
  )
}

export default InvitePage
