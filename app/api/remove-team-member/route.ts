import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { iduser } = await req.json()

    const { data: sessionUser } = await supabase
      .from('User')
      .select('role, idteam')
      .eq('email', session.user.email)
      .single()

    if (!sessionUser || sessionUser.role !== 'leader') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const { data: targetUser } = await supabase
      .from('User')
      .select('idteam')
      .eq('iduser', iduser)
      .single()

    if (!targetUser || String(targetUser.idteam) !== String(sessionUser.idteam)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const { error } = await supabase
      .from('User')
      .update({ idteam: null })
      .eq('iduser', iduser)

    if (error) throw error

    return NextResponse.json('Member removed.', { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
