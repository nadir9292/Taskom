import { authOptions } from '@/src/lib/authOptions'
import { getKeyBase64 } from '@/lib/apiCrypto'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const key = getKeyBase64(session.user.email)
  return NextResponse.json({ key })
}
