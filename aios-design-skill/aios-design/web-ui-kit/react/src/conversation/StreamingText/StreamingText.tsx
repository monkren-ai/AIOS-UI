import * as React from 'react'
import { cn } from '@/lib/utils'
import { streamingTextSegmentVariants, streamingTextVariants } from './streaming-text-variants'
import './StreamingText.css'

export type StreamingTextVariant = 'plain' | 'fade' | 'tail'

export interface StreamingTextProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  children: string
  variant?: StreamingTextVariant
  /** Shows a visual caret and busy state while more text is expected. */
  streaming?: boolean
}

interface Segment {
  key: number
  text: string
  createdAt: number
}

interface StreamState {
  settled: string
  segments: Segment[]
}

const SETTLE_MS = 700

function tokenize(chunk: string): string[] {
  return chunk.match(/\s*\S+|\s+$/g) ?? []
}

export function StreamingText({
  children: text,
  variant = 'fade',
  streaming = false,
  className,
  ref,
  ...props
}: StreamingTextProps & { ref?: React.Ref<HTMLSpanElement> }) {
  const [state, setState] = React.useState<StreamState>(() => ({
    settled: text,
    segments: [],
  }))
  const previousText = React.useRef(text)
  const previousVariant = React.useRef<StreamingTextVariant>(variant)

  React.useLayoutEffect(() => {
    const previous = previousText.current
    const variantChanged = previousVariant.current !== variant
    previousText.current = text
    previousVariant.current = variant

    if (variant === 'plain') return
    if (!variantChanged && text === previous) return

    if (!variantChanged && text.length > previous.length && text.startsWith(previous)) {
      const createdAt = Date.now()
      let offset = 0
      const segments = tokenize(text.slice(previous.length)).map((token) => {
        const segment = { key: previous.length + offset, text: token, createdAt }
        offset += token.length
        return segment
      })
      setState((current) => ({ ...current, segments: [...current.segments, ...segments] }))
      return
    }

    setState({ settled: text, segments: [] })
  }, [text, variant])

  React.useEffect(() => {
    if (state.segments.length === 0) return
    const delay = Math.max(0, state.segments[0].createdAt + SETTLE_MS - Date.now())
    const timer = window.setTimeout(() => {
      setState((current) => {
        const cutoff = Date.now() - SETTLE_MS
        let count = 0
        let folded = ''
        while (count < current.segments.length && current.segments[count].createdAt <= cutoff) {
          folded += current.segments[count].text
          count += 1
        }
        if (count === 0) return current
        return {
          settled: current.settled + folded,
          segments: current.segments.slice(count),
        }
      })
    }, delay + 20)
    return () => window.clearTimeout(timer)
  }, [state.segments])

  return (
    <span
      ref={ref}
      className={cn(streamingTextVariants({ variant }), className)}
      data-slot="streaming-text"
      data-variant={variant}
      data-streaming={streaming || undefined}
      aria-busy={streaming || undefined}
      aria-live="polite"
      aria-atomic="false"
      {...props}
    >
      {variant === 'plain' ? (
        text
      ) : (
        <>
          {state.settled}
          {state.segments.map((segment) => (
            <span
              key={segment.key}
              className={streamingTextSegmentVariants({ variant })}
              data-slot="streaming-text-segment"
            >
              {segment.text}
            </span>
          ))}
          {streaming && (
            <span
              aria-hidden="true"
              className="aios-streaming-text__caret"
              data-slot="streaming-text-caret"
            />
          )}
        </>
      )}
      {variant === 'plain' && streaming && (
        <span
          aria-hidden="true"
          className="aios-streaming-text__caret"
          data-slot="streaming-text-caret"
        />
      )}
    </span>
  )
}
