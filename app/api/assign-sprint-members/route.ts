import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest) {
  try {
    const { idsprint, members, leaderId } = await req.json()

    if (!idsprint) {
      return NextResponse.json({ message: 'Missing idsprint' }, { status: 400 })
    }

    const safemembers: number[] = Array.isArray(members) ? members : []
    const safeLeader = leaderId ?? safemembers[0] ?? null

    const { error } = await supabase
      .from('sprint')
      .update({
        iduseraffected: safeLeader,
        history: JSON.stringify({ members: safemembers }),
      })
      .eq('idsprint', idsprint)

    if (error) throw error

    return NextResponse.json('members updated', { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
