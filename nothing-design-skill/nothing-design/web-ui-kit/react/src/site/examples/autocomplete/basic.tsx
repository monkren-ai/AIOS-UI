import { Autocomplete } from '@/Autocomplete'

const ITEMS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'phone-2', label: 'Phone (2)' },
  { value: 'ear', label: 'Ear' },
  { value: 'ear-open', label: 'Ear (open)' },
  { value: 'watch', label: 'Watch' },
]

export default function AutocompleteBasic() {
  return (
    <div className="w-full max-w-xs">
      <Autocomplete
        label="Device"
        placeholder="Search devices..."
        items={ITEMS}
      />
    </div>
  )
}
