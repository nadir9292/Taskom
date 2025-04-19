import { supabase } from '@/src/lib/supabaseClient'
import { SprintType } from '@/src/types/SprintType'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body: SprintType = await req.json()

    const { error: insertError } = await supabase.from('sprint').insert({
      tag: body.tag,
      title: body.title,
      shortdescription: body.shortdescription,
      startdate: body.startdate,
      enddate: body.enddate,
      longdescription: body.longdescription,
      history: '',
      idscrumstep: Number(body.idscrumstep),
      iduseraffected: body.iduseraffected,
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
