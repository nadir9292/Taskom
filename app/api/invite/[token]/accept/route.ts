import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { token } = await params

  const { data: invitation, error } = await supabase
    .from('TeamInvitation')
    .select('id, email, idteam, status, expires_at')
    .eq('token', token)
    .single()

  if (error || !invitation) {
    return NextResponse.json({ message: 'Invitation introuvable' }, { status: 404 })
  }

  if (invitation.status !== 'pending') {
    return NextResponse.json({ message: 'Invitation déjà utilisée' }, { status: 400 })
  }

  if (new Date(invitation.expires_at) < new Date()) {
    return NextResponse.json({ message: 'Invitation expirée' }, { status: 400 })
  }

  if (invitation.email !== session.user.email) {
    return NextResponse.json({ message: "Cette invitation ne t'est pas destinée" }, { status: 403 })
  }

  const { data: user, error: userError } = await supabase
    .from('User')
    .select('iduser, idteam')
    .eq('email', session.user.email)
    .single()

  if (userError || !user) {
    return NextResponse.json({ message: 'Utilisateur introuvable' }, { status: 404 })
  }

  if (user.idteam) {
    return NextResponse.json({ message: 'Tu es déjà dans une équipe' }, { status: 400 })
  }

  await supabase.from('User').update({ idteam: invitation.idteam }).eq('iduser', user.iduser)
  await supabase.from('TeamInvitation').update({ status: 'accepted' }).eq('id', invitation.id)

  return NextResponse.json({ message: 'Invitation acceptée.' }, { status: 200 })
}
