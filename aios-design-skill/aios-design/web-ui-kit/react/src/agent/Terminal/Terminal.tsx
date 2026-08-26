import * as React from 'react'
import { cn } from '@/lib/utils'
import { terminalVariants } from './terminal-variants'

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  command: string
  running?: boolean
  exitCode?: number
  runningLabel?: string
}

export function Terminal({
  command,
  running = false,
  exitCode = 0,
  runningLabel = '运行中 / Running',
  className,
  children,
  ref,
  ...props
}: TerminalProps & { ref?: React.Ref<HTMLDivElement> }) {
  const failed = !running && exitCode !== 0
  return (
    <div
      ref={ref}
      className={cn(terminalVariants({ failed }), className)}
      data-slot="terminal"
      data-running={running || undefined}
      data-exit-code={running ? undefined : exitCode}
      aria-busy={running || undefined}
      {...props}
    >
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-border px-3">
        <code className="min-w-0 truncate">
          <span aria-hidden className="me-2 text-foreground-disabled">
            $
          </span>
          {command}
        </code>
        <span
          role="status"
          aria-live="polite"
          className={cn('shrink-0 text-caption text-foreground-muted', failed && 'text-accent')}
        >
          {running ? runningLabel : `exit ${exitCode}`}
        </span>
      </div>
      <div
        className="flex min-h-12 flex-col gap-1 overflow-auto p-3 whitespace-pre text-foreground-muted"
        data-slot="terminal-output"
      >
        {children}
        {running && (
          <span
            aria-hidden
            className="h-4 w-2 animate-pulse bg-foreground motion-reduce:animate-none"
          />
        )}
      </div>
    </div>
  )
}

export function TerminalLine({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        'min-h-5 motion-safe:animate-[aios-fade-in_var(--duration-micro)_ease-out]',
        className,
      )}
      data-slot="terminal-line"
      {...props}
    />
  )
}
