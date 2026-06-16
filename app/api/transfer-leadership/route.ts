import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest) {
  try {
    const { currentLeaderId, newLeaderId, idteam } = await req.json()

    const [demote, promote] = await Promise.all([
      supabase
        .from('User')
        .update({ role: 'member' })
        .eq('iduser', currentLeaderId)
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
