import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { iconSwapLayerVariants, iconSwapVariants, type IconSwapSize } from './icon-swap-variants'

export interface IconSwapProps extends React.ComponentPropsWithRef<'span'> {
  /**
   * 当前可见层。数字是 children 下标；布尔值把 `false` 映射到 0、`true` 映射到 1。
   */
  active?: number | boolean
  size?: IconSwapSize
  children: React.ReactNode
}

function resolveActive(active: number | boolean | undefined): number {
  if (typeof active === 'boolean') return active ? 1 : 0
  return active ?? 0
}

export function IconSwap({
  active = 0,
  size = 'md',
  className,
  children,
  ref,
  ...props
}: IconSwapProps) {
  const layers = React.Children.toArray(children)
  const activeIndex = resolveActive(active)

  return (
    <span
      ref={ref}
      className={cn(iconSwapVariants({ size }), className)}
      data-slot="icon-swap"
      data-size={dataAttr(size)}
      data-active={String(activeIndex)}
      {...props}
    >
      {layers.map((layer, index) => {
        const isActive = index === activeIndex
        return (
          <span
            key={index}
            className={iconSwapLayerVariants({ active: isActive })}
            data-slot="icon-swap-layer"
            data-active={dataAttr(isActive)}
            aria-hidden={isActive ? undefined : true}
          >
            {layer}
          </span>
        )
      })}
    </span>
  )
}

IconSwap.displayName = 'IconSwap'

export { iconSwapVariants, iconSwapLayerVariants, type IconSwapSize }
export default IconSwap
