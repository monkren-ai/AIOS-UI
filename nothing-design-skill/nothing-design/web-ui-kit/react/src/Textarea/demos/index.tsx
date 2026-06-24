import { useState } from 'react'
import { Textarea } from '@/Textarea'

export default function Demo() {
  const MAX = 120
  const [message, setMessage] = useState('')
  const [note, setNote] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <Textarea
        label="Message"
        placeholder={`Up to ${MAX} characters...`}
        value={message}
        onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
      />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        {message.length}/{MAX} {message.length >= MAX ? '· limit reached' : ''}
      </div>
      <Textarea
        label="Auto resize"
        autoResize
        minRows={2}
        maxRows={5}
        placeholder="Type to grow..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  )
}
