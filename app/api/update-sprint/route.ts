import { supabase } from '@/src/lib/supabaseClient'
import { SprintType } from '@/src/types/SprintType'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest) {
  try {
    const body: SprintType = await req.json()

    const members = body.members ?? (body.iduseraffected ? [body.iduseraffected] : [])

    const { error } = await supabase
      .from('sprint')
      .update({
        tag: body.tag,
        title: body.title,
        shortdescription: body.shortdescription,
        longdescription: body.longdescription,
        startdate: body.startdate,
        enddate: body.enddate,
        idscrumstep: Number(body.idscrumstep),
        iduseraffected: body.iduseraffected ?? null,
        history: JSON.stringify({ members }),
      })
      .eq('idsprint', body.idsprint)

    if (error) throw error

    return NextResponse.json('sprint updated', { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
