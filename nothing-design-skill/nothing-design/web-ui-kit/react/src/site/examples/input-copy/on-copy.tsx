import { useState } from 'react'
import { InputCopy } from 'nothing-ui/input-copy'

export default function InputCopyOnCopy() {
  const [copyCount, setCopyCount] = useState(0)

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-2">
      <InputCopy
        label="Invite link"
        defaultValue="https://nothing.tech/invite/x8k2"
        onCopy={() => setCopyCount((count) => count + 1)}
      />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        Copied {copyCount} time{copyCount === 1 ? '' : 's'}
      </p>
    </div>
  )
}
