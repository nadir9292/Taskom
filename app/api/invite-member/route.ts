import { supabase } from '@/src/lib/supabaseClient'
import { sendInviteEmail, sendRegisterAndInviteEmail } from '@/src/lib/emailClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { email, idteam } = await req.json()

    const { data: team } = await supabase
      .from('team')
      .select('name')
      .eq('idteam', idteam)
      .single()

    const teamName = team?.name || 'une équipe'

    const { data: existingInvite } = await supabase
      .from('TeamInvitation')
      .select('id')
      .eq('email', email)
      .eq('idteam', idteam)
      .eq('status', 'pending')
      .maybeSingle()

    if (existingInvite) {
      return NextResponse.json({ message: 'Invitation déjà envoyée' }, { status: 400 })
    }

    const { data: invitation, error: inviteError } = await supabase
      .from('TeamInvitation')
      .insert({ email, idteam })
      .select('token')
      .single()

    if (inviteError || !invitation) throw inviteError

    const { data: existingUser } = await supabase
      .from('User')
      .select('iduser')
      .eq('email', email)
      .maybeSingle()

    if (existingUser) {
      await sendInviteEmail(email, teamName, invitation.token)
    } else {
      await sendRegisterAndInviteEmail(email, teamName, invitation.token)
    }

    return NextResponse.json({ message: 'Invitation envoyée.' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
