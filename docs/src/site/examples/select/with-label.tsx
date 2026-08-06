import { Select } from 'aios-ui-kit/select'

const REGIONS = [
  { value: 'eu', label: 'Europe' },
  { value: 'na', label: 'North America' },
  { value: 'apac', label: 'Asia Pacific' },
  { value: 'latam', label: 'Latin America', disabled: true },
]

export default function SelectWithLabel() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Select label="Region" options={REGIONS} placeholder="Pick a region" />
    </div>
  )
}
