import { Button } from 'nothing-ui/button'
import { ArrowUpRightIcon, BookmarkIcon, DownloadIcon } from '../icons'

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary">
        <DownloadIcon data-icon="start" />
        Download
      </Button>
      <Button variant="outline">
        Open
        <ArrowUpRightIcon data-icon="end" />
      </Button>
      <Button size="icon-md" variant="soft" aria-label="Bookmark">
        <BookmarkIcon />
      </Button>
    </div>
  )
}
