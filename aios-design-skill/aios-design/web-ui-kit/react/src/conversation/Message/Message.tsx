import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { messageVariants } from './message-variants'

const MessageContext = React.createContext(false)
export interface MessageProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof messageVariants> {
  role?: 'assistant' | 'user' | 'system'
  avatar?: React.ReactNode
}
export function Message({
  role = 'assistant',
  variant,
  avatar,
  className,
  children,
  ref,
  ...props
}: MessageProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(messageVariants({ role, variant }), className)}
      data-slot="message"
      data-role={role}
      {...props}
    >
      {avatar && role !== 'user' && (
        <div className="shrink-0" data-slot="message-avatar">
          {avatar}
        </div>
      )}
      <MessageContext.Provider value>
        <div className="min-w-0 max-w-[85%] rounded-card" data-slot="message-body">
          {children}
        </div>
      </MessageContext.Provider>
      {avatar && role === 'user' && (
        <div className="shrink-0" data-slot="message-avatar">
          {avatar}
        </div>
      )}
    </div>
  )
}
function useMessage(name: string) {
  if (!React.useContext(MessageContext)) throw new Error(`<${name}> must be used inside <Message>`)
}
export function MessageContent({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  useMessage('MessageContent')
  return (
    <div
      ref={ref}
      className={cn('text-sm leading-6 text-foreground', className)}
      data-slot="message-content"
      {...props}
    />
  )
}
export function MessageActions({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  useMessage('MessageActions')
  return (
    <div
      ref={ref}
      className={cn('mt-2 flex min-h-11 items-center gap-1 text-foreground-muted', className)}
      data-slot="message-actions"
      {...props}
    />
  )
}
export function MessageAction({
  className,
  ref,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }) {
  useMessage('MessageAction')
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'min-h-11 rounded-button px-3 font-mono text-caption uppercase hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive',
        className,
      )}
      data-slot="message-action"
      {...props}
    />
  )
}
export interface MessageCopyActionProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  text: string
  copyLabel?: string
  copiedLabel?: string
}
export function MessageCopyAction({
  text,
  copyLabel = '复制 / Copy',
  copiedLabel = '已复制 / Copied',
  onClick,
  ...props
}: MessageCopyActionProps) {
  const [copied, setCopied] = React.useState(false)
  const copy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await navigator.clipboard?.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
    onClick?.(event)
  }
  return (
    <MessageAction {...props} onClick={copy} aria-live="polite">
      {copied ? copiedLabel : copyLabel}
    </MessageAction>
  )
}
