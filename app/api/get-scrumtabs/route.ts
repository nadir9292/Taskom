import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const idteam = req.nextUrl.searchParams.get('idteam')

  if (!idteam) {
    return NextResponse.json(
      { error: 'Missing or invalid team ID' },
      { status: 400 }
    )
  }

  try {
    const { data: scrumtabs, error: tabsError } = await supabase
      .from('scrumtab')
      .select('*')
      .eq('idteam', idteam)

    const { data: scrumsteps, error: stepsError } = await supabase
      .from('scrumstep')
      .select('*')
      .eq('idteam', idteam)

    if (tabsError || stepsError) {
      return NextResponse.json(
        { error: 'Failed to fetch scrum data' },
        { status: 500 }
      )
    }

    const sprints = []
    for (const step of scrumsteps) {
      const { data: stepSprints, error: sprintError } = await supabase
        .from('sprint')
        .select('*')
        .eq('idscrumstep', step.idscrumstep)

      if (sprintError) {
        return NextResponse.json(
          { error: 'Failed to fetch sprints' },
          { status: 500 }
        )
      }

      sprints.push(...(stepSprints || []))
    }

    return NextResponse.json(
      { scrumtabs, scrumsteps, sprints },
      { status: 200 }
    )
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
