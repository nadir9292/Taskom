import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { newLeaderId, idteam } = await req.json()

    const { data: sessionUser, error: userError } = await supabase
      .from('User')
      .select('iduser, role, idteam')
      .eq('email', session.user.email)
      .single()

    if (userError || !sessionUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (sessionUser.role !== 'leader' || String(sessionUser.idteam) !== String(idteam)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const [demote, promote] = await Promise.all([
      supabase
        .from('User')
        .update({ role: 'member' })
        .eq('iduser', sessionUser.iduser)
        .eq('idteam', idteam),
      supabase
        .from('User')
        .update({ role: 'leader' })
        .eq('iduser', newLeaderId)
        .eq('idteam', idteam),
    ])

    if (demote.error || promote.error) throw demote.error ?? promote.error

    return NextResponse.json('Leadership transferred.', { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
