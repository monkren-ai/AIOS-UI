import * as React from 'react'
import { Collapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'
import { sourceVariants, sourcesVariants } from './sources-variants'

const SourcesContext = React.createContext(false)
export interface SourcesProps {
  label?: React.ReactNode
  count?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  className?: string
}
export function Sources({
  label = '来源 / Sources',
  count,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: SourcesProps) {
  const resolvedCount = count ?? React.Children.count(children)
  return (
    <Collapsible.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      className={cn(sourcesVariants(), className)}
      data-slot="sources"
    >
      <Collapsible.Trigger className="flex min-h-11 w-full items-center justify-between gap-3 px-3 font-mono text-caption uppercase focus-visible:outline-2 focus-visible:outline-interactive">
        <span>{label}</span>
        <span>{resolvedCount}</span>
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0">
        <SourcesContext.Provider value>
          <div className="grid gap-2 p-3 pt-0 sm:grid-cols-2" data-slot="sources-list">
            {children}
          </div>
        </SourcesContext.Provider>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
export interface SourceProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  domain: string
  title: React.ReactNode
  icon?: React.ReactNode
}
export function Source({
  domain,
  title,
  icon,
  className,
  ref,
  ...props
}: SourceProps & { ref?: React.Ref<HTMLAnchorElement> }) {
  if (!React.useContext(SourcesContext)) throw new Error('<Source> must be used inside <Sources>')
  return (
    <a
      ref={ref}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(sourceVariants(), className)}
      data-slot="source"
      {...props}
    >
      <span className="flex items-center gap-2 font-mono text-caption uppercase text-foreground-muted">
        <span
          aria-hidden
          className="grid size-5 place-items-center rounded-xs border border-border"
        >
          {icon ?? domain.charAt(0).toUpperCase()}
        </span>
        {domain}
      </span>
      <span className="line-clamp-2 text-foreground">{title}</span>
    </a>
  )
}
