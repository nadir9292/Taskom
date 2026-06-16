import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { encryptedJson } from '@/lib/apiCrypto'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const idteam = req.nextUrl.searchParams.get('idteam')

  if (!idteam) {
    return NextResponse.json({ message: 'Missing idteam parameter' }, { status: 400 })
  }

  const { data: sessionUser } = await supabase
    .from('User')
    .select('idteam')
    .eq('email', session.user.email)
    .single()

  if (!sessionUser || String(sessionUser.idteam) !== idteam) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  try {
    const { data, error } = await supabase
      .from('User')
      .select('iduser, firstname, lastname, profileimage, job, role')
      .eq('idteam', idteam)

    if (error) throw error

    return encryptedJson(data, session.user.email)
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
