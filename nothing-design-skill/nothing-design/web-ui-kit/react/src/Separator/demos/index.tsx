import { Separator } from '../Separator'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Separator />
      <Separator label="Section" />
    </div>
  )
}
