import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  containerOnAppear,
  itemOnAppear,
  scaleOnAppear,
} from '../src/motion-tools/onAppear.ts'

test('every variant exposes hidden and visible states', () => {
  for (const variant of [containerOnAppear, itemOnAppear, scaleOnAppear]) {
    assert.ok(variant.hidden)
    assert.ok(variant.visible)
  }
})

test('hidden states start fully transparent', () => {
  assert.equal(containerOnAppear.hidden.opacity, 0)
  assert.equal(itemOnAppear.hidden.opacity, 0)
  assert.equal(scaleOnAppear.hidden.opacity, 0)
})

test('visible states are fully opaque', () => {
  assert.equal(containerOnAppear.visible.opacity, 1)
  assert.equal(itemOnAppear.visible.opacity, 1)
  assert.equal(scaleOnAppear.visible.opacity, 1)
})

test('item slides up from an offset to zero', () => {
  assert.equal(itemOnAppear.hidden.y, 18)
  assert.equal(itemOnAppear.visible.y, 0)
})

test('scale grows from below one to one', () => {
  assert.equal(scaleOnAppear.hidden.scale, 0.94)
  assert.equal(scaleOnAppear.visible.scale, 1)
})

test('container staggers its children before they appear', () => {
  assert.equal(containerOnAppear.visible.transition.when, 'beforeChildren')
  assert.ok(containerOnAppear.visible.transition.staggerChildren > 0)
})
