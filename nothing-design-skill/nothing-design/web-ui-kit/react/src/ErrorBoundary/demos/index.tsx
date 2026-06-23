import { useState } from 'react'
import ErrorBoundary from '../ErrorBoundary'

function Crashable() {
  const [crash, setCrash] = useState(false)
  if (crash) throw new Error('Something went wrong!')
  return (
    <button className="nothing-btn nothing-btn--destructive" onClick={() => setCrash(true)}>
      Throw Error
    </button>
  )
}

export default function Demo() {
  return (
    <ErrorBoundary>
      <div style={{ padding: 24 }}>
        <Crashable />
      </div>
    </ErrorBoundary>
  )
}
