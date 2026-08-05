import { RadioGroup } from 'nothing-ui/radio-group'

const OPTIONS = [
  { value: '1x', label: '1x' },
  { value: '1.5x', label: '1.5x' },
  { value: '2x', label: '2x' },
]

export default function RadioGroupOrientation() {
  return (
    <RadioGroup
      name="speed"
      orientation="horizontal"
      options={OPTIONS}
      defaultValue="1x"
      className="justify-center"
    />
  )
}
