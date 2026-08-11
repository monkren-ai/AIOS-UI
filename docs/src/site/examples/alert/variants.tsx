import { Alert } from 'aios-ui-kit/alert'

export default function AlertVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert title="Firmware 2.6.1">
        Installs on the next restart. No further action is required from you.
      </Alert>
      <Alert variant="destructive" title="Pairing failed">
        The device stopped responding halfway through. Move it closer and try again.
      </Alert>
    </div>
  )
}
