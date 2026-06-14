import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const idteam = req.nextUrl.searchParams.get('idteam')

  if (!idteam) {
    return NextResponse.json({ message: 'Missing idteam parameter' }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from('User')
      .select('iduser, firstname, lastname, profileimage, job, role')
      .eq('idteam', idteam)

    if (error) throw error

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    )
  }
}
