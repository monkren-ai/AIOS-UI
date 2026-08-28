import { useState } from 'react'
import { Input } from 'aios-ui-kit/input'
import { Button } from 'aios-ui-kit/button'

export default function InputMotion() {
  const [error, setError] = useState<string | undefined>()

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Input
        label="Device name"
        error={error}
        clearable
        defaultValue="Phone (2a)"
        placeholder="Phone (2a)"
      />
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setError(error ? undefined : 'That name is already taken.')}
      >
        {error ? 'Clear error' : 'Trigger error'}
      </Button>
    </div>
  )
}
