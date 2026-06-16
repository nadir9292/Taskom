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
    const { name } = await req.json()

    const { data: sessionUser, error: userError } = await supabase
      .from('User')
      .select('iduser')
      .eq('email', session.user.email)
      .single()

    if (userError || !sessionUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const { data: teamData, error: insertError } = await supabase
      .from('team')
      .insert({
        idleader: sessionUser.iduser,
        name,
      })
      .select('idteam')
      .single()

    if (insertError) throw insertError

    const { error: updateError } = await supabase
      .from('User')
      .update({
        idteam: teamData.idteam,
        role: 'leader',
      })
      .eq('iduser', sessionUser.iduser)

    if (updateError) throw updateError

    return NextResponse.json('Team has been created.', { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
