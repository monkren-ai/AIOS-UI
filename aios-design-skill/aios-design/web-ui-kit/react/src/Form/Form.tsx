import * as React from 'react'
import { cn } from '@/lib/utils'
import { formVariants } from './form-variants'

export type FormProps = Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> & {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactNode
}

export function Form({ className, onSubmit, children, ref, ...props }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form
      ref={ref}
      className={cn(formVariants(), className)}
      data-slot="form"
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  )
}

Form.displayName = 'Form'

export { formVariants }
export default Form
