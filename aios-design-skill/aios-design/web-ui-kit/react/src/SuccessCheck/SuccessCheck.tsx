import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  successCheckLabelVariants,
  successCheckMarkVariants,
  successCheckVariants,
  type SuccessCheckSize,
} from './success-check-variants'

export interface SuccessCheckProps extends Omit<React.ComponentPropsWithRef<'span'>, 'children'> {
  /** 为 true 时描边画出勾选。 */
  active?: boolean
  size?: SuccessCheckSize
  /** 勾选旁的状态文案。默认 `[DONE]`。传 `null` 隐藏。 */
  label?: string | null
}

export function SuccessCheck({
  active = false,
  size = 'md',
  label = '[DONE]',
  className,
  ref,
  ...props
}: SuccessCheckProps) {
  return (
    <span
      ref={ref}
      className={cn(successCheckVariants({ size, active }), className)}
      data-slot="success-check"
      data-size={dataAttr(size)}
      data-state={active ? 'active' : 'idle'}
      role={label ? 'img' : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      <svg
        className={successCheckMarkVariants({ size, active })}
        data-slot="success-check-mark"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6.5 12.5l3.5 3.5 7.5-8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label != null && (
        <span className={successCheckLabelVariants({ size })} data-slot="success-check-label">
          {label}
        </span>
      )}
    </span>
  )
}

SuccessCheck.displayName = 'SuccessCheck'

export { successCheckVariants, successCheckMarkVariants, type SuccessCheckSize }
export default SuccessCheck
