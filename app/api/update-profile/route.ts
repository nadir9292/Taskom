import { supabase } from '@/src/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    await supabase
      .from('User')
      .update({
        lastname: data.lastname,
        firstname: data.firstname,
      })
      .eq('email', data.email)

    return NextResponse.json('User profile has been updated correctly', {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
