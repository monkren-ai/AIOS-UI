import { RadioGroup } from 'aios-ui-kit/radio-group'

const PLANS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise — contact sales', disabled: true },
]

export default function RadioGroupDisabled() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      <RadioGroup name="plan" options={PLANS} defaultValue="free" />
      <RadioGroup name="plan-locked" options={PLANS} defaultValue="pro" disabled />
    </div>
  )
}
