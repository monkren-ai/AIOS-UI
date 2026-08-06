import { useState } from 'react'
import { Pagination } from 'aios-ui-kit/pagination'

export default function PaginationBasic() {
  const [page, setPage] = useState(1)

  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination page={page} totalPages={8} onPageChange={setPage} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        Page {page} of 8
      </p>
    </div>
  )
}
