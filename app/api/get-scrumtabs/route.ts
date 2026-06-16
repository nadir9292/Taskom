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
    return NextResponse.json({ error: 'Missing or invalid team ID' }, { status: 400 })
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

    const rawSprints = []
    for (const result of sprintResults) {
      if (result.error) {
        return NextResponse.json(
          { error: 'Failed to fetch sprints' },
          { status: 500 }
        )
      }
      rawSprints.push(...(result.data || []))
    }

    const sprints = rawSprints.map((sprint) => {
      let members: number[] = []
      try {
        const parsed = JSON.parse(sprint.history || '{}')
        if (Array.isArray(parsed.members)) members = parsed.members
      } catch {}
      if (members.length === 0 && sprint.iduseraffected) {
        members = [sprint.iduseraffected]
      }
      return { ...sprint, members }
    })

    return encryptedJson({ scrumtabs, scrumsteps, sprints }, session.user.email)
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
