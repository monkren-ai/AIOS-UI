import { RadioGroup } from 'aios-ui-kit/radio-group'

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

export default function RadioGroupSizes() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      <RadioGroup name="size-sm" size="sm" options={OPTIONS} defaultValue="a" />
      <RadioGroup name="size-md" size="md" options={OPTIONS} defaultValue="a" />
      <RadioGroup name="size-lg" size="lg" options={OPTIONS} defaultValue="a" />
    </div>
  )
}
