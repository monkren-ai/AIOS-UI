import { Toast } from 'aios-ui-kit/toast'

export default function ToastBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Toast severity="success" label="SAVED">
        Preferences updated.
      </Toast>
      <Toast severity="info" label="INFO">
        Sync will run on the next connection.
      </Toast>
    </div>
  )
}
