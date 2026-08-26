import { Avatar, AvatarGroup } from 'aios-ui-kit/avatar'

export default function AvatarGroupBasic() {
  return (
    <AvatarGroup max={3} aria-label="Project members">
      <Avatar fallback="RS" alt="Ruisheng Zhang" />
      <Avatar fallback="AI" alt="AI agent" />
      <Avatar fallback="UX" alt="UX reviewer" />
      <Avatar fallback="QA" alt="Quality reviewer" />
    </AvatarGroup>
  )
}
