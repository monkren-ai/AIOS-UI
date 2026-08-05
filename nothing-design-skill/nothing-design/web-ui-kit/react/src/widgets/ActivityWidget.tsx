import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { withWidgetCard } from './withWidgetCard'
import { useLocalStorageState } from '@/hooks'
import { cn, dataAttr } from '@/lib/utils'
import '@/styles/activity-widget.css'

interface ActivityDay {
  label: string
  value: string
  markers: (0 | 1)[]
}

const activityWidgetVariants = cva('nothing-activity-widget', {
  variants: {
    variant: {
      default: '',
      compact: 'nothing-activity-widget--compact',
      detailed: 'nothing-activity-widget--detailed',
    },
  },
  defaultVariants: { variant: 'default' },
})

const markerVariants = cva('nothing-activity-widget__marker', {
  variants: {
    active: {
      true: 'nothing-activity-widget__marker--active',
      false: 'nothing-activity-widget__marker--inactive',
    },
  },
  defaultVariants: { active: false },
})

export interface ActivityWidgetProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof activityWidgetVariants>, 'variant'> {
  days?: ActivityDay[]
  variant?: 'default' | 'compact' | 'detailed'
  /** Persist days to localStorage under this key. Default 'nothing-ui:activity'. */
  storageKey?: string
}

const defaultDays: ActivityDay[] = [
  { label: 'SUN', value: '9H26', markers: [1, 0, 1] },
  { label: 'MON', value: '9H14', markers: [1, 1, 0] },
  { label: 'TUE', value: '8H52', markers: [0, 1, 1] },
  { label: 'WED', value: '7H30', markers: [1, 0, 0] },
  { label: 'THU', value: '10H05', markers: [1, 1, 1] },
  { label: 'FRI', value: '6H48', markers: [0, 0, 1] },
  { label: 'SAT', value: '5H15', markers: [0, 1, 0] },
]

const ActivityWidgetInner = React.forwardRef<HTMLDivElement, ActivityWidgetProps>(
  (
    { className, days: daysProp, variant, storageKey = 'nothing-ui:activity', style, ...props },
    ref,
  ) => {
    const [persisted, setPersisted] = useLocalStorageState<ActivityDay[]>(storageKey, defaultDays)
    const days = daysProp ?? persisted
    const real = !daysProp && persisted !== defaultDays
    const [editing, setEditing] = React.useState(false)
    const [draft, setDraft] = React.useState<ActivityDay[]>(persisted)

    React.useEffect(() => {
      if (!editing) setDraft(persisted)
    }, [persisted, editing])

    const commit = () => {
      setPersisted(draft)
      setEditing(false)
    }

    const rotate = (idx: number) => {
      const next = draft.map((d, i) =>
        i === idx ? { ...d, markers: d.markers.map((m) => (m ? 0 : 1) as 0 | 1) } : d,
      )
      setDraft(next)
    }

    return (
      <div
        ref={ref}
        className={cn(activityWidgetVariants({ variant }), className)}
        style={style}
        data-variant={dataAttr(variant)}
        data-real={dataAttr(real)}
        data-editing={dataAttr(editing)}
        onDoubleClick={() => {
          if (daysProp) return
          setEditing(true)
          setDraft(persisted)
        }}
        title="Double-click to edit markers"
        {...props}
      >
        {(editing ? draft : days).map((day, di) => (
          <div key={day.label + di} className="nothing-activity-widget__day">
            <div className="nothing-activity-widget__day-label">{day.label}</div>
            <div className="nothing-activity-widget__day-value">{day.value}</div>
            <div className="nothing-activity-widget__markers">
              {day.markers.map((m, mi) => (
                <span
                  key={mi}
                  className={cn(markerVariants({ active: !!m }))}
                  onClick={editing ? () => rotate(di) : undefined}
                  role={editing ? 'button' : undefined}
                  tabIndex={editing ? 0 : undefined}
                />
              ))}
            </div>
          </div>
        ))}
        {editing && (
          <div className="nothing-activity-widget__edit-actions">
            <button type="button" onClick={commit}>
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    )
  },
)
ActivityWidgetInner.displayName = 'ActivityWidget'

export { activityWidgetVariants, markerVariants }
export const ActivityWidget = withWidgetCard(ActivityWidgetInner)
export default ActivityWidget
