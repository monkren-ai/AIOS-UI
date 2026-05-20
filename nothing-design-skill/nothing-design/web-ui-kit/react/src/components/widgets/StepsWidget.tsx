import WidgetCard from '../WidgetCard'
import '../../styles/steps-widget.css'

interface StepsWidgetProps {
  steps?: number
  streak?: number
  streakUnit?: string
  card?: boolean | Omit<React.ComponentProps<typeof WidgetCard>, 'children'>
  className?: string
  style?: React.CSSProperties
}

const StepsWidget: React.FC<StepsWidgetProps> = ({
  steps = 0,
  streak = 0,
  streakUnit = 'DAYS',
  card,
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
    <div className={classNames} style={style}>
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

  if (card) {
    const cardProps = typeof card === 'object' ? card : {}
    return <WidgetCard {...cardProps}>{content}</WidgetCard>
  }

  return content
}

export default StepsWidget
