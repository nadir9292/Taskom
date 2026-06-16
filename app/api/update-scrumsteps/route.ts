import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { idscrumtab, idteam, steps } = await req.json()

    const { data: existing } = await supabase
      .from('scrumstep')
      .select('idscrumstep')
      .eq('idscrumtab', idscrumtab)

    const existingIds = (existing ?? []).map((s) => s.idscrumstep)
    const incomingIds = steps.filter((s: any) => s.idscrumstep).map((s: any) => s.idscrumstep)
    const toDelete = existingIds.filter((id) => !incomingIds.includes(id))

    if (toDelete.length) {
      await supabase.from('sprint').delete().in('idscrumstep', toDelete)
      await supabase.from('scrumstep').delete().in('idscrumstep', toDelete)
    }

    for (const step of steps) {
      if (step.idscrumstep) {
        await supabase
          .from('scrumstep')
          .update({ title: step.title, order: step.order })
          .eq('idscrumstep', step.idscrumstep)
      } else {
        await supabase.from('scrumstep').insert({
          idscrumtab,
          idteam,
          title: step.title,
          order: step.order,
          color: '#F5F5F5',
        })
      }
    }

    return NextResponse.json('Steps updated.', { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
