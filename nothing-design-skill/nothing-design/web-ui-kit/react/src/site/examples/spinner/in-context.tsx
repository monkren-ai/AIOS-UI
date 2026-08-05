import { Card } from 'nothing-ui/card'
import { Spinner } from 'nothing-ui/spinner'

export default function SpinnerInContext() {
  return (
    <Card variant="outline" title="Standup order" className="w-full max-w-xs">
      <div className="flex justify-center">
        <Spinner size="sm" variant="outline" items={['ADA', 'GRACE', 'ALAN', 'KATHERINE']} />
      </div>
    </Card>
  )
}
