import { Alert } from 'nothing-ui/alert'
import { DownloadIcon } from '../icons'

export default function AlertWithIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert title="Backup ready" icon={<DownloadIcon className="size-4" />}>
        Your export finished. The download link stays valid for 24 hours.
      </Alert>
      <Alert icon={<DownloadIcon className="size-4" />}>
        Without a title the message sits alone, aligned to the icon.
      </Alert>
    </div>
  )
}
