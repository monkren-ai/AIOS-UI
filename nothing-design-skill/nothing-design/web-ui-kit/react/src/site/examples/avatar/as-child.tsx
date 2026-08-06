import { Avatar } from 'aios-ui-kit/avatar'

export default function AvatarAsChild() {
  return (
    <Avatar asChild variant="outline" size="lg">
      <button
        type="button"
        aria-label="Open Ada Lovelace’s profile"
        onClick={() => console.log('open')}
      >
        AL
      </button>
    </Avatar>
  )
}
