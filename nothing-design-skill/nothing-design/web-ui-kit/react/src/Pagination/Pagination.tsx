import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  paginationArrowVariants,
  paginationButtonVariants,
  paginationEllipsisVariants,
  paginationItemVariants,
  paginationListVariants,
  paginationVariants,
} from './pagination-variants'

export type PaginationProps = React.ComponentPropsWithRef<'nav'> & {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

const usePagination = (
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | 'ellipsis')[] => {
  const totalPageNumbers = siblingCount * 2 + 5
  if (totalPages <= totalPageNumbers) return range(1, totalPages)
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

export function Pagination({
  className,
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  ...props
}: PaginationProps) {
  const pages = usePagination(page, totalPages, siblingCount)

  const handlePageChange = React.useCallback(
    (p: number) => {
      if (p < 1 || p > totalPages || p === page) return
      onPageChange(p)
    },
    [page, totalPages, onPageChange],
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      e.preventDefault()
      // RTL 下方向键的语义也要跟着翻转：靠近书写起点的那一侧才是「上一页」
      const isRtl = getComputedStyle(e.currentTarget).direction === 'rtl'
      const forwardKey = isRtl ? 'ArrowLeft' : 'ArrowRight'
      handlePageChange(e.key === forwardKey ? page + 1 : page - 1)
    },
    [page, handlePageChange],
  )

  if (totalPages <= 1) return null

  const isFirst = page <= 1
  const isLast = page >= totalPages

  return (
    <nav
      className={cn(paginationVariants(), className)}
      data-slot="pagination"
      aria-label="Pagination"
      onKeyDown={handleKeyDown}
      data-page={page}
      data-total={totalPages}
      {...props}
    >
      <ul className={paginationListVariants()} data-slot="pagination-list">
        <li className={paginationItemVariants()} data-slot="pagination-item">
          <button
            className={paginationButtonVariants({ disabled: isFirst })}
            data-slot="pagination-button"
            data-direction="previous"
            data-disabled={dataAttr(isFirst)}
            onClick={() => handlePageChange(page - 1)}
            disabled={isFirst}
            aria-label="Previous page"
            type="button"
          >
            <span className={paginationArrowVariants()} aria-hidden="true">
              ‹
            </span>
          </button>
        </li>
        {pages.map((p, index) => {
          if (p === 'ellipsis') {
            return (
              <li
                key={`ellipsis-${index}`}
                className={paginationItemVariants()}
                data-slot="pagination-item"
              >
                <span className={paginationEllipsisVariants()} data-slot="pagination-ellipsis">
                  …
                </span>
              </li>
            )
          }
          const isActive = p === page
          return (
            <li key={p} className={paginationItemVariants()} data-slot="pagination-item">
              <button
                className={paginationButtonVariants({ active: isActive })}
                data-slot="pagination-button"
                data-active={dataAttr(isActive)}
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
        <li className={paginationItemVariants()} data-slot="pagination-item">
          <button
            className={paginationButtonVariants({ disabled: isLast })}
            data-slot="pagination-button"
            data-direction="next"
            data-disabled={dataAttr(isLast)}
            onClick={() => handlePageChange(page + 1)}
            disabled={isLast}
            aria-label="Next page"
            type="button"
          >
            <span className={paginationArrowVariants()} aria-hidden="true">
              ›
            </span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.displayName = 'Pagination'

export {
  paginationVariants,
  paginationListVariants,
  paginationItemVariants,
  paginationButtonVariants,
  paginationEllipsisVariants,
  paginationArrowVariants,
}
export default Pagination
