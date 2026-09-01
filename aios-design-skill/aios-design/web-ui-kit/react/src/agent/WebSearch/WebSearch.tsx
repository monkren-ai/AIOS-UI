import * as React from 'react'
import { Collapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'
import { ActivityLabel } from '@/agent/ActivityLabel'
import { webSearchResultVariants, webSearchVariants } from './web-search-variants'

export type WebSearchStatus = 'running' | 'complete' | 'error'

export interface WebSearchResult {
  title: React.ReactNode
  url: string
  description?: React.ReactNode
  domain?: React.ReactNode
}

export interface WebSearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'results'> {
  query: React.ReactNode
  results?: WebSearchResult[]
  status?: WebSearchStatus
  label?: React.ReactNode
  activeLabel?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function WebSearch({
  query,
  results = [],
  status = 'complete',
  label = '已搜索网页 / Searched the web',
  activeLabel = '正在搜索网页 / Searching the web',
  open,
  defaultOpen = true,
  onOpenChange,
  className,
  ref,
  ...props
}: WebSearchProps & { ref?: React.Ref<HTMLDivElement> }) {
  const running = status === 'running'
  return (
    <Collapsible.Root
      ref={ref}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      className={cn(webSearchVariants({ status }), className)}
      data-slot="web-search"
      data-status={status}
      aria-busy={running || undefined}
      {...props}
    >
      <Collapsible.Trigger className="group flex min-h-12 w-full items-center gap-3 px-3 text-start focus-visible:outline-2 focus-visible:outline-interactive">
        <span
          aria-hidden
          className="transition-transform duration-200 group-data-[panel-open]:rotate-90 motion-reduce:transition-none"
        >
          ›
        </span>
        <span className="min-w-0 flex-1">
          <ActivityLabel
            active={running}
            label={label}
            activeLabel={activeLabel}
            status={status === 'error' ? 'error' : 'default'}
          />
          <span className="ms-2 font-mono text-caption text-foreground-muted">“{query}”</span>
        </span>
        <span className="font-mono text-caption tabular-nums text-foreground-muted">
          {results.length}
        </span>
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0">
        <ul
          className="grid gap-2 border-t border-border p-3 sm:grid-cols-2"
          data-slot="web-search-results"
        >
          {results.map((result) => (
            <li key={result.url}>
              <a
                href={result.url}
                target="_blank"
                rel="noreferrer noopener"
                className={webSearchResultVariants()}
                data-slot="web-search-result"
              >
                <span className="text-sm text-foreground">{result.title}</span>
                <span className="font-mono text-caption text-foreground-muted">
                  {result.domain ?? result.url}
                </span>
                {result.description && (
                  <span className="line-clamp-2 text-caption text-foreground-muted">
                    {result.description}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
