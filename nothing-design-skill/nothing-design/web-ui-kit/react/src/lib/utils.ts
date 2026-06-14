import { clsx, type ClassValue } from 'clsx'
import * as React from 'react'

/**
 * 合并 className（替代 [...].filter(Boolean).join(' ')）。
 * Nothing UI 基于 CSS（而非 Tailwind），所以无需 tailwind-merge。
 * 单纯用 clsx 即可处理条件类名、对象语法、数组语法。
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/**
 * 合并多个 refs（用于 forwardRef 场景）。
 * 传入 N 个 ref（函数 ref / 对象 ref / undefined），返回一个 ref 回调。
 */
export function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
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

/**
 * 把任意值规范化为合法的 HTML data-* 属性值。
 * - undefined / null / false → 返回 undefined（React 不会渲染该属性）
 * - true → 返回空字符串（仅作为存在性标记）
 * - 其他 → 返回原始值
 *
 * 用法：<div data-variant={dataAttr(variant)} />
 */
export function dataAttr(
  value: string | number | boolean | undefined | null
): string | number | undefined {
  if (value === undefined || value === null || value === false) {
    return undefined
  }
  if (value === true) return ''
  return value
}
