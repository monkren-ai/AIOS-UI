import { useCallback, useRef } from 'react'
import '../styles/pagination.css'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

const usePagination = (page: number, totalPages: number, siblingCount: number): (number | 'ellipsis')[] => {
  const totalPageNumbers = siblingCount * 2 + 5

  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages)
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1)
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = range(1, leftItemCount)
    return [...leftRange, 'ellipsis', totalPages]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = range(totalPages - rightItemCount + 1, totalPages)
    return [1, 'ellipsis', ...rightRange]
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex)
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages]
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1
}) => {
  const navRef = useRef<HTMLElement>(null)
  const pages = usePagination(page, totalPages, siblingCount)

  const handlePageChange = useCallback((p: number) => {
    if (p < 1 || p > totalPages || p === page) return
    onPageChange(p)
  }, [page, totalPages, onPageChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      handlePageChange(page + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePageChange(page - 1)
    }
  }, [page, handlePageChange])

  if (totalPages <= 1) return null

  return (
    <nav
      ref={navRef}
      className="nothing-pagination"
      aria-label="Pagination"
      onKeyDown={handleKeyDown}
    >
      <ul className="nothing-pagination__list">
        <li className="nothing-pagination__item">
          <button
            className={[
              'nothing-pagination__button',
              page <= 1 ? 'nothing-pagination__button--disabled' : ''
            ].filter(Boolean).join(' ')}
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            type="button"
          >
            ‹
          </button>
        </li>
        {pages.map((p, index) => {
          if (p === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`} className="nothing-pagination__item">
                <span className="nothing-pagination__ellipsis">…</span>
              </li>
            )
          }
          const isActive = p === page
          return (
            <li key={p} className="nothing-pagination__item">
              <button
                className={[
                  'nothing-pagination__button',
                  isActive ? 'nothing-pagination__button--active' : ''
                ].filter(Boolean).join(' ')}
                onClick={() => handlePageChange(p)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${p}`}
                type="button"
              >
                {p}
              </button>
            </li>
          )
        })}
        <li className="nothing-pagination__item">
          <button
            className={[
              'nothing-pagination__button',
              page >= totalPages ? 'nothing-pagination__button--disabled' : ''
            ].filter(Boolean).join(' ')}
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            type="button"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
