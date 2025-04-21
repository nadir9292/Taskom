import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest) {
  const body = await req.json()

  try {
    const { data } = await supabase
      .from('sprint')
      .delete()
      .eq('idsprint', body.sprintid)
      .select()

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    )
  }
}
