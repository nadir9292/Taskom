import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'

const realFetch = globalThis.fetch
let lastRequest: { url: string; body: any; headers: any }

function captureFetch(ok = true) {
  globalThis.fetch = (async (url: string, init: any) => {
    lastRequest = {
      url: String(url),
      body: JSON.parse(init.body),
      headers: init.headers,
    }
    return { ok, status: ok ? 200 : 400, json: async () => ({ message: 'bad' }) }
  }) as typeof fetch
}

beforeEach(() => {
  process.env.RESEND_API_KEY = 'test-key'
  process.env.NEXT_PUBLIC_APP_URL = 'https://flowboro.app'
})

afterEach(() => {
  globalThis.fetch = realFetch
})

test('sendInviteEmail posts to Resend with the invite url and token', async () => {
  captureFetch()
  const { sendInviteEmail } = await import('../src/lib/emailClient.ts')
  await sendInviteEmail('to@mail.com', 'Dream Team', 'tok123')

  assert.equal(lastRequest.url, 'https://api.resend.com/emails')
  assert.equal(lastRequest.body.to, 'to@mail.com')
  assert.match(lastRequest.body.subject, /Dream Team/)
  assert.match(lastRequest.body.html, /https:\/\/flowboro\.app\/invite\/tok123/)
  assert.match(lastRequest.headers.Authorization, /Bearer test-key/)
})

test('sendRegisterAndInviteEmail includes the team name and invite url', async () => {
  captureFetch()
  const { sendRegisterAndInviteEmail } = await import('../src/lib/emailClient.ts')
  await sendRegisterAndInviteEmail('new@mail.com', 'Squad', 'abc')

  assert.match(lastRequest.body.subject, /Squad/)
  assert.match(lastRequest.body.html, /https:\/\/flowboro\.app\/invite\/abc/)
  assert.match(lastRequest.body.html, /compte/)
})

test('a failed send throws an error', async () => {
  captureFetch(false)
  const { sendInviteEmail } = await import('../src/lib/emailClient.ts')
  await assert.rejects(
    () => sendInviteEmail('to@mail.com', 'Team', 'tok'),
    /Failed to send email/
  )
})
