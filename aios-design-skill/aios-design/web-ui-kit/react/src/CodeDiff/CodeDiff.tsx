import * as React from 'react'
import { cn } from '@/lib/utils'
import { codeDiffLineVariants, codeDiffVariants } from './code-diff-variants'

export type CodeDiffLineType = 'context' | 'add' | 'remove'
export interface CodeDiffLine {
  oldLine?: number
  newLine?: number
  type?: CodeDiffLineType
  content: string
}
export interface CodeDiffProps extends React.HTMLAttributes<HTMLElement> {
  filename: string
  lines: CodeDiffLine[]
  summaryLabel?: string
}

export function CodeDiff({
  filename,
  lines,
  summaryLabel,
  className,
  ref,
  ...props
}: CodeDiffProps & { ref?: React.Ref<HTMLElement> }) {
  const additions = lines.filter((line) => line.type === 'add').length
  const removals = lines.filter((line) => line.type === 'remove').length
  const summary = summaryLabel ?? `${additions} 行新增 / additions, ${removals} 行删除 / deletions`
  return (
    <figure
      ref={ref}
      className={cn(codeDiffVariants(), className)}
      data-slot="code-diff"
      {...props}
    >
      <figcaption className="flex min-h-11 items-center justify-between gap-3 border-b border-border px-3 text-label uppercase">
        <span className="truncate">{filename}</span>
        <span aria-label={summary}>
          +{additions} / −{removals}
        </span>
      </figcaption>
      <code className="block overflow-auto py-3 leading-6" data-slot="code-diff-body">
        {lines.map((line, index) => {
          const type = line.type ?? 'context'
          return (
            <span
              key={`${line.oldLine}-${line.newLine}-${index}`}
              className={codeDiffLineVariants({ type })}
              data-slot="code-diff-line"
              data-type={type}
            >
              <span className="text-foreground-disabled">{line.oldLine ?? ''}</span>
              <span className="text-foreground-disabled">{line.newLine ?? ''}</span>
              <span aria-hidden>{type === 'add' ? '+' : type === 'remove' ? '−' : ' '}</span>
              <span className="whitespace-pre">{line.content || ' '}</span>
            </span>
          )
        })}
      </code>
    </figure>
  )
}
