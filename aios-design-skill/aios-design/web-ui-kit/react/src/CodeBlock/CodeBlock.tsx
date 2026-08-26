import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { codeBlockVariants } from './code-block-variants'

export interface CodeBlockProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'onCopy'>,
    VariantProps<typeof codeBlockVariants> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  copyable?: boolean
  highlight?: boolean
  onCopy?: (code: string) => void | Promise<void>
  copyLabel?: string
  copiedLabel?: string
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  copyable = true,
  highlight = true,
  wrap,
  onCopy,
  copyLabel = '复制 / Copy',
  copiedLabel = '已复制 / Copied',
  className,
  ref,
  ...props
}: CodeBlockProps & { ref?: React.Ref<HTMLElement> }) {
  const [copied, setCopied] = React.useState(false)
  const [html, setHtml] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    if (!language || !highlight || showLineNumbers) {
      setHtml(null)
      return () => {
        active = false
      }
    }
    void import('shiki')
      .then(({ codeToHtml }) =>
        codeToHtml(code, {
          lang: language,
          theme: 'css-variables',
        }),
      )
      .then((result) => {
        if (active) setHtml(result)
      })
      .catch(() => {
        if (active) setHtml(null)
      })
    return () => {
      active = false
    }
  }, [code, highlight, language, showLineNumbers])

  const copy = async () => {
    if (onCopy) await onCopy(code)
    else if (typeof navigator !== 'undefined') await navigator.clipboard?.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <figure
      ref={ref}
      className={cn(codeBlockVariants({ wrap }), className)}
      data-slot="code-block"
      data-wrap={dataAttr(Boolean(wrap))}
      {...props}
    >
      <figcaption
        className="flex min-h-11 items-center justify-between gap-3 border-b border-border px-3 font-mono text-label uppercase text-foreground-muted"
        data-slot="code-block-header"
      >
        <span className="truncate">{filename ?? language ?? '代码 / Code'}</span>
        {copyable && (
          <button
            type="button"
            className="min-h-9 rounded-button px-2 text-caption text-foreground-muted transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive"
            onClick={copy}
            aria-live="polite"
          >
            {copied ? copiedLabel : copyLabel}
          </button>
        )}
      </figcaption>
      {html ? (
        <div
          className="overflow-auto p-4 font-mono text-sm [&_.shiki]:m-0 [&_.shiki]:bg-transparent! [&_.shiki]:text-inherit! [&_code]:font-inherit"
          data-slot="code-block-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre
          className="m-0 overflow-auto p-4 font-mono text-sm leading-6"
          data-slot="code-block-body"
        >
          <code>
            {showLineNumbers
              ? code.split('\n').map((line, index) => (
                  <span key={index} className="grid grid-cols-[3ch_1fr] gap-3">
                    <span aria-hidden className="select-none text-end text-foreground-disabled">
                      {index + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: escapeHtml(line || ' ') }} />
                  </span>
                ))
              : code}
          </code>
        </pre>
      )}
    </figure>
  )
}
