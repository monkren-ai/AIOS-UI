import { useState } from 'react'
import { InputMessage } from 'nothing-ui/input-message'

export default function InputMessageBasic() {
  const [sent, setSent] = useState<string[]>([])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {sent.length > 0 && (
        <ul className="flex flex-col gap-1">
          {sent.map((message, index) => (
            <li
              key={index}
              className="rounded-md bg-surface-raised px-3 py-1.5 font-body text-sm text-foreground"
            >
              {message}
            </li>
          ))}
        </ul>
      )}
      <InputMessage
        placeholder="Message the crew..."
        onSend={(value) => setSent((prev) => [...prev, value])}
      />
    </div>
  )
}
