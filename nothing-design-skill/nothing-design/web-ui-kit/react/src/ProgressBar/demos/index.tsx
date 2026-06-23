import { ProgressBar } from '../ProgressBar'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <ProgressBar value={42} label="Progress" unit="%" />
      <ProgressBar value={80} status="warning" label="Storage" unit="%" />
      <ProgressBar value={0} indeterminate label="Loading" />
    </div>
  )
}
