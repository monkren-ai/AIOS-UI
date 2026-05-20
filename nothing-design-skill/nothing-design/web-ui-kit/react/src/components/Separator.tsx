import '../styles/separator.css'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  label?: string
}

const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  decorative = false,
  label
}) => {
  const classNames = [
    'nothing-separator',
    `nothing-separator--${orientation}`,
    label ? 'nothing-separator--labeled' : ''
  ].filter(Boolean).join(' ')

  const ariaProps = decorative
    ? { 'aria-hidden': true }
    : label
      ? {}
      : { role: 'separator', 'aria-orientation': orientation }

  return (
    <div className={classNames} {...ariaProps}>
      <div className="nothing-separator__line" />
      {label && <span className="nothing-separator__label">{label}</span>}
      <div className="nothing-separator__line" />
    </div>
  )
}

export default Separator
