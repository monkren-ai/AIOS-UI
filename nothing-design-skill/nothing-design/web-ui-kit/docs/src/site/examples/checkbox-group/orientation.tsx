import { CheckboxGroup } from 'aios-ui-kit/checkbox-group'

const options = [
  { value: 'mon', label: 'Mon' },
  { value: 'tue', label: 'Tue' },
  { value: 'wed', label: 'Wed' },
  { value: 'thu', label: 'Thu' },
]

export default function CheckboxGroupOrientation() {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup options={options} orientation="horizontal" defaultValue={['tue', 'wed']} />
      <CheckboxGroup options={options} orientation="vertical" defaultValue={['tue', 'wed']} />
    </div>
  )
}
