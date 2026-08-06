import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  dateFieldInputVariants,
  dateFieldSegmentVariants,
  dateFieldVariants,
  type DateFieldSize,
} from './date-field-variants'

type SegmentKind = 'year' | 'month' | 'day'

interface SegmentConfig {
  maxLength: number
  max: number
  placeholder: string
  label: string
}

const SEGMENTS: Record<SegmentKind, SegmentConfig> = {
  year: { maxLength: 4, max: 9999, placeholder: 'YYYY', label: 'Year / 年' },
  month: { maxLength: 2, max: 12, placeholder: 'MM', label: 'Month / 月' },
  day: { maxLength: 2, max: 31, placeholder: 'DD', label: 'Day / 日' },
}

/** locale → 段顺序。zh 默认年月日，en 月日年。 */
const ORDERS: Record<'zh' | 'en', SegmentKind[]> = {
  zh: ['year', 'month', 'day'],
  en: ['month', 'day', 'year'],
}

type Segments = Record<SegmentKind, string>

/** 把 ISO 字符串拆成三段，缺失补空串（容错部分值）。 */
function parseValue(iso: string | undefined): Segments {
  if (!iso) return { year: '', month: '', day: '' }
  const parts = iso.split('-')
  return { year: parts[0] ?? '', month: parts[1] ?? '', day: parts[2] ?? '' }
}

/** 把三段拼回字符串；全空返回空串。 */
function stringify(segs: Segments): string {
  if (!segs.year && !segs.month && !segs.day) return ''
  return `${segs.year}-${segs.month}-${segs.day}`
}

/** 过滤数字、截断到段长、按段上限钳制。 */
function clampSegment(kind: SegmentKind, raw: string): string {
  const cfg = SEGMENTS[kind]
  const digits = raw.replace(/\D/g, '').slice(0, cfg.maxLength)
  if (digits.length === cfg.maxLength) {
    const n = parseInt(digits, 10)
    if (kind === 'month' && n > 12) return '12'
    if (kind === 'day' && n > 31) return '31'
  }
  return digits
}

export interface DateFieldProps extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  /** ISO 日期 YYYY-MM-DD。传了即受控。 */
  value?: string
  /** 非受控初始值。 */
  defaultValue?: string
  /** 任意段变化后调用，参数是拼接后的字符串。 */
  onValueChange?: (value: string) => void
  /** 段顺序：zh=年月日（默认），en=月日年。 */
  locale?: 'zh' | 'en'
  disabled?: boolean
  label?: string
  /** 错误文案；有值时段边框转红并播报。 */
  error?: string
  size?: DateFieldSize
  /** 各段输入框的占位提示，覆盖默认的 YYYY/MM/DD。 */
  placeholder?: string
}

export function DateField({
  value: controlledValue,
  defaultValue,
  onValueChange,
  locale = 'zh',
  disabled = false,
  label,
  error,
  size = 'md',
  placeholder,
  className,
  ref,
  ...props
}: DateFieldProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const [activeKind, setActiveKind] = React.useState<SegmentKind | null>(null)
  const inputRefs = React.useRef<Record<SegmentKind, HTMLInputElement | null>>({
    year: null,
    month: null,
    day: null,
  })

  const order = ORDERS[locale]
  const segments = parseValue(value)
  const hasError = Boolean(error)

  const commit = React.useCallback(
    (next: Segments) => {
      const joined = stringify(next)
      if (controlledValue === undefined) setInternalValue(joined)
      onValueChange?.(joined)
    },
    [controlledValue, onValueChange],
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
      // 焦点落到第一个未填满的段
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
      className={cn(dateFieldVariants({ size, disabled, error: hasError }), className)}
      data-slot="date-field"
      data-size={dataAttr(size)}
      data-state={dataAttr(hasError ? 'error' : disabled ? 'disabled' : 'default')}
      data-disabled={dataAttr(disabled)}
      data-error={dataAttr(hasError)}
      data-invalid={dataAttr(hasError)}
      role="group"
      aria-label={label || 'Date / 日期'}
      {...props}
    >
      {label && (
        <label
          className="font-mono uppercase tracking-wider text-foreground-muted text-label"
          data-slot="date-field-label"
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-xs" data-slot="date-field-control">
        {order.map((kind, i) => (
          <React.Fragment key={kind}>
            {i > 0 && (
              <span
                aria-hidden="true"
                data-slot="date-field-separator"
                className="font-mono text-foreground-muted"
              >
                -
              </span>
            )}
            <div
              className={dateFieldSegmentVariants({
                size,
                kind,
                active: activeKind === kind,
                filled: !!segments[kind],
                error: hasError,
              })}
              data-slot="date-field-segment"
              data-kind={kind}
              data-active={dataAttr(activeKind === kind)}
              data-filled={dataAttr(!!segments[kind])}
            >
              <input
                ref={(el) => {
                  inputRefs.current[kind] = el
                }}
                className={dateFieldInputVariants({ size })}
                data-slot="date-field-input"
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
          data-slot="date-field-error"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

DateField.displayName = 'DateField'

export { dateFieldVariants, dateFieldSegmentVariants }
export default DateField
