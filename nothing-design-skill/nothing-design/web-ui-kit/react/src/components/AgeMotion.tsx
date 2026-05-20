import { useState, useEffect, useMemo } from 'react'
import '../styles/age-motion.css'

interface AgeMotionProps {
  birthDate?: string
  lifespan?: number
  updateInterval?: number
  yearSegments?: number
}

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

function computeAge(birthDate: Date): AgeData {
  const now = new Date()
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
  const yearProgress = (now.getTime() - startOfYear.getTime()) / (endOfYear.getTime() - startOfYear.getTime())

  return {
    years,
    months,
    days,
    totalHours,
    totalMinutes,
    totalSeconds,
    currentSegment,
    segmentProgress,
    yearProgress
  }
}

const AgeMotion: React.FC<AgeMotionProps> = ({
  birthDate: initialBirthDate,
  lifespan = 80,
  updateInterval = 1000,
  yearSegments = 20
}) => {
  const [birthDateStr, setBirthDateStr] = useState(initialBirthDate ?? '')
  const [now, setNow] = useState(new Date())

  const birthDate = birthDateStr ? new Date(birthDateStr + 'T00:00:00') : null

  useEffect(() => {
    if (!birthDate) return
    const timer = setInterval(() => setNow(new Date()), updateInterval)
    return () => clearInterval(timer)
  }, [birthDate, updateInterval])

  const ageData = useMemo(() => {
    if (!birthDate) return null
    return computeAge(birthDate)
  }, [birthDate, now])

  const totalSegments = lifespan / 10

  const filledYearSegments = ageData ? Math.round(ageData.yearProgress * yearSegments) : 0

  return (
    <div className="nothing-age-motion">
      <div className="age-input-area">
        <div className="age-input">
          <label className="age-input__label" htmlFor="birthDateInput">Date of Birth</label>
          <input
            className="age-input__field"
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
          <div className="age-display">
            <div className="age-display__primary">
              <div className="age-display__unit">
                <div className="age-display__value">{ageData.years}</div>
                <div className="age-display__label">Years</div>
              </div>
              <div className="age-display__unit">
                <div className="age-display__value">{ageData.months}</div>
                <div className="age-display__label">Months</div>
              </div>
              <div className="age-display__unit">
                <div className="age-display__value">{ageData.days}</div>
                <div className="age-display__label">Days</div>
              </div>
            </div>
            <div className="age-display__secondary">
              {ageData.totalHours.toLocaleString()}h {ageData.totalMinutes.toLocaleString()}m {ageData.totalSeconds.toLocaleString()}s
            </div>
          </div>

          <div className="age-progress">
            <div className="age-progress__label">Life Progress</div>
            <div className="age-progress__segments">
              {Array.from({ length: totalSegments }).map((_, i) => {
                let cls = 'age-progress__segment'
                if (i < ageData.currentSegment) cls += ' completed'
                else if (i === ageData.currentSegment) cls += ' current'

                return (
                  <div key={i} className={cls}>
                    {i === ageData.currentSegment && (
                      <div
                        className="age-progress__segment-fill"
                        style={{ width: `${ageData.segmentProgress * 100}%` }}
                      />
                    )}
                    <span className="age-progress__segment-label">
                      {i * 10}-{(i + 1) * 10}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="age-year-progress">
            <div className="age-year-progress__label">Year Progress</div>
            <div className="age-year-progress__bar">
              {Array.from({ length: yearSegments }).map((_, i) => (
                <div
                  key={i}
                  className={`age-year-progress__segment${i < filledYearSegments ? ' filled' : ''}`}
                />
              ))}
            </div>
            <div className="age-year-progress__percent">
              {(ageData.yearProgress * 100).toFixed(1)}%
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AgeMotion
