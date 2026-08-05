import { useState } from 'react'
import { Pagination } from 'nothing-ui/pagination'

const COUNTS = [0, 1, 2] as const

export default function PaginationSiblingCount() {
  const [page, setPage] = useState(12)

  return (
    <div className="flex flex-col items-center gap-4">
      {COUNTS.map((siblingCount) => (
        <div key={siblingCount} className="flex flex-col items-center gap-1">
          <span className="font-mono text-label uppercase tracking-wider text-foreground-muted">
            siblingCount={siblingCount}
          </span>
          <Pagination
            page={page}
            totalPages={40}
            siblingCount={siblingCount}
            onPageChange={setPage}
          />
        </div>
      ))}
    </div>
  )
}
