import { RadioGroup } from 'nothing-ui/radio-group'

const OPTIONS = [
  { value: 'system', label: 'Follow system' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export default function RadioGroupBasic() {
  return <RadioGroup name="theme" options={OPTIONS} defaultValue="system" />
}
