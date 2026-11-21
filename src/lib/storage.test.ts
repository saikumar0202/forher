import { beforeEach, describe, expect, it } from 'vitest'
import { readStorage, writeStorage } from './storage'

describe('storage', () => {
  beforeEach(() => window.localStorage.clear())

  it('returns the fallback when nothing is stored', () => {
    expect(readStorage('missing', 7)).toBe(7)
  })

  it('reads back what was written', () => {
    writeStorage('settings', { soundEffects: false })
    expect(readStorage('settings', { soundEffects: true })).toEqual({ soundEffects: false })
  })

  it('returns the fallback when the stored value is not valid JSON', () => {
    window.localStorage.setItem('broken', '{not json')
    expect(readStorage('broken', 'fallback')).toBe('fallback')
  })
})
