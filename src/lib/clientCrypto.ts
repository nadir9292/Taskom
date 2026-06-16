let cachedKey: CryptoKey | null = null

async function importKey(keyBase64: string): Promise<CryptoKey> {
  const keyBytes = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0))
  return crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt'])
}

async function getKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey
  const res = await fetch('/api/crypto-key')
  if (!res.ok) throw new Error('Failed to fetch crypto key')
  const { key } = await res.json()
  cachedKey = await importKey(key)
  return cachedKey
}

export function resetKey() {
  cachedKey = null
}

export async function decryptResponse<T>(payload: string): Promise<T> {
  const key = await getKey()
  const buffer = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0))
  const iv = buffer.slice(0, 12)
  const tag = buffer.slice(12, 28)
  const ciphertext = buffer.slice(28)
  const combined = new Uint8Array([...ciphertext, ...tag])
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, combined)
  return JSON.parse(new TextDecoder().decode(decrypted)) as T
}

export async function secureFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (typeof json?.d === 'string') return decryptResponse<T>(json.d)
  return json as T
}
