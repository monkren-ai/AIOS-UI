import { useState } from 'react'
import { Input } from '@/Input'

export default function Demo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const usernameError =
    username === 'admin' ? 'Username already taken' : undefined

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input
        variant="underline"
        label="Name"
        placeholder="Enter name"
        value={name}
        onChange={setName}
      />
      <Input
        variant="bordered"
        label="Email"
        placeholder="Enter email"
        value={email}
        onChange={setEmail}
      />
      <Input
        variant="underline"
        label="Username"
        placeholder="Try typing 'admin'"
        value={username}
        onChange={setUsername}
        error={usernameError}
      />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Name: {name || '—'} · Email: {email || '—'}
      </div>
    </div>
  )
}
