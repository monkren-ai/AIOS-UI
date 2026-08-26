import * as React from 'react'
import { cn } from '@/lib/utils'
import { conversationViewportVariants } from './conversation-viewport-variants'

interface ConversationViewportContextValue {
  atBottom: boolean
  scrollToBottom: (behavior?: ScrollBehavior) => void
}
const ConversationViewportContext = React.createContext<ConversationViewportContextValue | null>(
  null,
)
const STICK_THRESHOLD = 32

export interface ConversationViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean
}
export function ConversationViewport({
  autoScroll = true,
  className,
  children,
  ref,
  ...props
}: ConversationViewportProps & { ref?: React.Ref<HTMLDivElement> }) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const stickRef = React.useRef(true)
  const [atBottom, setAtBottom] = React.useState(true)
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )
  const scrollToBottom = React.useCallback((behavior: ScrollBehavior = 'smooth') => {
    const node = viewportRef.current
    if (!node) return
    stickRef.current = true
    node.scrollTo({ top: node.scrollHeight, behavior })
  }, [])
  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const node = event.currentTarget
    const next = node.scrollHeight - node.scrollTop - node.clientHeight < STICK_THRESHOLD
    stickRef.current = next
    setAtBottom(next)
    props.onScroll?.(event)
  }
  React.useEffect(() => {
    const node = viewportRef.current
    if (
      !node ||
      !autoScroll ||
      typeof ResizeObserver === 'undefined' ||
      typeof MutationObserver === 'undefined'
    )
      return
    const follow = () => {
      if (stickRef.current) node.scrollTop = node.scrollHeight
    }
    const resize = new ResizeObserver(follow)
    Array.from(node.children).forEach((child) => resize.observe(child))
    const mutation = new MutationObserver(follow)
    mutation.observe(node, { childList: true, subtree: true, characterData: true })
    return () => {
      resize.disconnect()
      mutation.disconnect()
    }
  }, [autoScroll])
  return (
    <ConversationViewportContext.Provider value={{ atBottom, scrollToBottom }}>
      <div
        ref={setRef}
        role="log"
        aria-live="polite"
        className={cn(conversationViewportVariants(), className)}
        data-slot="conversation-viewport"
        {...props}
        onScroll={onScroll}
      >
        {children}
      </div>
    </ConversationViewportContext.Provider>
  )
}

export function ConversationContent({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('mx-auto flex w-full max-w-3xl flex-col gap-5 p-4', className)}
      data-slot="conversation-content"
      {...props}
    />
  )
}

export function ConversationScrollButton({
  label = '滚动到底部 / Scroll to bottom',
  className,
}: {
  label?: string
  className?: string
}) {
  const context = React.useContext(ConversationViewportContext)
  if (!context)
    throw new Error('<ConversationScrollButton> must be used inside <ConversationViewport>')
  if (context.atBottom) return null
  return (
    <div
      className={cn('pointer-events-none sticky bottom-3 z-10 flex justify-center', className)}
      data-slot="conversation-scroll-button"
    >
      <button
        type="button"
        className="pointer-events-auto min-h-11 rounded-pill border border-border-visible bg-surface px-4 font-mono text-caption uppercase"
        onClick={() => context.scrollToBottom()}
      >
        {label}
      </button>
    </div>
  )
}
