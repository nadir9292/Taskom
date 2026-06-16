import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('iduser')
      .eq('email', session.user.email)
      .single()

    if (userError || !user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const { error } = await supabase
      .from('User')
      .update({ idteam: null })
      .eq('iduser', user.iduser)

    if (error) throw error

    return NextResponse.json('Left team.', { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
