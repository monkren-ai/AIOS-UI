import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn, dataAttr } from '@/lib/utils'
import { chipGroupVariants, chipVariants, type ChipSize } from './chip-variants'

export interface ChipProps extends React.ComponentPropsWithRef<'button'> {
  selected?: boolean
  size?: ChipSize
  icon?: React.ReactNode
}

export function Chip({
  selected = false,
  size = 'md',
  icon,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <BaseButton
      className={cn(chipVariants({ selected, size }), className)}
      aria-pressed={selected}
      data-slot="chip"
      data-selected={dataAttr(selected)}
      data-size={dataAttr(size)}
      {...props}
    >
      {icon && (
        <span data-slot="chip-icon" aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      )}
      {children}
    </BaseButton>
  )
}

export type ChipGroupProps = React.ComponentPropsWithRef<'div'>

export function ChipGroup({ className, ...props }: ChipGroupProps) {
  return (
    <div
      role="group"
      className={cn(chipGroupVariants(), className)}
      data-slot="chip-group"
      {...props}
    />
  )
}

Chip.displayName = 'Chip'
ChipGroup.displayName = 'ChipGroup'
