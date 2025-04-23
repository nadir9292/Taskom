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
    const [scrumtabResult, scrumstepResult] = await Promise.all([
      supabase.from('scrumtab').select('*').eq('idteam', idteam),
      supabase.from('scrumstep').select('*').eq('idteam', idteam),
    ])

    const { data: scrumtabs, error: tabsError } = scrumtabResult
    const { data: scrumsteps, error: stepsError } = scrumstepResult

    if (tabsError || stepsError) {
      return NextResponse.json(
        { error: 'Failed to fetch scrum data' },
        { status: 500 }
      )
    }

    const sprintFetches = scrumsteps.map((step) =>
      supabase.from('sprint').select('*').eq('idscrumstep', step.idscrumstep)
    )

    const sprintResults = await Promise.all(sprintFetches)

    const sprints = []
    for (const result of sprintResults) {
      if (result.error) {
        return NextResponse.json(
          { error: 'Failed to fetch sprints' },
          { status: 500 }
        )
      }
      sprints.push(...(result.data || []))
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
