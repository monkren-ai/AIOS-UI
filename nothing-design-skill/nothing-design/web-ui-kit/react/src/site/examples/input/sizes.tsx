import { Input } from 'aios-ui-kit/input'

export default function InputSizes() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Input size="sm" label="Small" placeholder="36px" />
      <Input size="md" label="Medium" placeholder="44px" />
      <Input size="lg" label="Large" placeholder="52px" />
    </div>
  )
}
