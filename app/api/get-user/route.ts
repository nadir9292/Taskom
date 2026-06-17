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

  const email = req.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json({ message: 'Missing email parameter' }, { status: 400 })
  }

  if (email !== session.user.email) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  try {
    const { data, error } = await supabase
      .from('User')
      .select()
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }
      throw error
    }

    return encryptedJson(data, session.user.email)
  } catch (err) {
    console.error('[get-user]', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
