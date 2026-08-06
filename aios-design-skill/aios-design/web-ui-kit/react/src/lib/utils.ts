import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

import type { SemanticClassNames, SemanticStyles } from './types'

/**
 * tailwind-merge 需要知道 theme.css 里那些自定义刻度，
 * 否则 `text-heading` 之类的具名字号会被误判成文字颜色而不参与去重。
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display-xl',
        'display-lg',
        'display-md',
        'display-sm',
        'heading',
        'subheading',
        'caption',
        'label',
        'micro',
      ],
      radius: [
        'pill',
        'button',
        'button-technical',
        'card',
        'card-compact',
        'card-technical',
        'input',
        'tag',
        'tooltip',
        'segment',
      ],
      spacing: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      font: ['display', 'body', 'sans', 'mono', 'ndot'],
    },
  },
})

/**
 * 合并 className。
 *
 * 走 tailwind-merge，后写的工具类会覆盖前面同组的：
 * `cn('px-4', 'px-6')` → `'px-6'`。未知类名（如遗留的 `aios-btn--primary`）
 * 原样保留，所以 Tailwind 组件与尚未迁移的 BEM 组件可以共存。
 *
 * @example
 * ```tsx
 * <div className={cn('rounded-card px-4', isActive && 'bg-surface-raised', className)} />
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * 合并多层语义化 classNames / styles。
 *
 * 优先级从高到低：用户传入 > 组件默认 > Provider 全局配置。
 * 用于实现 Ant Design X 风格的 `classNames` / `styles` 语义化 API。
 *
 * @example
 * ```tsx
 * const { classNames, styles } = mergeSemanticProps(
 *   providerConfig,
 *   defaultSemantic,
 *   userProps,
 * )
 * ```
 */
export function mergeSemanticProps<T extends string>(
  ...sources: (
    | {
        classNames?: SemanticClassNames<T>
        styles?: SemanticStyles<T>
      }
    | null
    | undefined
  )[]
): { classNames: SemanticClassNames<T>; styles: SemanticStyles<T> } {
  return sources.reduce<{ classNames: SemanticClassNames<T>; styles: SemanticStyles<T> }>(
    (acc, source) => {
      if (!source) return acc

      const { classNames: sourceClassNames, styles: sourceStyles } = source

      if (sourceClassNames) {
        for (const key of Object.keys(sourceClassNames) as T[]) {
          const value = sourceClassNames[key]
          if (value === undefined) continue
          acc.classNames[key] = cn(acc.classNames[key], value)
        }
      }

      if (sourceStyles) {
        for (const key of Object.keys(sourceStyles) as T[]) {
          const value = sourceStyles[key]
          if (value === undefined) continue
          acc.styles[key] = { ...acc.styles[key], ...value }
        }
      }

      return acc
    },
    { classNames: {}, styles: {} },
  )
}

/**
 * 把任意值规范化为合法的 HTML data-* 属性值。
 *
 * - undefined / null / false → 返回 undefined（React 不会渲染该属性）
 * - true → 返回空字符串（仅作为存在性标记）
 * - 其他 → 返回原始值
 *
 * @example
 * ```tsx
 * <div data-variant={dataAttr(variant)} data-disabled={dataAttr(disabled)} />
 * ```
 */
export function dataAttr(
  value: string | number | boolean | undefined | null,
): string | number | undefined {
  if (value === undefined || value === null || value === false) {
    return undefined
  }
  if (value === true) return ''
  return value
}
