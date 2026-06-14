import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/caffeinate.css'

interface Drink {
  type: string
  mg: number
  time: Date
}

export type CaffeinateStatus = 'low' | 'medium' | 'high'

const caffeinateVariants = cva('nothing-caffeinate', {
  variants: {
    status: {
      low: 'nothing-caffeinate--low',
      medium: 'nothing-caffeinate--medium',
      high: 'nothing-caffeinate--high',
    },
    disabled: {
      true: 'nothing-caffeinate--disabled',
      false: '',
    },
  },
  defaultVariants: { status: 'low', disabled: false },
})

export interface CaffeinateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof caffeinateVariants>, 'status' | 'disabled'> {
  updateInterval?: number
  totalSegments?: number
  maxCaffeine?: number
  halfLifeMinutes?: number
  thresholdMg?: number
  status?: CaffeinateStatus
  disabled?: boolean
}

const drinkOptions = [
  { type: 'Espresso', mg: 63 },
  { type: 'Coffee', mg: 95 },
  { type: 'Tea', mg: 47 },
  { type: 'Energy', mg: 80 },
]

export const Caffeinate = React.forwardRef<HTMLDivElement, CaffeinateProps>(
  (
    {
      className,
      updateInterval = 60000,
      totalSegments = 10,
      maxCaffeine = 400,
      halfLifeMinutes = 300,
      thresholdMg = 50,
      status: statusProp,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const [drinks, setDrinks] = useState<Drink[]>([])
    const [now, setNow] = useState(Date.now())

    useEffect(() => {
      const timer = setInterval(() => setNow(Date.now()), updateInterval)
      return () => clearInterval(timer)
    }, [updateInterval])

    const currentCaffeine = useMemo(() => {
      let total = 0
      for (const drink of drinks) {
        const elapsedMinutes = (now - drink.time.getTime()) / 60000
        const remaining = drink.mg * Math.pow(0.5, elapsedMinutes / halfLifeMinutes)
        total += remaining
      }
      return Math.round(total)
    }, [drinks, now, halfLifeMinutes])

    const timeToThreshold = useMemo(() => {
      if (currentCaffeine <= thresholdMg) return null

      let minutes = 0
      let level = currentCaffeine
      while (level > thresholdMg && minutes < 1440) {
        minutes += 1
        level = currentCaffeine * Math.pow(0.5, minutes / halfLifeMinutes)
      }
      return minutes
    }, [currentCaffeine, thresholdMg, halfLifeMinutes])

    const caffeine = currentCaffeine
    const percent = Math.min((caffeine / maxCaffeine) * 100, 100)
    const filledSegments = Math.round((percent / 100) * totalSegments)
    const minutesToThreshold = timeToThreshold

    const derivedStatus: CaffeinateStatus =
      statusProp ?? (caffeine >= 200 ? 'high' : caffeine >= 100 ? 'medium' : 'low')

    const formatMinutes = (mins: number) => {
      if (mins < 60) return `${mins}m`
      const h = Math.floor(mins / 60)
      const m = mins % 60
      return m > 0 ? `${h}h ${m}m` : `${h}h`
    }

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const handleAddDrink = (type: string, mg: number) => {
      if (disabled) return
      setDrinks((prev) => [...prev, { type, mg, time: new Date() }])
    }

    return (
      <div
        ref={ref}
        className={cn(caffeinateVariants({ status: derivedStatus, disabled }), className)}
        style={style}
        data-state={dataAttr(derivedStatus)}
        data-disabled={dataAttr(disabled)}
        aria-disabled={disabled}
        {...props}
      >
        <div className="caffeinate-header">
          <div className="caffeinate-level">{caffeine}</div>
          <div className="caffeinate-unit">mg</div>
        </div>
        <div className="caffeinate-decay">
          {minutesToThreshold !== null
            ? `${formatMinutes(minutesToThreshold)} below ${thresholdMg}mg`
            : `Below ${thresholdMg}mg`}
        </div>
        <div className="caffeinate-progress">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={cn('caffeinate-segment', index < filledSegments && 'filled')}
            />
          ))}
        </div>
        <div className="caffeinate-drinks">
          {drinkOptions.map((opt) => (
            <button
              key={opt.type}
              className="caffeinate-drink-btn"
              disabled={disabled}
              onClick={() => handleAddDrink(opt.type, opt.mg)}
            >
              {opt.type}
              <span className="caffeinate-drink-mg">{opt.mg}mg</span>
            </button>
          ))}
        </div>
        <div className="caffeinate-log">
          <div className="caffeinate-log-title">Intake Log</div>
          {drinks
            .slice(-5)
            .reverse()
            .map((drink, index) => (
              <div key={index} className="caffeinate-log-item">
                <div className="caffeinate-log-info">
                  <div className="caffeinate-log-type">{drink.type}</div>
                  <div className="caffeinate-log-time">{formatTime(drink.time)}</div>
                </div>
                <div className="caffeinate-log-amount">+{drink.mg}mg</div>
              </div>
            ))}
        </div>
      </div>
    )
  }
)
Caffeinate.displayName = 'Caffeinate'

export { caffeinateVariants }
export default Caffeinate
