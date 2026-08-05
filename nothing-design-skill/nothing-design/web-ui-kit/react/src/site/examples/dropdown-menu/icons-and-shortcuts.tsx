import { DropdownMenu } from 'nothing-ui/dropdown-menu'
import { BookmarkIcon, DownloadIcon, SearchIcon } from '../icons'

export default function DropdownMenuIconsAndShortcuts() {
  return (
    <DropdownMenu
      trigger="File ▾"
      items={[
        {
          label: 'Find',
          icon: <SearchIcon className="size-4" />,
          shortcut: '⌘F',
          onClick: () => console.log('find'),
        },
        {
          label: 'Bookmark',
          icon: <BookmarkIcon className="size-4" />,
          shortcut: '⌘D',
          onClick: () => console.log('bookmark'),
        },
        {
          label: 'Download',
          icon: <DownloadIcon className="size-4" />,
          shortcut: '⌘S',
          onClick: () => console.log('download'),
        },
      ]}
    />
  )
}
