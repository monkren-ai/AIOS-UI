import type { ReactNode } from 'react'
import { SectionTitle } from './SectionTitle'

type DemoVariant = 'default' | 'flex-wrap' | 'grid'

interface DemoCardProps {
  title: string
  variant?: DemoVariant
  last?: boolean
  className?: string
  children: ReactNode
}

/**
 * 演示卡片包装。
 *
 * 将一个演示区段（标题 + 内容）统一包裹为 `<section>`，
 * 并根据 variant 选择 flex-wrap / grid / 默认布局。
 */
export function DemoCard({ title, variant = 'default', last = false, className, children }: DemoCardProps) {
  const classes = [
    'showcase-section',
    variant === 'flex-wrap' && 'showcase-section--flex-wrap',
    variant === 'grid' && 'showcase-section--grid',
    last && 'showcase-section--last',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  )
}

export default DemoCard
