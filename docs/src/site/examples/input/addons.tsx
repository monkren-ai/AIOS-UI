import { Input } from 'aios-ui-kit/input'
import { ArrowRightIcon, SearchIcon } from '../icons'

export default function InputAddons() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Input leadingIcon={<SearchIcon />} placeholder="Search" />
      <Input trailingIcon={<ArrowRightIcon />} placeholder="Go to page" />
      <Input clearable placeholder="Type to reveal the clear button" />
    </div>
  )
}
