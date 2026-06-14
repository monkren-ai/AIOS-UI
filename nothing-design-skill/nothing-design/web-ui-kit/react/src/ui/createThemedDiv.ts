import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'

/**
 * createThemedDiv — 工厂函数：把 "CVA + forwardRef + cn + data-*" 13 行样板
 * 收敛为单行调用。
 *
 * @example
 *   const IconBox = createThemedDiv({
 *     name: 'IconBox',
 *     baseClass: 'iconbox',
 *     variants: {
 *       theme: { light: 'iconbox--light', dark: 'iconbox--dark' },
 *       size:  { sm: 'iconbox--sm', md: 'iconbox--md' },
 *     },
 *     defaultVariants: { theme: 'dark', size: 'md' },
 *   })
 */
type Variants = Record<string, Record<string, string>>

export interface CreateThemedDivOptions<V extends Variants> {
  /** 组件 displayName 与 data-name。 */
  name: string
  /** 基础 class（始终应用）。 */
  baseClass?: string
  /** CVA 变体表。 */
  variants: V
  /** CVA 默认变体。 */
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
  /** 是否在根元素渲染为自定义标签（默认 'div'）。 */
  as?: keyof React.JSX.IntrinsicElements
}

type PropsFromVariants<V extends Variants> = {
  [K in keyof V]?: keyof V[K]
}

export type ThemedDivProps<V extends Variants> = PropsFromVariants<V> &
  Omit<React.HTMLAttributes<HTMLElement>, keyof PropsFromVariants<V>>

export function createThemedDiv<V extends Variants>(
  opts: CreateThemedDivOptions<V>
) {
  const { name, baseClass, variants, defaultVariants, as: Tag = 'div' } = opts

  const variantFn = cva(baseClass ?? '', {
    variants: variants as Variants,
    defaultVariants: defaultVariants as Record<string, string> | undefined,
  })

  type Props = ThemedDivProps<V> & VariantProps<typeof variantFn>

  const Component = React.forwardRef<HTMLElement, Props>((props, ref) => {
    const { className, ...rest } = props as Props
    const variantValues: Record<string, string | undefined> = {}
    for (const k of Object.keys(variants)) {
      ;(variantValues as Record<string, unknown>)[k] = (rest as Record<string, unknown>)[k]
    }
    const dataEntries = Object.entries(variantValues).filter(
      ([, v]) => v !== undefined
    )

    return React.createElement(
      Tag,
      {
        ref,
        className: cn(variantFn(variantValues as Parameters<typeof variantFn>[0]), className),
        'data-name': name,
        ...Object.fromEntries(dataEntries.map(([k, v]) => [`data-${k}`, dataAttr(v as string)])),
        ...rest,
      }
    )
  })
  Component.displayName = name
  return Component
}
