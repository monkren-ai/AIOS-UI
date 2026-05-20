import '../styles/label.css'

interface LabelProps {
  htmlFor?: string
  disabled?: boolean
  required?: boolean
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  disabled = false,
  required = false,
  children
}) => {
  const classNames = [
    'nothing-label',
    disabled ? 'nothing-label--disabled' : ''
  ].filter(Boolean).join(' ')

  return (
    <label className={classNames} htmlFor={htmlFor}>
      <span className="nothing-label__text">{children}</span>
      {required && (
        <span className="nothing-label__required" aria-hidden="true">*</span>
      )}
    </label>
  )
}

export default Label
