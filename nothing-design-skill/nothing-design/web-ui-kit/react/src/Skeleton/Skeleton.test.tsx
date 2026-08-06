import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'
import { skeletonVariants } from './skeleton-variants'

const SHAPES = ['text', 'rect', 'circle'] as const

describe('Skeleton', () => {
  it('renders with data-slot and the dotmatrix variant marker', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('data-slot', 'skeleton')
    // 改造标记：永远是 dotmatrix，不再是灰色块
    expect(el).toHaveAttribute('data-variant', 'dotmatrix')
    expect(el).toHaveAttribute('data-shape', 'text')
    expect(el).toHaveAttribute('aria-hidden', 'true')
  })

  it('reports every shape through data-shape', () => {
    SHAPES.forEach((shape) => {
      const { unmount, container } = render(<Skeleton variant={shape} />)
      expect(container.firstChild as HTMLElement).toHaveAttribute('data-shape', shape)
      unmount()
    })
  })

  it('renders a dot grid instead of a grey block', () => {
    const { container } = render(<Skeleton variant="rect" />)
    const dots = container.querySelectorAll('[data-slot="skeleton-dot"]')
    expect(dots.length).toBeGreaterThan(0)
    const el = container.firstChild as HTMLElement
    // 容器自身没有实心填充——占位靠点阵，不靠灰色块
    expect(el.className).not.toMatch(/bg-surface|bg-border\b/)
    // 点用的是 foreground-disabled，不是一块独立的灰底
    expect(dots[0].className).toContain('bg-foreground-disabled')
  })

  it('breathes only when animate is on', () => {
    const { container: onContainer } = render(<Skeleton animate />)
    expect((onContainer.firstChild as HTMLElement).className).toMatch(
      /nothing-skeleton-breathe/,
    )
    const { container: offContainer } = render(<Skeleton animate={false} />)
    expect((offContainer.firstChild as HTMLElement).className).not.toMatch(
      /nothing-skeleton-breathe/,
    )
  })

  it('does not crash under motion-reduce', () => {
    const { container } = render(<Skeleton animate variant="circle" />)
    expect(container.firstChild as HTMLElement).toHaveAttribute('data-shape', 'circle')
  })

  it('exports skeletonVariants for direct use', () => {
    expect(typeof skeletonVariants).toBe('function')
  })
})
