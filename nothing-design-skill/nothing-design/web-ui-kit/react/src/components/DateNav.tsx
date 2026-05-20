import '../styles/date-nav.css'

interface DateNavProps {
  label: string
  prevDisabled?: boolean
  nextDisabled?: boolean
  grotesk?: boolean
  disabled?: boolean
  onPrev?: () => void
  onNext?: () => void
}

const DateNav: React.FC<DateNavProps> = ({
  label,
  prevDisabled = false,
  nextDisabled = false,
  grotesk = false,
  disabled = false,
  onPrev,
  onNext
}) => {
  const classNames = [
    'nothing-date-nav',
    disabled ? 'nothing-date-nav--disabled' : ''
  ].filter(Boolean).join(' ')

  const labelClassNames = [
    'nothing-date-nav__label',
    grotesk ? 'nothing-date-nav__label--grotesk' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      <button
        className={[
          'nothing-date-nav__arrow',
          prevDisabled ? 'nothing-date-nav__arrow--disabled' : ''
        ].filter(Boolean).join(' ')}
        onClick={onPrev}
        disabled={prevDisabled || disabled}
        aria-label="Previous"
      >
        &lt;
      </button>
      <div className={labelClassNames}>{label}</div>
      <button
        className={[
          'nothing-date-nav__arrow',
          nextDisabled ? 'nothing-date-nav__arrow--disabled' : ''
        ].filter(Boolean).join(' ')}
        onClick={onNext}
        disabled={nextDisabled || disabled}
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  )
}

export default DateNav
