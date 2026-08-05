import { useState } from 'react'
import { Form } from 'nothing-ui/form'
import { Input } from 'nothing-ui/input'
import { Button } from 'nothing-ui/button'

export default function FormBasic() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <Form
      className="w-full max-w-xs"
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget)
        setSubmitted(String(data.get('callsign') ?? ''))
      }}
    >
      <Input name="callsign" label="Callsign" placeholder="NOTHING-1" />
      <Button type="submit">Submit</Button>
      {submitted && (
        <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
          Submitted: {submitted}
        </p>
      )}
    </Form>
  )
}
