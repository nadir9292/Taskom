import { createHmac, createCipheriv, randomBytes } from 'crypto'

export function deriveKey(email: string): Buffer {
  return createHmac('sha256', process.env.ENCRYPTION_SECRET!)
    .update(email)
    .digest()
}

export function encryptPayload(data: unknown, email: string): string {
  const key = deriveKey(email)
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(data), 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, ciphertext]).toString('base64')
}

export function getKeyBase64(email: string): string {
  return deriveKey(email).toString('base64')
}
