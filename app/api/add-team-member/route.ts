import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { email, idteam } = await req.json()

    const { data: sessionUser } = await supabase
      .from('User')
      .select('role, idteam')
      .eq('email', session.user.email)
      .single()

    if (!sessionUser || sessionUser.role !== 'leader' || String(sessionUser.idteam) !== String(idteam)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

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
