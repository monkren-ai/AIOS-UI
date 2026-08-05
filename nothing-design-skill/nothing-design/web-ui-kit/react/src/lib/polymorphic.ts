import type { ElementType, ReactElement, ReactNode } from 'react'

/**
 * 多态组件类型工具。
 *
 * shadcn 风格的 polymorphic 模式：让组件支持 `as` 和 `asChild` 两种变体。
 *
 * - `asChild=true`：把样式/属性合并到唯一子元素上
 * - `as="a"`：把组件渲染为指定元素
 *
 * @example
 * ```tsx
 * type ButtonProps = PolymorphicProps<'button', { variant?: 'primary' }>
 *
 * <Button>click</Button>                            // <button class="...">click</button>
 * <Button asChild><a href="/">link</a></Button>     // <a class="..." href="/">link</a>
 * <Button as="a" href="/">link</Button>            // <a class="..." href="/">link</a>
 * ```
 */

export type AsChildProps = {
  asChild?: boolean
}

export type AsProp<E extends ElementType> = {
  as?: E
}

/**
 * 多态 props 联合类型：asChild 或 as 二选一（asChild 优先）。
 */
export type PolymorphicProps<E extends ElementType, P = Record<string, unknown>> = AsProp<E> &
  AsChildProps &
  P & {
    children?: ReactNode
  }

/**
 * 验证 children 是单个 ReactElement（用于 asChild）。
 * 多子节点时调用方应自行处理（Slot 会降级到 span）。
 */
export function isSingleReactElement(children: ReactNode): children is ReactElement {
  if (children == null || typeof children === 'boolean') return false
  if (Array.isArray(children)) {
    return children.length === 1 && isSingleReactElement(children[0])
  }
  return true
}
