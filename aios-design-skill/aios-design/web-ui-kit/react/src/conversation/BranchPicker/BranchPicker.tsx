import * as React from 'react'
import { cn } from '@/lib/utils'
import { branchPickerVariants } from './branch-picker-variants'

export interface BranchPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number
  total: number
  onPrevious?: () => void
  onNext?: () => void
  previousLabel?: string
  nextLabel?: string
}
export function BranchPicker({
  current,
  total,
  onPrevious,
  onNext,
  previousLabel = '上一个分支 / Previous branch',
  nextLabel = '下一个分支 / Next branch',
  className,
  ref,
  ...props
}: BranchPickerProps & { ref?: React.Ref<HTMLDivElement> }) {
  const safeTotal = Math.max(1, total)
  const safeCurrent = Math.max(1, Math.min(current, safeTotal))
  return (
    <div
      ref={ref}
      className={cn(branchPickerVariants(), className)}
      data-slot="branch-picker"
      {...props}
    >
      <button
        type="button"
        className="size-11 rounded-button hover:bg-muted disabled:opacity-40"
        disabled={safeCurrent <= 1}
        onClick={onPrevious}
        aria-label={previousLabel}
      >
        ‹
      </button>
      <span aria-live="polite" className="min-w-12 text-center tabular-nums">
        {safeCurrent} / {safeTotal}
      </span>
      <button
        type="button"
        className="size-11 rounded-button hover:bg-muted disabled:opacity-40"
        disabled={safeCurrent >= safeTotal}
        onClick={onNext}
        aria-label={nextLabel}
      >
        ›
      </button>
    </div>
  )
}
