import { useState } from 'react'
import { InputOTP } from '@/InputOTP'

export default function Demo() {
  const [pin4, setPin4] = useState('')
  const [pin6, setPin6] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          4-digit PIN {pin4.length === 4 ? '· complete' : ''}
        </div>
        <InputOTP length={4} value={pin4} onValueChange={setPin4} />
      </div>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          6-digit code {pin6.length === 6 ? '· complete' : ''}
        </div>
        <InputOTP length={6} value={pin6} onValueChange={setPin6} />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        PIN: {pin4 || '—'} · Code: {pin6 || '—'}
      </div>
    </div>
  )
}
