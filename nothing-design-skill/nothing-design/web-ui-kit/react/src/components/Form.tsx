import '../styles/form.css'

interface FormProps {
  onSubmit?: (e: React.FormEvent) => void
  children: React.ReactNode
  className?: string
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  const classNames = [
    'nothing-form',
    className
  ].filter(Boolean).join(' ')

  return (
    <form
      className={classNames}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}

export default Form
