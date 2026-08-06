import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  caffeinateDecayVariants,
  caffeinateDrinkButtonVariants,
  caffeinateDrinkMgVariants,
  caffeinateLevelVariants,
  caffeinateLogItemVariants,
  caffeinateLogTitleVariants,
  caffeinateSegmentVariants,
  caffeinateUnitVariants,
  caffeinateVariants,
} from './caffeinate-variants'

interface Drink {
  type: string
  mg: number
  time: Date
}

export type CaffeinateStatus = 'low' | 'medium' | 'high'

export interface CaffeinateProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
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

export function Caffeinate({
  className,
  updateInterval = 60000,
  totalSegments = 10,
  maxCaffeine = 400,
  halfLifeMinutes = 300,
  thresholdMg = 50,
  status: statusProp,
  disabled = false,
  style,
  ref,
  ...props
}: CaffeinateProps) {
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
      data-slot="caffeinate"
      data-state={dataAttr(derivedStatus)}
      data-disabled={dataAttr(disabled)}
      aria-disabled={disabled}
      {...props}
    >
      <div
        data-slot="caffeinate-header"
        className="mb-4 flex w-full items-baseline justify-between"
      >
        <div
          data-slot="caffeinate-level"
          className={cn(caffeinateLevelVariants({ status: derivedStatus }))}
        >
          {caffeine}
        </div>
        <div data-slot="caffeinate-unit" className={cn(caffeinateUnitVariants())}>
          mg
        </div>
      </div>
      <div data-slot="caffeinate-decay" className={cn(caffeinateDecayVariants())}>
        {minutesToThreshold !== null
          ? `${formatMinutes(minutesToThreshold)} below ${thresholdMg}mg`
          : `Below ${thresholdMg}mg`}
      </div>
      <div data-slot="caffeinate-progress" className="mb-6 flex h-4 w-full gap-0.5">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <div
            key={index}
            data-slot="caffeinate-segment"
            data-filled={dataAttr(index < filledSegments)}
            className={cn(
              caffeinateSegmentVariants({ filled: index < filledSegments, status: derivedStatus }),
            )}
          />
        ))}
      </div>
      <div data-slot="caffeinate-drinks" className="mb-6 flex flex-wrap gap-2">
        {drinkOptions.map((opt) => (
          <button
            key={opt.type}
            type="button"
            data-slot="caffeinate-drink-button"
            className={cn(caffeinateDrinkButtonVariants())}
            disabled={disabled}
            onClick={() => handleAddDrink(opt.type, opt.mg)}
          >
            {opt.type}
            <span data-slot="caffeinate-drink-mg" className={cn(caffeinateDrinkMgVariants())}>
              {opt.mg}mg
            </span>
          </button>
        ))}
      </div>
      <div data-slot="caffeinate-log" className="flex flex-col gap-2">
        <div data-slot="caffeinate-log-title" className={cn(caffeinateLogTitleVariants())}>
          Intake Log
        </div>
        {drinks
          .slice(-5)
          .reverse()
          .map((drink, index) => (
            <div
              key={index}
              data-slot="caffeinate-log-item"
              className={cn(caffeinateLogItemVariants())}
            >
              <div data-slot="caffeinate-log-info" className="flex flex-col gap-0.5">
                <div
                  data-slot="caffeinate-log-type"
                  className="font-body text-sm text-foreground transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
                >
                  {drink.type}
                </div>
                <div
                  data-slot="caffeinate-log-time"
                  className="font-mono text-caption tabular-nums text-foreground-disabled transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
                >
                  {formatTime(drink.time)}
                </div>
              </div>
              <div
                data-slot="caffeinate-log-amount"
                className="font-mono text-sm tabular-nums text-foreground-muted transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
              >
                +{drink.mg}mg
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

Caffeinate.displayName = 'Caffeinate'

export { caffeinateVariants }
export default Caffeinate
