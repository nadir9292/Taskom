import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { deriveKey, getKeyBase64, encryptPayload } from '../lib/crypto.ts'

beforeEach(() => {
  process.env.ENCRYPTION_SECRET = 'test-secret'
})

test('getKeyBase64 is deterministic for the same email', () => {
  assert.equal(getKeyBase64('user@mail.com'), getKeyBase64('user@mail.com'))
})

test('getKeyBase64 differs for different emails', () => {
  assert.notEqual(getKeyBase64('a@mail.com'), getKeyBase64('b@mail.com'))
})

test('getKeyBase64 differs when the secret changes', () => {
  const first = getKeyBase64('user@mail.com')
  process.env.ENCRYPTION_SECRET = 'other-secret'
  assert.notEqual(first, getKeyBase64('user@mail.com'))
})

test('deriveKey returns a 32 byte (256 bit) AES key', () => {
  assert.equal(deriveKey('user@mail.com').length, 32)
})

test('encryptPayload produces base64 that hides the plaintext', () => {
  const payload = encryptPayload({ hello: 'world' }, 'user@mail.com')
  assert.match(payload, /^[A-Za-z0-9+/]+=*$/)
  assert.doesNotMatch(payload, /hello/)
})

test('encryptPayload uses a random iv so the same data differs each time', () => {
  const a = encryptPayload({ a: 1 }, 'user@mail.com')
  const b = encryptPayload({ a: 1 }, 'user@mail.com')
  assert.notEqual(a, b)
})
