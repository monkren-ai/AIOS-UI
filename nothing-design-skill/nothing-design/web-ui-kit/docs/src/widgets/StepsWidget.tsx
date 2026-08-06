import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { withWidgetCard } from './withWidgetCard'
import { useLocalStorageState } from '@/hooks'
import { cn, dataAttr } from '@/lib/utils'
import '@/styles/steps-widget.css'

const stepsWidgetVariants = cva('nothing-steps-widget', {
  variants: {
    variant: {
      compact: 'nothing-steps-widget--compact',
      full: 'nothing-steps-widget--full',
      default: '',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface StepsWidgetProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof stepsWidgetVariants>, 'variant'> {
  steps?: number
  streak?: number
  streakUnit?: string
  variant?: 'compact' | 'full' | 'default'
  /** Allow user to update steps interactively. Default true. */
  editable?: boolean
}

const STORAGE_KEY = 'aios-ui-kit:steps'

const StepsWidgetInner = React.forwardRef<HTMLDivElement, StepsWidgetProps>(
  (
    {
      className,
      steps: stepsProp,
      streak = 0,
      streakUnit = 'DAYS',
      variant,
      editable = true,
      style,
      ...props
    },
    ref,
  ) => {
    const formatNumber = (num: number): string => num.toLocaleString('en-US')
    const [persisted, setPersisted] = useLocalStorageState<number>(STORAGE_KEY, 0)
    const effectiveSteps = stepsProp ?? persisted
    const real = stepsProp === undefined && persisted > 0
    const [editing, setEditing] = React.useState(false)
    const [draft, setDraft] = React.useState(String(persisted))

    React.useEffect(() => {
      if (!editing) setDraft(String(persisted))
    }, [persisted, editing])

    const commit = () => {
      const n = Math.max(0, Math.floor(Number(draft) || 0))
      setPersisted(n)
      setEditing(false)
    }

    return (
      <div
        ref={ref}
        className={cn(stepsWidgetVariants({ variant }), className)}
        style={style}
        role="group"
        aria-label={`Total steps: ${formatNumber(effectiveSteps)}, Streak: ${streak} ${streakUnit}`}
        data-variant={dataAttr(variant)}
        data-real={dataAttr(real)}
        {...props}
      >
        <div className="nothing-steps-widget__group">
          <span className="nothing-steps-widget__label">Total Steps</span>
          {editing && editable ? (
            <input
              autoFocus
              type="number"
              min={0}
              className="nothing-steps-widget__input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit()
                else if (e.key === 'Escape') setEditing(false)
              }}
            />
          ) : (
            <span
              className={cn('nothing-steps-widget__value', editable && 'is-editable')}
              aria-label={`${formatNumber(effectiveSteps)} steps`}
              onClick={editable ? () => setEditing(true) : undefined}
              role={editable ? 'button' : undefined}
              tabIndex={editable ? 0 : undefined}
              onKeyDown={
                editable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setEditing(true)
                      }
                    }
                  : undefined
              }
            >
              {formatNumber(effectiveSteps)}
            </span>
          )}
        </div>
        <div className="nothing-steps-widget__group">
          <span className="nothing-steps-widget__label">Streak</span>
          <span
            className="nothing-steps-widget__value"
            aria-label={`${streak} ${streakUnit} streak`}
          >
            {streak} {streakUnit}
          </span>
        </div>
      </div>
    )
  },
)
StepsWidgetInner.displayName = 'StepsWidget'

export { stepsWidgetVariants }
export const StepsWidget = withWidgetCard(StepsWidgetInner)
export default StepsWidget
