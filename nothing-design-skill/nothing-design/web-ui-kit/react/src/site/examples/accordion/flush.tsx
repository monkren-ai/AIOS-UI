import { Accordion } from 'nothing-ui/accordion'
import { BookmarkIcon, DownloadIcon, SearchIcon } from '../icons'

const ITEMS = [
  {
    id: 'saved',
    title: 'Saved',
    content: 'Everything you bookmarked, newest first.',
    leadingIcon: <BookmarkIcon className="size-4" />,
  },
  {
    id: 'downloads',
    title: 'Downloads',
    content: 'Firmware images and manuals you pulled down.',
    leadingIcon: <DownloadIcon className="size-4" />,
  },
  {
    id: 'searches',
    title: 'Searches',
    content: 'Recent queries, kept on device.',
    leadingIcon: <SearchIcon className="size-4" />,
    disabled: true,
  },
]

export default function AccordionFlush() {
  return <Accordion className="w-full max-w-md" items={ITEMS} variant="flush" />
}
