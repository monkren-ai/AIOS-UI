import { Alert } from 'nothing-ui/alert'

export default function AlertSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert size="sm" title="sm">
        Tight enough to sit under a form field.
      </Alert>
      <Alert size="md" title="md">
        The default, for alerts that own a block of the page.
      </Alert>
      <Alert size="lg" title="lg">
        For the one message a screen is actually about.
      </Alert>
    </div>
  )
}
