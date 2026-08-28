import { describe, expect, it } from 'vitest'
import {
  overlayDuration,
  overlayMenuMotion,
  overlayModalMotion,
  overlaySheetTiming,
  overlayTooltipMotion,
} from './overlay-motion'

describe('overlay-motion', () => {
  it('uses the exit duration by default and the enter duration when open', () => {
    expect(overlayDuration('slow')).toEqual([
      'duration-[var(--duration-spring-slow-exit)] ease-spring-slow',
      'open:duration-[var(--duration-spring-slow)]',
    ])
  })

  it('keeps menu motion origin-aware and scale-based', () => {
    expect(overlayMenuMotion.join(' ')).toContain('data-[side=bottom]:origin-top')
    expect(overlayMenuMotion.join(' ')).toContain('scale-[var(--scale-overlay-menu)]')
    expect(overlayMenuMotion.join(' ')).toContain('motion-reduce:scale-100')
  })

  it('keeps tooltip on the fast spring step', () => {
    expect(overlayTooltipMotion.join(' ')).toContain('--duration-spring-fast')
    expect(overlayTooltipMotion.join(' ')).toContain('scale-[var(--scale-overlay-tooltip)]')
  })

  it('does not force translate-none on sheets', () => {
    expect(overlaySheetTiming.join(' ')).not.toContain('translate-none')
    expect(overlayModalMotion.join(' ')).toContain('scale-[var(--scale-overlay-modal)]')
  })
})
