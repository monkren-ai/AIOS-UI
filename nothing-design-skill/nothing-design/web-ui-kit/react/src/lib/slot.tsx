import * as React from 'react'
import { mergeRefs } from './refs'

/**
 * Slot 多态原语。
 *
 * shadcn 风格的 `asChild` 模式实现：当组件设 `asChild=true` 时，
 * 把 className / style / data 属性 / 事件处理 合并到唯一子元素上。
 *
 * 为什么不直接用 @radix-ui/react-slot？避免引入大型依赖。
 * 此实现约 50 行，覆盖 99 ％ 使用场景。
 *
 * @example
 * ```tsx
 * <Button asChild>
 *   <a href="/home">Go Home</a>
 * </Button>
 * // 渲染: <a className="nothing-btn nothing-btn--primary" href="/home">Go Home</a>
 * ```
 */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    if (!React.isValidElement(children)) {
      // 降级：单子节点不是 element 时使用 span
      return (
        <span {...slotProps} ref={forwardedRef}>
          {children}
        </span>
      )
    }

    const childProps = children.props as Record<string, unknown>
    const mergedProps: Record<string, unknown> = { ...slotProps, ...childProps }

    // 合并 className
    const slotClass = slotProps.className
    const childClass = childProps.className
    if (slotClass || childClass) {
      mergedProps.className = [slotClass, childClass].filter(Boolean).join(' ')
    }

    // 合并 style
    const slotStyle = slotProps.style as React.CSSProperties | undefined
    const childStyle = childProps.style as React.CSSProperties | undefined
    if (slotStyle || childStyle) {
      mergedProps.style = { ...slotStyle, ...childStyle }
    }

    // 合并 ref（子元素的 ref 通过 props.ref 访问）
    const childRef = (childProps as { ref?: React.Ref<HTMLElement> }).ref
    if (forwardedRef || childRef) {
      mergedProps.ref = forwardedRef ? mergeRefs(forwardedRef, childRef) : childRef
    }

    return React.cloneElement(children, mergedProps)
  },
)
Slot.displayName = 'Slot'
