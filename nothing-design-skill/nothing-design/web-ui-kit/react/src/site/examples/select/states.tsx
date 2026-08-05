import { Select } from 'nothing-ui/select'

const OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'never', label: 'Never' },
]

export default function SelectStates() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
      <Select label="Digest" options={OPTIONS} error="Choose how often you want the digest." />
      <Select label="Billing cycle" options={OPTIONS} defaultValue="weekly" disabled />
    </div>
  )
}
