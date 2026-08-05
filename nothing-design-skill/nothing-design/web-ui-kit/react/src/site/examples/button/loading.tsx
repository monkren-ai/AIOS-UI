import * as React from 'react'
import { Button } from 'nothing-ui/button'

export default function ButtonLoading() {
  const [loading, setLoading] = React.useState(false)

  return (
    <Button
      loading={loading}
      loadingText="Submitting"
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2500)
      }}
    >
      Submit
    </Button>
  )
}
