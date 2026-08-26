import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { assistantPanelVariants } from './assistant-panel-variants'

export interface AssistantPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  launcherLabel?: string
  closeLabel?: string
  launcher?: React.ReactNode
  inline?: boolean
  autoFocus?: boolean
  panelClassName?: string
}

export function AssistantPanel({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  title = 'AI 助手 / AI Assistant',
  launcherLabel = '打开 AI 助手 / Open AI assistant',
  closeLabel = '关闭 AI 助手 / Close AI assistant',
  launcher,
  inline = false,
  autoFocus = true,
  panelClassName,
  className,
  children,
  ref,
  ...props
}: AssistantPanelProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = controlledOpen ?? internalOpen
  const titleId = React.useId()
  const launcherRef = React.useRef<HTMLButtonElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [controlledOpen, onOpenChange],
  )

  React.useEffect(() => {
    if (!open) return
    if (autoFocus) closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [autoFocus, open, setOpen])

  return (
    <div
      ref={ref}
      className={cn(inline ? 'relative' : '', className)}
      data-slot="assistant-panel-root"
      data-open={dataAttr(open)}
      {...props}
    >
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className={cn(assistantPanelVariants({ inline }), panelClassName)}
          data-slot="assistant-panel"
        >
          <header
            className="flex min-h-12 items-center justify-between gap-3 border-b border-border px-4"
            data-slot="assistant-panel-header"
          >
            <h2 id={titleId} className="font-mono text-label uppercase">
              {title}
            </h2>
            <button
              ref={closeRef}
              type="button"
              className="min-h-11 px-2 text-caption text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive"
              onClick={() => {
                setOpen(false)
                launcherRef.current?.focus()
              }}
              aria-label={closeLabel}
            >
              ×
            </button>
          </header>
          <div className="min-h-0 flex-1 overflow-auto" data-slot="assistant-panel-content">
            {children}
          </div>
        </section>
      )}
      <button
        ref={launcherRef}
        type="button"
        className={cn(
          'z-overlay grid size-12 place-items-center rounded-full border border-border-visible bg-foreground-display text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive',
          inline ? 'absolute inset-inline-end-0 bottom-0' : 'fixed inset-inline-end-4 bottom-4',
        )}
        aria-label={open ? closeLabel : launcherLabel}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        data-slot="assistant-panel-launcher"
      >
        {launcher ?? (open ? '−' : '+')}
      </button>
    </div>
  )
}
