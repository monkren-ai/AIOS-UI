import * as React from 'react'
import { cn } from '../lib/utils'
import '../styles/marquee.css'

export interface MarqueeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 主显示文字（重复 3 次形成无缝循环） */
  text: string
  /** 滚动周期（秒），默认 12 */
  duration?: number
  /** 悬停时是否暂停，默认 true */
  pauseOnHover?: boolean
  /** 自定义容器宽度（CSS 值），默认 "min(25rem, 100%)" */
  width?: string
  /** mask 网格大小（字符宽度单位 ch），默认 0.3 */
  cellSize?: number
  /** mask 间隔比例 0-1，默认 0.8（80% 透明 + 20% 实线） */
  gapRatio?: number
}

/**
 * Marquee — 镂空网格滚动文字
 * 灵感来源：CodePen EaxdNRo（Cubiq-ish）
 * - 胶囊形容器 + 双 linear-gradient + mask-composite: intersect 镂空点阵
 * - 无限横向滚动，悬停暂停
 * - 主题跟随：颜色 / 字体 / 圆角 / 间距全部走 var(--...) token
 */
export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      text,
      duration = 12,
      pauseOnHover = true,
      width,
      cellSize = 0.3,
      gapRatio = 0.8,
      style,
      ...props
    },
    ref
  ) => {
    const cssVars: React.CSSProperties = {
      ...(width ? { ['--mq-width' as string]: width } : null),
      ['--mq-dur' as string]: `${duration}s`,
      ['--mq-cell' as string]: String(cellSize),
      ['--mq-gap' as string]: String(gapRatio),
    }

    return (
      <div
        ref={ref}
        className={cn('nothing-marquee', className)}
        style={{ ...cssVars, ...style }}
        data-pause-on-hover={pauseOnHover ? 'true' : 'false'}
        {...props}
      >
        <div className="nothing-marquee-track">
          <h1 className="nothing-marquee-text" aria-label={text}>
            <span aria-hidden="true">{text}</span>
            <span aria-hidden="true">{text}</span>
            <span aria-hidden="true">{text}</span>
          </h1>
        </div>
      </div>
    )
  }
)
Marquee.displayName = 'Marquee'

export default Marquee
