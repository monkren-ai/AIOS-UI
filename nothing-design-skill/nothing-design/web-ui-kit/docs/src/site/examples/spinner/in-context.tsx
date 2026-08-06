import { Card } from 'aios-ui-kit/card'
import { Spinner } from 'aios-ui-kit/spinner'

export default function SpinnerInContext() {
  return (
    <Card variant="outline" title="Standup order" className="w-full max-w-xs">
      <div className="flex justify-center">
        <Spinner size="sm" variant="outline" items={['ADA', 'GRACE', 'ALAN', 'KATHERINE']} />
      </div>
    </Card>
  )
}
