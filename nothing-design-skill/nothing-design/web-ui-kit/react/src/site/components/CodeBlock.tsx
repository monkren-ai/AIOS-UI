import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/Button'
import { useT } from '../i18n'

/**
 * 极简的 token 着色。
 *
 * 文档站是单色工业风，代码块最多分四档灰阶 + 一点红，
 * 引一整套 Shiki/Prism 来渲染这个色板并不划算。
 */
const PATTERNS: { kind: string; re: RegExp }[] = [
  { kind: 'comment', re: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
  { kind: 'string', re: /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/y },
  {
    kind: 'keyword',
    re: /\b(?:import|from|export|default|const|let|var|function|return|if|else|for|while|new|class|extends|interface|type|as|await|async|typeof|null|undefined|true|false)\b/y,
  },
  { kind: 'tag', re: /<\/?[A-Z][A-Za-z0-9]*|<\/?[a-z][a-z0-9]*(?=[\s/>])/y },
  { kind: 'attr', re: /\b[a-zA-Z-]+(?==)/y },
  { kind: 'number', re: /\b\d+(?:\.\d+)?\b/y },
]

const TOKEN_CLASS: Record<string, string> = {
  comment: 'text-foreground-subtle italic',
  string: 'text-foreground-muted',
  keyword: 'text-accent',
  tag: 'text-foreground-display',
  attr: 'text-foreground-muted',
  number: 'text-foreground-muted',
}

function highlight(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let index = 0
  let plainStart = 0
  let key = 0

  const flushPlain = (end: number) => {
    if (end > plainStart) nodes.push(code.slice(plainStart, end))
  }

  while (index < code.length) {
    let matched = false
    for (const { kind, re } of PATTERNS) {
      re.lastIndex = index
      const match = re.exec(code)
      if (match) {
        flushPlain(index)
        nodes.push(
          <span key={key++} className={TOKEN_CLASS[kind]}>
            {match[0]}
          </span>,
        )
        index += match[0].length
        plainStart = index
        matched = true
        break
      }
    }
    if (!matched) index += 1
  }
  flushPlain(index)
  return nodes
}

export interface CodeBlockProps {
  code: string
  /** 代码块左上角的文件名标签。 */
  filename?: string
  /** 超过这个行数就折叠，并给一个「展开代码」按钮。 */
  collapseAfter?: number
  className?: string
}

export function CodeBlock({ code, filename, collapseAfter = 18, className }: CodeBlockProps) {
  const { t } = useT()
  const [copied, setCopied] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  const trimmed = React.useMemo(() => code.replace(/\s+$/, ''), [code])
  const lineCount = React.useMemo(() => trimmed.split('\n').length, [trimmed])
  const collapsible = lineCount > collapseAfter
  const isCollapsed = collapsible && !expanded

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(trimmed)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }, [trimmed])

  return (
    <div
      data-slot="code-block"
      className={cn(
        'relative overflow-hidden rounded-card-compact border border-border bg-surface',
        className,
      )}
    >
      {filename && (
        <div className="border-b border-border px-4 py-2 font-mono text-label uppercase tracking-widest text-foreground-subtle">
          {filename}
        </div>
      )}

      <div className="absolute end-2 top-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={copy}
          className="rounded-card-technical"
          aria-label={t('复制代码', 'Copy code')}
        >
          {copied ? t('已复制', 'Copied') : t('复制', 'Copy')}
        </Button>
      </div>

      <pre
        className={cn(
          'overflow-x-auto p-4 pe-24 font-mono text-xs leading-relaxed text-foreground',
          isCollapsed && 'max-h-80 overflow-y-hidden',
        )}
      >
        <code>{highlight(trimmed)}</code>
      </pre>

      {collapsible && (
        <div className="border-t border-border">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="w-full cursor-pointer bg-transparent px-4 py-2 font-mono text-label uppercase tracking-widest text-foreground-muted transition-colors duration-200 hover:bg-muted hover:text-foreground-display motion-reduce:transition-none"
          >
            {expanded
              ? t('收起代码', 'Collapse code')
              : t(`展开代码（${lineCount} 行）`, `Expand code (${lineCount} lines)`)}
          </button>
        </div>
      )}
    </div>
  )
}

export default CodeBlock
