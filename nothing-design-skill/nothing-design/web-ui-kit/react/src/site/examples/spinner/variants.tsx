import { Spinner } from 'aios-ui-kit/spinner'

const items = ['SHIP', 'WAIT', 'ASK', 'DROP']

export default function SpinnerVariants() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <Spinner size="sm" variant="soft" items={items} />
      <Spinner size="sm" variant="outline" items={items} />
      <Spinner size="sm" variant="destructive" items={items} />
    </div>
  )
}
