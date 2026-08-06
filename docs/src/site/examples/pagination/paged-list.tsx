import { useState } from 'react'
import { Pagination } from 'aios-ui-kit/pagination'

const RELEASES = [
  'Phone (1)',
  'Ear (1)',
  'Ear (stick)',
  'Phone (2)',
  'Ear (2)',
  'Phone (2a)',
  'Ear (a)',
  'CMF Phone 1',
  'Phone (3a)',
  'Ear (open)',
]

const PER_PAGE = 3

export default function PaginationPagedList() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(RELEASES.length / PER_PAGE)
  const visible = RELEASES.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <ul className="m-0 flex w-full list-none flex-col gap-1 p-0">
        {visible.map((release) => (
          <li
            key={release}
            className="border border-border-visible px-3 py-2 font-mono text-sm text-foreground"
          >
            {release}
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
