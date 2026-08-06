import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

/**
 * 共享 HTML 元素属性基类。
 *
 * 集中定义"标准容器元素"属性类型，让组件 props 复用统一的基类，
 * 避免每个组件重复 omit / extend 同一组 HTML 属性。
 *
 * 用法：
 * ```ts
 * type MyProps = DivProps & { variant?: 'primary' }
 * ```
 */

export type DivProps = HTMLAttributes<HTMLDivElement>
export type SpanProps = HTMLAttributes<HTMLSpanElement>
export type ButtonPropsBase = ButtonHTMLAttributes<HTMLButtonElement>
export type AnchorProps = HTMLAttributes<HTMLAnchorElement>
export type InputPropsBase = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'size'
> & {
  onChange?: (value: string) => void
  value?: string
}
export type TextareaPropsBase = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'value'
> & {
  onChange?: (value: string) => void
  value?: string
}
export type SelectPropsBase = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'onChange' | 'value'
> & {
  onChange?: (value: string) => void
  value?: string
}

/**
 * 通用 children-only 容器 props。
 */
export type ContainerProps = {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}
