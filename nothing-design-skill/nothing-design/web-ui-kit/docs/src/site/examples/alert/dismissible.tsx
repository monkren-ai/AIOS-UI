import * as React from 'react'
import { Alert } from 'aios-ui-kit/alert'
import { Button } from 'aios-ui-kit/button'

export default function AlertDismissible() {
  const [visible, setVisible] = React.useState(true)

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      {visible ? (
        <Alert title="Storage almost full" variant="destructive" onClose={() => setVisible(false)}>
          Free up space to keep recordings syncing.
        </Alert>
      ) : (
        <Button variant="outline" onClick={() => setVisible(true)}>
          Show again
        </Button>
      )}
    </div>
  )
}
