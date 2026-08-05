import { Card } from 'nothing-ui/card'

export default function CardSizes() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Card size="sm" title="sm">
        16px inline padding, and the corner radius tightens along with it.
      </Card>
      <Card size="md" title="md">
        The default. 24px inline padding, comfortable for body copy.
      </Card>
      <Card size="lg" title="lg" shape="technical">
        32px inline padding, paired here with the technical shape for near-square corners.
      </Card>
    </div>
  )
}
