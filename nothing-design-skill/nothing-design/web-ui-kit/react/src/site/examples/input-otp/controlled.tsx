import { useState } from 'react'
import { InputOTP } from 'nothing-ui/input-otp'

export default function InputOTPControlled() {
  const [value, setValue] = useState('')
  const isComplete = value.length === 4

  return (
    <div className="flex flex-col items-start gap-2">
      <InputOTP
        length={4}
        value={value}
        onValueChange={setValue}
        error={isComplete && value !== '2606'}
      />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {isComplete
          ? value === '2606'
            ? 'Verified'
            : 'Incorrect code'
          : `${value.length}/4 digits`}
      </p>
    </div>
  )
}
