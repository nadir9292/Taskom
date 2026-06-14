import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { email, idteam } = await req.json()

    const { data: targetUser, error: findError } = await supabase
      .from('User')
      .select('iduser, idteam')
      .eq('email', email)
      .single()

    if (findError || !targetUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (targetUser.idteam) {
      return NextResponse.json({ message: 'User already in a team' }, { status: 400 })
    }

    const { error: updateError } = await supabase
      .from('User')
      .update({ idteam })
      .eq('iduser', targetUser.iduser)

    if (updateError) throw updateError

    return NextResponse.json('Member added.', { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
