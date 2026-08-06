import { useState } from 'react'
import { Form } from 'aios-ui-kit/form'
import { Input } from 'aios-ui-kit/input'
import { Button } from 'aios-ui-kit/button'
import { formErrorVariants, formGroupVariants } from 'aios-ui-kit/form'

export default function FormFieldGroup() {
  const [error, setError] = useState<string | null>(null)

  return (
    <Form
      className="w-full max-w-xs"
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget)
        const email = String(data.get('email') ?? '')
        setError(email.includes('@') ? null : 'Enter a valid email address')
      }}
    >
      <div className={formGroupVariants({ hasError: Boolean(error) })}>
        <Input name="email" label="Email" placeholder="you@nothing.tech" />
        {error && <p className={formErrorVariants()}>{error}</p>}
      </div>
      <Button type="submit">Continue</Button>
    </Form>
  )
}
