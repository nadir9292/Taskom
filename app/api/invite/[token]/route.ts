import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const { data: invitation, error } = await supabase
    .from('TeamInvitation')
    .select('email, idteam, status, expires_at')
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

  const { data: team } = await supabase
    .from('team')
    .select('name')
    .eq('idteam', invitation.idteam)
    .single()

  return NextResponse.json({
    email: invitation.email,
    idteam: invitation.idteam,
    teamName: team?.name || 'Équipe inconnue',
  }, { status: 200 })
}
