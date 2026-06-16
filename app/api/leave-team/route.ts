import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest) {
  try {
    const { iduser } = await req.json()

    const { error } = await supabase
      .from('User')
      .update({ idteam: null })
      .eq('iduser', iduser)

    if (error) throw error

    return NextResponse.json('Left team.', { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
