import { Select } from 'nothing-ui/select'

const TIMEZONES = [
  { value: 'utc', label: 'UTC' },
  { value: 'lon', label: 'Europe / London' },
  { value: 'ber', label: 'Europe / Berlin' },
  { value: 'nyc', label: 'America / New York' },
  { value: 'sfo', label: 'America / Los Angeles' },
  { value: 'sha', label: 'Asia / Shanghai' },
  { value: 'tyo', label: 'Asia / Tokyo' },
  { value: 'syd', label: 'Australia / Sydney' },
]

export default function SelectSearchable() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Select searchable label="Timezone" options={TIMEZONES} placeholder="Search timezones" />
    </div>
  )
}
