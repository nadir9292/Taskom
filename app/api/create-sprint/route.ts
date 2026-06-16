import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { SprintType } from '@/src/types/SprintType'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body: SprintType = await req.json()

    const leader = body.iduseraffected ?? body.idusercreator ?? null
    const members = body.members?.length ? body.members : (leader ? [leader] : [])

    const { error: insertError } = await supabase.from('sprint').insert({
      tag: body.tag,
      title: body.title,
      shortdescription: body.shortdescription,
      startdate: body.startdate,
      enddate: body.enddate,
      longdescription: body.longdescription,
      history: JSON.stringify({ members }),
      idscrumstep: Number(body.idscrumstep),
      iduseraffected: leader,
      idusercreator: body.idusercreator,
    })

    if (insertError) {
      console.error('Insert Error:', insertError.message, insertError.details)
      throw insertError
    }

    return NextResponse.json('sprint has been created', { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
