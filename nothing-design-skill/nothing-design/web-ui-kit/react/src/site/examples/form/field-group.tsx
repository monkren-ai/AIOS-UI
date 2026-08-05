import { useState } from 'react'
import { Form } from 'nothing-ui/form'
import { Input } from 'nothing-ui/input'
import { Button } from 'nothing-ui/button'
import { formErrorVariants, formGroupVariants } from 'nothing-ui/form'

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
