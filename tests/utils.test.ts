import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cn } from '../lib/utils.ts'

test('cn joins class names', () => {
  assert.equal(cn('a', 'b'), 'a b')
})

test('cn keeps the last conflicting tailwind class', () => {
  assert.equal(cn('p-2', 'p-4'), 'p-4')
})

test('cn ignores falsy values', () => {
  assert.equal(cn('a', false, null, undefined, '', 'b'), 'a b')
})

test('cn resolves conditional object syntax', () => {
  assert.equal(cn('base', { active: true, hidden: false }), 'base active')
})

test('cn flattens arrays', () => {
  assert.equal(cn(['a', 'b'], 'c'), 'a b c')
})

test('cn returns empty string with no input', () => {
  assert.equal(cn(), '')
})
