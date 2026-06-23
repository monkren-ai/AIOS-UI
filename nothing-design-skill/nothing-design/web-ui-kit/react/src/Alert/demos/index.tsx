import { Alert } from '../Alert'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert title="Information">
        This is a default alert message.
      </Alert>
      <Alert variant="destructive" title="Error">
        Something went wrong. Please try again.
      </Alert>
    </div>
  )
}
