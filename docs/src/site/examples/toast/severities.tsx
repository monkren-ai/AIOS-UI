import { Toast } from 'aios-ui-kit/toast'

export default function ToastSeverities() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Toast severity="info" label="INFO">
        Listening for updates.
      </Toast>
      <Toast severity="success" label="SAVED">
        Changes committed.
      </Toast>
      <Toast severity="warning" label="WARN">
        Battery below 10%.
      </Toast>
      <Toast severity="error" label="ERROR">
        Could not reach the network.
      </Toast>
    </div>
  )
}
