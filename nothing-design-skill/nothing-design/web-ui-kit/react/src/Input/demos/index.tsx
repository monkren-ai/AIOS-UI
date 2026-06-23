import { Input } from '../Input'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input variant="underline" label="Name" placeholder="Enter name" />
      <Input variant="bordered" label="Email" placeholder="Enter email" />
      <Input variant="underline" label="Error" placeholder="Try typing" error="Invalid input" />
    </div>
  )
}
