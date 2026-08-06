import { Spinner } from 'aios-ui-kit/spinner'

export default function SpinnerItems() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <Spinner size="sm" items={['YES', 'NO']} />
      <Spinner size="sm" items={['MON', 'TUE', 'WED', 'THU', 'FRI']} />
    </div>
  )
}
