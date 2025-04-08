import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json('user data not found', { status: 401 })
  }

  try {
    const { data } = await supabase
      .from('User')
      .select()
      .eq('email', email)
      .single()

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    )
  }
}
