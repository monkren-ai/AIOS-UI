import '../../styles/steps-widget.css'

interface StepsWidgetProps {
  steps?: number
  streak?: number
  streakUnit?: string
  className?: string
}

const StepsWidget: React.FC<StepsWidgetProps> = ({
  steps = 0,
  streak = 0,
  streakUnit = 'DAYS',
  className
}) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US')
  }

  const classNames = [
    'nothing-steps-widget',
    className || ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      <div className="nothing-steps-widget__group">
        <span className="nothing-steps-widget__label">Total Steps</span>
        <span className="nothing-steps-widget__value">{formatNumber(steps)}</span>
      </div>
      <div className="nothing-steps-widget__group">
        <span className="nothing-steps-widget__label">Streak</span>
        <span className="nothing-steps-widget__value">{streak} {streakUnit}</span>
      </div>
    </div>
  )
}

export default StepsWidget
