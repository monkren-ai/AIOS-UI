import { CopyButton } from 'aios-ui-kit/copy-button'

export default function CopyButtonWithText() {
  return (
    <div className="flex items-center gap-2">
      <code className="font-mono text-sm text-foreground">npm i aios-ui</code>
      <CopyButton value="npm i aios-ui">复制</CopyButton>
    </div>
  )
}
