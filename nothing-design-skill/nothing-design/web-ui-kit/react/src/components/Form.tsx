import * as React from 'react'
import { cn } from '../lib/utils'
import '../styles/form.css'

export type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactNode
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, children, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit?.(e)
    }
    return (
      <form
        ref={ref}
        className={cn('nothing-form', className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    )
  }
)
Form.displayName = 'Form'

export default Form
