import * as React from 'react'
import { cn } from '@/lib/utils'
import { threadListItemVariants, threadListVariants } from './thread-list-variants'

export function ThreadList({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }) {
  return (
    <nav
      ref={ref}
      className={cn(threadListVariants(), className)}
      data-slot="thread-list"
      {...props}
    />
  )
}

export function ThreadListSection({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        'px-2 pt-3 font-mono text-caption uppercase text-foreground-disabled',
        className,
      )}
      data-slot="thread-list-section"
      {...props}
    />
  )
}

export function ThreadListNew({
  children = '新建会话 / New chat',
  className,
  ref,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex min-h-11 items-center gap-2 rounded-button px-2 text-start text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-interactive',
        className,
      )}
      data-slot="thread-list-new"
      {...props}
    >
      <span aria-hidden>+</span>
      <span>{children}</span>
    </button>
  )
}

export interface ThreadListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
  meta?: React.ReactNode
  active?: boolean
  unread?: boolean
  actions?: React.ReactNode
  onSelect?: () => void
}

export function ThreadListItem({
  title,
  meta,
  active = false,
  unread = false,
  actions,
  onSelect,
  className,
  ref,
  ...props
}: ThreadListItemProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(threadListItemVariants({ active }), className)}
      data-slot="thread-list-item"
      data-active={active || undefined}
      {...props}
    >
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-2 self-stretch px-2 text-start focus-visible:outline-2 focus-visible:outline-interactive"
        aria-current={active ? 'page' : undefined}
        onClick={onSelect}
      >
        <span className="min-w-0 flex-1 truncate text-sm">{title}</span>
        {(meta || unread) && (
          <span
            className={cn(
              'flex items-center gap-1 font-mono text-caption text-foreground-muted',
              actions && 'group-hover/thread:hidden group-focus-within/thread:hidden',
            )}
          >
            {unread && !active && (
              <span className="size-2 rounded-full bg-accent" aria-label="未读 / Unread" />
            )}
            {meta}
          </span>
        )}
      </button>
      {actions && (
        <span
          className="hidden items-center gap-1 pe-1 group-hover/thread:flex group-focus-within/thread:flex"
          data-slot="thread-list-item-actions"
        >
          {actions}
        </span>
      )}
    </div>
  )
}

export function ThreadListItemAction({
  className,
  ref,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'grid size-9 place-items-center rounded-button text-foreground-muted hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive',
        className,
      )}
      data-slot="thread-list-item-action"
      onClick={(event) => {
        event.stopPropagation()
        onClick?.(event)
      }}
      {...props}
    />
  )
}
