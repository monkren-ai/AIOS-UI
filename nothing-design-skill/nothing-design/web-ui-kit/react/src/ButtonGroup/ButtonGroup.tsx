import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Button, type ButtonSize } from '@/Button'
import { buttonGroupVariants } from './button-group-variants'

export interface ButtonGroupProps extends React.ComponentPropsWithRef<'div'> {
  /** 排列方向。 */
  orientation?: 'horizontal' | 'vertical'
  /** 透传给每个 Button 子项；子项自带的 size 优先。 */
  size?: ButtonSize
  children: React.ReactNode
  /** 相邻按钮之间插入的分隔节点。 */
  separator?: React.ReactNode
}

/**
 * 按钮组。
 *
 * 不重新实现 Button，只包裹 children。`size` 会透传给 `Button` 子项
 * （子项自带 size 时优先）。相邻按钮共享边框，横竖两种排列。
 */
export function ButtonGroup({
  orientation = 'horizontal',
  size,
  children,
  separator,
  className,
  ref,
  ...props
}: ButtonGroupProps) {
  const items = React.Children.toArray(children).filter(Boolean)

  const rendered: React.ReactNode[] = []
  items.forEach((child, index) => {
    if (index > 0 && separator) {
      rendered.push(
        <React.Fragment key={`button-group-separator-${index}`}>{separator}</React.Fragment>,
      )
    }
    if (React.isValidElement(child) && child.type === Button) {
      // 把 group 的 size 透传给 Button；子项自己的 size 优先
      const typed = child as React.ReactElement<React.ComponentProps<typeof Button>>
      const childProps = typed.props as { size?: ButtonSize }
      rendered.push(React.cloneElement(typed, { size: childProps.size ?? size }))
    } else {
      rendered.push(child)
    }
  })

  return (
    <div
      ref={ref}
      role="group"
      aria-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      data-slot="button-group"
      data-orientation={orientation}
      data-size={dataAttr(size)}
      {...props}
    >
      {rendered}
    </div>
  )
}

ButtonGroup.displayName = 'ButtonGroup'

export { buttonGroupVariants }
export default ButtonGroup
