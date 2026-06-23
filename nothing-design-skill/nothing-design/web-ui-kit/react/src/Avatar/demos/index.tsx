import { Avatar } from '../Avatar'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Avatar size="sm" fallback="AB" />
      <Avatar size="md" fallback="CD" />
      <Avatar size="lg" fallback="EF" />
    </div>
  )
}
