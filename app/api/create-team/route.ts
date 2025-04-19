import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { data: teamData, error: insertError } = await supabase
      .from('team')
      .insert({
        idleader: data.idleader,
        name: data.name,
      })
      .select('idteam')
      .single()

    if (insertError) throw insertError

    await supabase
      .from('User')
      .update({
        idteam: teamData.idteam,
      })
      .eq('iduser', data.idleader)

    return NextResponse.json('Team has been created.', { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
