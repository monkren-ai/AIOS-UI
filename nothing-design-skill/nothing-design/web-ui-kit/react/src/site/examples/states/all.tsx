import { Button } from 'nothing-ui/button'
import {
  DisabledState,
  EmptyState,
  ErrorState,
  LoadingState,
} from 'nothing-ui/states'

export default function StatesAll() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <LoadingState progress={72} label="Syncing" />
      <ErrorState headline="Connection lost" message="Check your network and try again." onRetry={() => {}} />
      <EmptyState
        headline="No messages"
        description="Start a conversation to see it here."
        action={<Button size="sm">New chat</Button>}
      />
      <DisabledState headline="Coming soon" description="This feature is not available yet." />
    </div>
  )
}
