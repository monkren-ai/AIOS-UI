import '../styles/widget-grid.css'

interface WidgetGridProps {
  dense?: boolean
  compact?: boolean
  className?: string
  children?: React.ReactNode
}

const WidgetGrid: React.FC<WidgetGridProps> = ({
  dense = false,
  compact = false,
  className,
  children
}) => {
  const classNames = [
    'nothing-widget-grid',
    dense ? 'nothing-widget-grid--dense' : '',
    compact ? 'nothing-widget-grid--compact' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

export default WidgetGrid
