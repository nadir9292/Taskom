import { supabase } from '@/src/lib/supabaseClient'
import { authOptions } from '@/src/lib/authOptions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

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
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

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
