import { Badge } from 'nothing-ui/badge'

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge size="sm">sm</Badge>
      <Badge size="md">md</Badge>
      <Badge size="lg">lg</Badge>
      <Badge size="sm">9</Badge>
      <Badge size="md">42</Badge>
      <Badge size="lg">128</Badge>
    </div>
  )
}
