import { Input } from 'aios-ui-kit/input'

export default function InputValidation() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Input label="Device name" message="Shown to people nearby." placeholder="Phone (2a)" />
      <Input label="Email" error="That address is missing an @." placeholder="you@nothing.tech" />
      <Input label="Serial" disabled placeholder="A063-0000-0000" />
    </div>
  )
}
