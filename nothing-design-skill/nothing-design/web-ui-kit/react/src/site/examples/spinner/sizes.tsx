import { Spinner } from 'nothing-ui/spinner'

const items = ['A', 'B', 'C', 'D', 'E', 'F']

export default function SpinnerSizes() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <Spinner size="sm" items={items} />
      <Spinner size="md" items={items} />
    </div>
  )
}
