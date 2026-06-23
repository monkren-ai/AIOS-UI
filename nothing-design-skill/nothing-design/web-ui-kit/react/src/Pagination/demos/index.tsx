import { useState } from 'react'
import { Pagination } from '../Pagination'

export default function Demo() {
  const [page, setPage] = useState(5)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Pagination page={page} totalPages={1} onPageChange={setPage} />
      <Pagination page={page} totalPages={10} onPageChange={setPage} />
      <Pagination page={page} totalPages={20} onPageChange={setPage} siblingCount={2} />
    </div>
  )
}
