import { createHmac, createCipheriv, randomBytes } from 'crypto'
import { NextResponse } from 'next/server'

function deriveKey(email: string): Buffer {
  return createHmac('sha256', process.env.ENCRYPTION_SECRET!)
    .update(email)
    .digest()
}

function encrypt(plaintext: string, key: Buffer): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, ciphertext]).toString('base64')
}

export function encryptedJson(data: unknown, email: string, status = 200) {
  const key = deriveKey(email)
  const d = encrypt(JSON.stringify(data), key)
  return NextResponse.json({ d }, { status })
}

export function getKeyBase64(email: string): string {
  return deriveKey(email).toString('base64')
}
