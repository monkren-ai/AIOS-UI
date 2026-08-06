import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  timeFieldInputVariants,
  timeFieldSegmentVariants,
  timeFieldVariants,
  type TimeFieldSize,
} from './time-field-variants'

type SegmentKind = 'hour' | 'minute' | 'second'

interface SegmentConfig {
  maxLength: number
  max: number
  placeholder: string
  label: string
}

const SEGMENTS: Record<SegmentKind, SegmentConfig> = {
  hour: { maxLength: 2, max: 23, placeholder: 'HH', label: 'Hour / 时' },
  minute: { maxLength: 2, max: 59, placeholder: 'mm', label: 'Minute / 分' },
  second: { maxLength: 2, max: 59, placeholder: 'ss', label: 'Second / 秒' },
}

type Segments = Record<SegmentKind, string>

/** 把时间字符串拆成段，缺失补空串（容错部分值）。 */
function parseValue(time: string | undefined): Segments {
  if (!time) return { hour: '', minute: '', second: '' }
  const parts = time.split(':')
  return { hour: parts[0] ?? '', minute: parts[1] ?? '', second: parts[2] ?? '' }
}

/** 把段拼回字符串；全空返回空串。 */
function stringify(segs: Segments, showSeconds: boolean): string {
  const allEmpty = !segs.hour && !segs.minute && (!showSeconds || !segs.second)
  if (allEmpty) return ''
  return showSeconds
    ? `${segs.hour}:${segs.minute}:${segs.second}`
    : `${segs.hour}:${segs.minute}`
}

/** 过滤数字、截断到 2 位、按段上限钳制（24 小时制）。 */
function clampSegment(kind: SegmentKind, raw: string): string {
  const cfg = SEGMENTS[kind]
  const digits = raw.replace(/\D/g, '').slice(0, cfg.maxLength)
  if (digits.length === cfg.maxLength) {
    const n = parseInt(digits, 10)
    if (n > cfg.max) return String(cfg.max)
  }
  return digits
}

export interface TimeFieldProps extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  /** 时间 `HH:mm` 或 `HH:mm:ss`。传了即受控。 */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** 是否显示秒段，默认 false。 */
  showSeconds?: boolean
  disabled?: boolean
  label?: string
  error?: string
  size?: TimeFieldSize
  placeholder?: string
}

