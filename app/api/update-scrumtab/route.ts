import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest) {
  try {
    const { idscrumtab, title } = await req.json()

    const { error } = await supabase
      .from('scrumtab')
      .update({ title })
      .eq('idscrumtab', idscrumtab)

    if (error) throw error

    return NextResponse.json('Board renamed.', { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { idscrumtab } = await req.json()

    const { data: steps } = await supabase
      .from('scrumstep')
      .select('idscrumstep')
      .eq('idscrumtab', idscrumtab)

    if (steps?.length) {
      const stepIds = steps.map((s) => s.idscrumstep)
      await supabase.from('sprint').delete().in('idscrumstep', stepIds)
      await supabase.from('scrumstep').delete().eq('idscrumtab', idscrumtab)
    }

    const { error } = await supabase
      .from('scrumtab')
      .delete()
      .eq('idscrumtab', idscrumtab)

    if (error) throw error

    return NextResponse.json('Board deleted.', { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
