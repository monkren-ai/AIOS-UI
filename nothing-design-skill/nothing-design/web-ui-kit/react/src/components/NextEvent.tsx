import '../styles/next-event.css'

interface EventData {
  title: string
  date: number
  month: string
}

interface NextEventProps {
  theme?: 'light' | 'dark'
  event?: EventData
  className?: string
}

const NextEvent: React.FC<NextEventProps> = ({
  theme = 'dark',
  event,
  className
}) => {
  const displayEvent = event || { title: 'No upcoming events', date: 0, month: '' }

  const classNames = [
    'nothing-next-event',
    `nothing-next-event--${theme}`,
    className || ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      <span className="nothing-next-event__label">Next Event:</span>
      <div className="nothing-next-event__content">
        <span className="nothing-next-event__title">{displayEvent.title}</span>
        {displayEvent.date > 0 && (
          <span className="nothing-next-event__date">{displayEvent.date}</span>
        )}
        {displayEvent.month && (
          <span className="nothing-next-event__month">{displayEvent.month}</span>
        )}
      </div>
    </div>
  )
}

export default NextEvent