export function TimeField({
  value: controlledValue,
  defaultValue,
  onValueChange,
  showSeconds = false,
  disabled = false,
  label,
  error,
  size = 'md',
  placeholder,
  className,
  ref,
  ...props
}: TimeFieldProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const [activeKind, setActiveKind] = React.useState<SegmentKind | null>(null)
  const inputRefs = React.useRef<Record<SegmentKind, HTMLInputElement | null>>({
    hour: null,
    minute: null,
    second: null,
  })

  const order: SegmentKind[] = showSeconds
    ? ['hour', 'minute', 'second']
    : ['hour', 'minute']
  const segments = parseValue(value)
  const hasError = Boolean(error)

  const commit = React.useCallback(
    (next: Segments) => {
      const joined = stringify(next, showSeconds)
      if (controlledValue === undefined) setInternalValue(joined)
      onValueChange?.(joined)
    },
    [controlledValue, onValueChange, showSeconds],
  )

  const setSegment = React.useCallback(
    (kind: SegmentKind, next: string) => {
      commit({ ...segments, [kind]: next })
    },
    [segments, commit],
  )

  const focusKind = React.useCallback((kind: SegmentKind) => {
    inputRefs.current[kind]?.focus()
  }, [])

  const handleChange = React.useCallback(
    (kind: SegmentKind, e: React.ChangeEvent<HTMLInputElement>) => {
      const next = clampSegment(kind, e.target.value)
      setSegment(kind, next)
      const idx = order.indexOf(kind)
      if (next.length === SEGMENTS[kind].maxLength && idx < order.length - 1) {
        focusKind(order[idx + 1])
      }
    },
    [order, setSegment, focusKind],
  )

  const handleKeyDown = React.useCallback(
    (kind: SegmentKind, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault()
        const cur = segments[kind]
        if (cur.length > 0) {
          setSegment(kind, cur.slice(0, -1))
        } else {
          const idx = order.indexOf(kind)
          if (idx > 0) {
            const prev = order[idx - 1]
            setSegment(prev, segments[prev].slice(0, -1))
            focusKind(prev)
          }
        }
        return
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const idx = order.indexOf(kind)
        const step = e.key === 'ArrowRight' ? 1 : -1
        const nextIdx = idx + step
        if (nextIdx < 0 || nextIdx > order.length - 1) return
        e.preventDefault()
        focusKind(order[nextIdx])
      }
    },
    [order, segments, setSegment, focusKind],
  )

  const handlePaste = React.useCallback(
    (kind: SegmentKind, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const digits = e.clipboardData.getData('text').replace(/\D/g, '')
      const next = { ...segments }
      const startIdx = order.indexOf(kind)
      let cursor = 0
      for (let i = startIdx; i < order.length && cursor < digits.length; i++) {
        const k = order[i]
        const cap = SEGMENTS[k].maxLength
        next[k] = clampSegment(k, digits.slice(cursor, cursor + cap))
        cursor += cap
      }
      commit(next)
      const target =
        order.find((k) => next[k].length < SEGMENTS[k].maxLength) ?? order[order.length - 1]
      focusKind(target)
    },
    [order, segments, commit, focusKind],
  )

  const handleFocus = React.useCallback((kind: SegmentKind) => setActiveKind(kind), [])
  const handleBlur = React.useCallback(() => setActiveKind(null), [])

  return (
    <div
      ref={ref}
      className={cn(timeFieldVariants({ size, disabled, error: hasError }), className)}
      data-slot="time-field"
      data-size={dataAttr(size)}
      data-state={dataAttr(hasError ? 'error' : disabled ? 'disabled' : 'default')}
      data-disabled={dataAttr(disabled)}
      data-error={dataAttr(hasError)}
      data-invalid={dataAttr(hasError)}
      role="group"
      aria-label={label || 'Time / 时间'}
      {...props}
    >
      {label && (
        <label
          className="font-mono uppercase tracking-wider text-foreground-muted text-label"
          data-slot="time-field-label"
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-xs" data-slot="time-field-control">
        {order.map((kind, i) => (
          <React.Fragment key={kind}>
            {i > 0 && (
              <span
                aria-hidden="true"
                data-slot="time-field-separator"
                className="font-mono text-foreground-muted"
              >
                :
              </span>
            )}
            <div
              className={timeFieldSegmentVariants({
                size,
                kind,
                active: activeKind === kind,
                filled: !!segments[kind],
                error: hasError,
              })}
              data-slot="time-field-segment"
              data-kind={kind}
              data-active={dataAttr(activeKind === kind)}
              data-filled={dataAttr(!!segments[kind])}
            >
              <input
                ref={(el) => {
                  inputRefs.current[kind] = el
                }}
                className={timeFieldInputVariants({ size })}
                data-slot="time-field-input"
                type="text"
                inputMode="numeric"
                maxLength={SEGMENTS[kind].maxLength}
                value={segments[kind]}
                placeholder={placeholder ?? SEGMENTS[kind].placeholder}
                disabled={disabled}
                onChange={(e) => handleChange(kind, e)}
                onKeyDown={(e) => handleKeyDown(kind, e)}
                onPaste={(e) => handlePaste(kind, e)}
                onFocus={() => handleFocus(kind)}
                onBlur={handleBlur}
                aria-label={SEGMENTS[kind].label}
                aria-invalid={hasError || undefined}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      {hasError && (
        <div
          className="font-mono uppercase tracking-wide text-label text-accent"
          data-slot="time-field-error"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

TimeField.displayName = 'TimeField'

export { timeFieldVariants, timeFieldSegmentVariants }
export default TimeField
