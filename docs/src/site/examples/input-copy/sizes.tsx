import { InputCopy } from 'aios-ui-kit/input-copy'

export default function InputCopySizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputCopy size="sm" label="Small" defaultValue="nt-sm-0001" />
      <InputCopy size="md" label="Medium" defaultValue="nt-md-0001" />
      <InputCopy size="lg" label="Large" defaultValue="nt-lg-0001" />
    </div>
  )
}
