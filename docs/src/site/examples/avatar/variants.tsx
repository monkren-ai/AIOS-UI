import { Avatar } from 'aios-ui-kit/avatar'

export default function AvatarVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Avatar variant="soft" fallback="SF" />
      <Avatar variant="outline" fallback="OL" />
      <Avatar variant="ghost" fallback="GH" />
      <Avatar variant="soft" shape="technical" fallback="TC" />
      <Avatar variant="outline" shape="technical" fallback="TC" />
    </div>
  )
}
