import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  type AgeDecadeState,
  ageDecadeFillVariants,
  ageDecadeLabelVariants,
  ageDecadeSegmentVariants,
  ageInputFieldVariants,
  ageInputLabelVariants,
  ageMotionVariants,
  ageSecondaryVariants,
  ageSectionLabelVariants,
  ageUnitLabelVariants,
  ageValueVariants,
  ageYearPercentVariants,
  ageYearSegmentVariants,
} from './age-motion-variants'

export type AgeMotionSize = 'sm' | 'md' | 'lg'

interface AgeData {
  years: number
  months: number
  days: number
  totalHours: number
  totalMinutes: number
  totalSeconds: number
  currentSegment: number
  segmentProgress: number
  yearProgress: number
}

function computeAge(birthDate: Date, now: Date): AgeData {
  const diff = now.getTime() - birthDate.getTime()
  const totalSeconds = Math.floor(diff / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 24)

  let years = now.getFullYear() - birthDate.getFullYear()
  let months = now.getMonth() - birthDate.getMonth()
  let days = now.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const currentAgeDecimal = years + months / 12 + days / 365
  const currentSegment = Math.floor(currentAgeDecimal / 10)
  const segmentProgress = (currentAgeDecimal % 10) / 10

  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1)
  const yearProgress =
    (now.getTime() - startOfYear.getTime()) / (endOfYear.getTime() - startOfYear.getTime())

  return {
    years,
    months,
    days,
    totalHours,
    totalMinutes,
    totalSeconds,
    currentSegment,
    segmentProgress,
    yearProgress,
  }
}

export interface AgeMotionProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
    Omit<VariantProps<typeof ageMotionVariants>, 'size'> {
  birthDate?: string
  lifespan?: number
  updateInterval?: number
  yearSegments?: number
  size?: AgeMotionSize
}

export function AgeMotion({
  className,
  birthDate: initialBirthDate,
  lifespan = 80,
  updateInterval = 1000,
  yearSegments = 20,
  size = 'md',
  style,
  ref,
  ...props
}: AgeMotionProps) {
  const [birthDateStr, setBirthDateStr] = useState(initialBirthDate ?? '')
  const [now, setNow] = useState(new Date())

  const birthDate = useMemo(
    () => (birthDateStr ? new Date(birthDateStr + 'T00:00:00') : null),
    [birthDateStr],
  )

  useEffect(() => {
    if (!birthDate) return
    const timer = setInterval(() => setNow(new Date()), updateInterval)
    return () => clearInterval(timer)
  }, [birthDate, updateInterval])

  const ageData = useMemo(() => {
    if (!birthDate) return null
    return computeAge(birthDate, now)
  }, [birthDate, now])

  const totalSegments = lifespan / 10

  const filledYearSegments = ageData ? Math.round(ageData.yearProgress * yearSegments) : 0

  return (
    <div
      ref={ref}
      className={cn(ageMotionVariants({ size }), className)}
      style={style}
      data-slot="age-motion"
      data-size={dataAttr(size)}
      data-state={dataAttr(ageData ? 'ready' : 'empty')}
      {...props}
    >
      <div data-slot="age-motion-input-area" className="mb-6">
        <div className="relative flex flex-col gap-1">
          <label
            data-slot="age-motion-input-label"
            className={cn(ageInputLabelVariants())}
            htmlFor="birthDateInput"
          >
            Date of Birth
          </label>
          <input
            data-slot="age-motion-input"
            className={cn(ageInputFieldVariants())}
            type="date"
            id="birthDateInput"
            placeholder="YYYY-MM-DD"
            value={birthDateStr}
            onChange={(e) => setBirthDateStr(e.target.value)}
          />
        </div>
      </div>

      {ageData && (
        <>
          <div data-slot="age-motion-display" className="mb-6">
            <div className="mb-2 flex items-baseline gap-4">
              {(
                [
                  ['years', ageData.years, 'Years'],
                  ['months', ageData.months, 'Months'],
                  ['days', ageData.days, 'Days'],
                ] as const
              ).map(([unit, value, label]) => (
                <div
                  key={unit}
                  data-slot="age-motion-unit"
                  data-unit={dataAttr(unit)}
                  className="flex flex-col items-center"
                >
                  <div data-slot="age-motion-value" className={cn(ageValueVariants())}>
                    {value}
                  </div>
                  <div data-slot="age-motion-unit-label" className={cn(ageUnitLabelVariants())}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <div data-slot="age-motion-secondary" className={cn(ageSecondaryVariants())}>
              {ageData.totalHours.toLocaleString()}h {ageData.totalMinutes.toLocaleString()}m{' '}
              {ageData.totalSeconds.toLocaleString()}s
            </div>
          </div>

          <div data-slot="age-motion-life-progress" className="mb-6">
            <div
              data-slot="age-motion-life-progress-label"
              className={cn(ageSectionLabelVariants(), 'mb-2 block')}
            >
              Life Progress
            </div>
            <div className="mb-1 flex w-full gap-0.5">
              {Array.from({ length: totalSegments }).map((_, i) => {
                const state: AgeDecadeState =
                  i < ageData.currentSegment
                    ? 'completed'
                    : i === ageData.currentSegment
                      ? 'current'
                      : 'upcoming'

                return (
                  <div
                    key={i}
                    data-slot="age-motion-decade"
                    data-state={dataAttr(state)}
                    className={cn(ageDecadeSegmentVariants({ state }))}
                  >
                    {state === 'current' && (
                      <div
                        data-slot="age-motion-decade-fill"
                        className={cn(ageDecadeFillVariants())}
                        style={{ width: `${ageData.segmentProgress * 100}%` }}
                      />
                    )}
                    <span
                      data-slot="age-motion-decade-label"
                      className={cn(ageDecadeLabelVariants({ state }))}
                    >
                      {i * 10}-{(i + 1) * 10}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div data-slot="age-motion-year-progress" className="mb-4">
            <div
              data-slot="age-motion-year-progress-label"
              className={cn(ageSectionLabelVariants(), 'mb-1 block')}
            >
              Year Progress
            </div>
            <div className="flex h-2 w-full gap-0.5">
              {Array.from({ length: yearSegments }).map((_, i) => (
                <div
                  key={i}
                  data-slot="age-motion-year-segment"
                  data-filled={dataAttr(i < filledYearSegments)}
                  className={cn(ageYearSegmentVariants({ filled: i < filledYearSegments }))}
                />
              ))}
            </div>
            <div data-slot="age-motion-year-percent" className={cn(ageYearPercentVariants())}>
              {(ageData.yearProgress * 100).toFixed(1)}%
            </div>
          </div>
        </>
      )}
    </div>
  )
}

AgeMotion.displayName = 'AgeMotion'

export { ageMotionVariants }
export default AgeMotion
