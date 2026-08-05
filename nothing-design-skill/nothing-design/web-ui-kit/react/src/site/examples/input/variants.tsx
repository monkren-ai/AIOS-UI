import { Input } from 'nothing-ui/input'

export default function InputVariants() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Input variant="outline" label="Outline" placeholder="Transparent background" />
      <Input variant="soft" label="Soft" placeholder="Raised surface" />
    </div>
  )
}
