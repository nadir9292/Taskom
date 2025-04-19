import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { data: teamData, error: insertError } = await supabase
      .from('scrumtab')
      .insert({
        idteam: data.idteam,
        title: data.title,
        color: '#F5F5F5',
      })
      .select('idscrumtab')
      .single()

    if (insertError) throw insertError

    data.scrumsteps.forEach(async (element: any) => {
      await supabase.from('scrumstep').insert({
        idscrumtab: teamData.idscrumtab,
        title: element.stepName,
        order: element.order,
        color: '#F5F5F5',
        idteam: data.idteam,
      })
    })

    return NextResponse.json('Team has been created.', { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
