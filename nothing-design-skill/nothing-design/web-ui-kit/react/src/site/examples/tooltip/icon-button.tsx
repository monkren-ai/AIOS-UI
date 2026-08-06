import { Button } from 'aios-ui-kit/button'
import { Tooltip } from 'aios-ui-kit/tooltip'
import { BookmarkIcon, DownloadIcon, SearchIcon } from '../icons'

export default function TooltipIconButton() {
  return (
    <div className="flex items-center gap-1">
      <Tooltip content="Search">
        <Button variant="ghost" size="icon-md" aria-label="Search">
          <SearchIcon className="size-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Save for later">
        <Button variant="ghost" size="icon-md" aria-label="Save for later">
          <BookmarkIcon className="size-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Download">
        <Button variant="ghost" size="icon-md" aria-label="Download">
          <DownloadIcon className="size-4" />
        </Button>
      </Tooltip>
    </div>
  )
}
