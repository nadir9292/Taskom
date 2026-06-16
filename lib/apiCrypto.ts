import { NextResponse } from 'next/server'
import { encryptPayload, getKeyBase64 } from './crypto'

export function encryptedJson(data: unknown, email: string, status = 200) {
  return NextResponse.json({ d: encryptPayload(data, email) }, { status })
}

export { getKeyBase64 }
