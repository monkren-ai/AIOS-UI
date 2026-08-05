import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * 渲染一小撮内联 Markdown：`code`、**bold**、[text](href)。
 *
 * 注册表里的说明文字是手写的中英短句，为了这点语法引一个 Markdown
 * 运行时不值当；这里只认这三种，其余按纯文本处理。
 */
const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

function renderInline(text: string): React.ReactNode[] {
  return text.split(INLINE).map((chunk, index) => {
    if (!chunk) return null

    if (chunk.startsWith('`') && chunk.endsWith('`')) {
      return (
        <code
          key={index}
          className="rounded-2xs border border-border bg-surface px-1 py-0.5 font-mono text-[0.9em] text-foreground-display"
        >
          {chunk.slice(1, -1)}
        </code>
      )
    }

    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return (
        <strong key={index} className="font-medium text-foreground-display">
          {chunk.slice(2, -2)}
        </strong>
      )
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(chunk)
    if (link) {
      const [, label, href] = link
      const external = href.startsWith('http')
      return (
        <a
          key={index}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className="text-accent underline underline-offset-2"
        >
          {label}
        </a>
      )
    }

    return <React.Fragment key={index}>{chunk}</React.Fragment>
  })
}

export interface ProseProps {
  children: string
  /** 渲染成 `<span>` 而不是 `<p>`，用于嵌在列表项里。 */
  inline?: boolean
  className?: string
}

export function Prose({ children, inline, className }: ProseProps) {
  const Tag = inline ? 'span' : 'p'
  return (
    <Tag className={cn(!inline && 'leading-relaxed text-foreground-muted', className)}>
      {renderInline(children)}
    </Tag>
  )
}

export default Prose
