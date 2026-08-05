import { Avatar } from 'nothing-ui/avatar'

export default function AvatarSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Avatar size="sm" fallback="sm" />
      <Avatar size="md" fallback="md" />
      <Avatar size="lg" fallback="lg" />
    </div>
  )
}
