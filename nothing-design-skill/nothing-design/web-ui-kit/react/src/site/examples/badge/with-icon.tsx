import { Badge } from 'nothing-ui/badge'
import { ArrowUpRightIcon, BookmarkIcon } from '../icons'

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge variant="outline">
        <BookmarkIcon />
        Saved
      </Badge>
      <Badge variant="soft" size="lg">
        Exported
        <ArrowUpRightIcon />
      </Badge>
    </div>
  )
}
