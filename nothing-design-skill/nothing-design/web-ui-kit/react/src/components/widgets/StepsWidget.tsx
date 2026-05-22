import { withWidgetCard } from './withWidgetCard'
import '../../styles/steps-widget.css'

interface StepsWidgetProps {
  steps?: number
  streak?: number
  streakUnit?: string
  className?: string
  style?: React.CSSProperties
}

const StepsWidget: React.FC<StepsWidgetProps> = ({
  steps = 0,
  streak = 0,
  streakUnit = 'DAYS',
  className,
  style
}) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US')
  }

  const classNames = [
    'nothing-steps-widget',
    className || ''
  ].filter(Boolean).join(' ')

  const content = (
    <div className={classNames} style={style} role="group" aria-label={`Total steps: ${formatNumber(steps)}, Streak: ${streak} ${streakUnit}`}>
      <div className="nothing-steps-widget__group">
        <span className="nothing-steps-widget__label">Total Steps</span>
        <span className="nothing-steps-widget__value" aria-label={`${formatNumber(steps)} steps`}>{formatNumber(steps)}</span>
      </div>
      <div className="nothing-steps-widget__group">
        <span className="nothing-steps-widget__label">Streak</span>
        <span className="nothing-steps-widget__value" aria-label={`${streak} ${streakUnit} streak`}>{streak} {streakUnit}</span>
      </div>
    </div>
  )

  return content
}

export default withWidgetCard(StepsWidget)
