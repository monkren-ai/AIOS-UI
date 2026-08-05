import { Select } from 'nothing-ui/select'

const OPTIONS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'phone-2', label: 'Phone (2)' },
  { value: 'ear', label: 'Ear' },
  { value: 'ear-open', label: 'Ear (open)' },
]

export default function SelectBasic() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Select options={OPTIONS} defaultValue="phone-2a" />
    </div>
  )
}
