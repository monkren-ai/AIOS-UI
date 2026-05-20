import { useState } from 'react'
import '../styles/calendar.css'

interface CalendarProps {
  type?: 'compact' | 'full'
  initialDate?: Date
  style?: React.CSSProperties
}

const Calendar: React.FC<CalendarProps> = ({ 
  type = 'compact', 
  initialDate = new Date(),
  style
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate)

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December']

  const dayName = days[currentDate.getDay()]
  const date = currentDate.getDate()
  const monthName = months[currentDate.getMonth()]
  const monthYear = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const getCalendarDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
    
    const today = new Date()
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && 
                         today.getFullYear() === currentDate.getFullYear()

    const calendarDays: Array<{ day: number; isOtherMonth: boolean; isToday: boolean }> = []

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({ day: prevLastDay - i, isOtherMonth: true, isToday: false })
    }

    // Current month days
    for (let i = 1; i <= lastDay; i++) {
      const isToday = isCurrentMonth && today.getDate() === i
      calendarDays.push({ day: i, isOtherMonth: false, isToday })
    }

    // Next month days
    const remainingDays = 42 - calendarDays.length
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({ day: i, isOtherMonth: true, isToday: false })
    }

    return calendarDays
  }

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  if (type === 'compact') {
    return (
      <div className="nothing-calendar-compact">
        <div className="calendar-compact-day">{dayName}</div>
        <div className="calendar-compact-date">{String(date).padStart(2, '0')}</div>
        <div className="calendar-compact-month">{monthName}</div>
      </div>
    )
  }

  return (
    <div className="nothing-calendar-full" style={style}>
      <div className="calendar-full-header">
        <div className="calendar-full-month-year">{monthYear}</div>
        <div className="calendar-full-nav">
          <button className="calendar-nav-btn" onClick={handlePrevMonth} aria-label="Previous month">&lt;</button>
          <button className="calendar-nav-btn" onClick={handleNextMonth} aria-label="Next month">&gt;</button>
        </div>
      </div>
      <div className="calendar-grid" role="grid">
        {weekdays.map((day, index) => (
          <div key={index} className="calendar-weekday">{day}</div>
        ))}
        {getCalendarDays().map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day.isOtherMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''}`}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
