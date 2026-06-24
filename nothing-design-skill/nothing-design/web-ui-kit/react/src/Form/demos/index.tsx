import { useState, type FormEvent } from 'react'
import { Form } from '@/Form'
import { Input } from '@/Input'
import { Button } from '@/Button'

export default function Demo() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState<{ username: string; email: string } | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Valid email is required')
      return
    }
    setError('')
    setSubmitted({ username, email })
  }

  const handleReset = () => {
    setUsername('')
    setEmail('')
    setError('')
    setSubmitted(null)
  }

  return (
    <div style={{ maxWidth: 320 }}>
      <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input
          variant="underline"
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={setUsername}
        />
        <Input
          variant="bordered"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={setEmail}
        />
        {error && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-error, #e5484d)',
            }}
          >
            {error}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="ghost" type="button" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Form>
      {submitted && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: 'var(--surface-raised)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Submitted ✓
          <br />
          Username: {submitted.username}
          <br />
          Email: {submitted.email}
        </div>
      )}
    </div>
  )
}
