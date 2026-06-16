import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { idsprint, idStep, fromTitle, toTitle } = await req.json()

    const { data: current } = await supabase
      .from('sprint')
      .select('history')
      .eq('idsprint', idsprint)
      .single()

    let parsed: { members?: number[]; steps?: { from: string; to: string; at: string }[] } = {}
    try {
      parsed = JSON.parse(current?.history || '{}')
    } catch {}

    const historySteps = parsed.steps ?? []
    if (fromTitle && toTitle) {
      historySteps.push({ from: fromTitle, to: toTitle, at: new Date().toISOString() })
    }

    const { error } = await supabase
      .from('sprint')
      .update({
        idscrumstep: idStep,
        history: JSON.stringify({ ...parsed, steps: historySteps }),
      })
      .eq('idsprint', idsprint)

    if (error) throw error

    return NextResponse.json('sprint status has been updated correctly', { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
