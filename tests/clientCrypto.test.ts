import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { getKeyBase64, encryptPayload } from '../lib/crypto.ts'
import {
  decryptResponse,
  secureFetch,
  resetKey,
} from '../src/lib/clientCrypto.ts'

const EMAIL = 'user@mail.com'
const realFetch = globalThis.fetch

function mockFetch(routes: Record<string, unknown>) {
  globalThis.fetch = (async (url: string) => {
    const path = String(url).split('?')[0]
    if (!(path in routes)) {
      return { ok: false, status: 404, json: async () => ({}) }
    }
    return { ok: true, status: 200, json: async () => routes[path] }
  }) as typeof fetch
}

function encryptOnServer(data: unknown): string {
  return encryptPayload(data, EMAIL)
}

beforeEach(() => {
  process.env.ENCRYPTION_SECRET = 'test-secret'
  resetKey()
})

afterEach(() => {
  globalThis.fetch = realFetch
})

test('decryptResponse recovers the data encrypted on the server', async () => {
  const data = { name: 'Ada', roles: ['admin', 'dev'], n: 42 }
  const payload = encryptOnServer(data)
  mockFetch({ '/api/crypto-key': { key: getKeyBase64(EMAIL) } })

  const decrypted = await decryptResponse<typeof data>(payload)
  assert.deepEqual(decrypted, data)
})

test('getKey is fetched once and cached', async () => {
  let calls = 0
  globalThis.fetch = (async () => {
    calls++
    return { ok: true, status: 200, json: async () => ({ key: getKeyBase64(EMAIL) }) }
  }) as typeof fetch

  await decryptResponse(encryptOnServer({ a: 1 }))
  await decryptResponse(encryptOnServer({ b: 2 }))
  assert.equal(calls, 1)
})

test('resetKey forces the key to be fetched again', async () => {
  let calls = 0
  globalThis.fetch = (async () => {
    calls++
    return { ok: true, status: 200, json: async () => ({ key: getKeyBase64(EMAIL) }) }
  }) as typeof fetch

  await decryptResponse(encryptOnServer({ a: 1 }))
  resetKey()
  await decryptResponse(encryptOnServer({ a: 1 }))
  assert.equal(calls, 2)
})

test('decryptResponse throws when the crypto key cannot be fetched', async () => {
  mockFetch({})
  await assert.rejects(
    () => decryptResponse('not-real'),
    /Failed to fetch crypto key/
  )
})

test('secureFetch decrypts a response wrapped in a "d" field', async () => {
  const data = { secret: true }
  const payload = encryptOnServer(data)
  mockFetch({
    '/api/get-thing': { d: payload },
    '/api/crypto-key': { key: getKeyBase64(EMAIL) },
  })

  const result = await secureFetch<typeof data>('/api/get-thing')
  assert.deepEqual(result, data)
})

test('secureFetch returns plain json untouched when there is no "d" field', async () => {
  mockFetch({ '/api/plain': { ok: 1 } })
  const result = await secureFetch<{ ok: number }>('/api/plain')
  assert.deepEqual(result, { ok: 1 })
})

test('secureFetch throws on a non-ok response', async () => {
  mockFetch({})
  await assert.rejects(() => secureFetch('/api/missing'), /Request failed: 404/)
})
