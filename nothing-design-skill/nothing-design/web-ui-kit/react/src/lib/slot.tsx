import * as React from 'react'

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
        <span
          {...slotProps}
          ref={forwardedRef}
        >
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

    // 合并 ref
    const childRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref
    if (forwardedRef || childRef) {
      mergedProps.ref = forwardedRef
        ? mergeRefs(forwardedRef, childRef)
        : childRef
    }

    return React.cloneElement(children, mergedProps)
  }
)
Slot.displayName = 'Slot'

/**
 * 合并多个 refs（用于 Slot 内同时处理 forwardedRef 和 child ref）。
 */
function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        ;(ref as React.MutableRefObject<T | null>).current = node
      }
    })
  }
}
