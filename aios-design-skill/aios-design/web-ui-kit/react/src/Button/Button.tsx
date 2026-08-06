import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn, dataAttr } from '@/lib/utils'
import {
  buttonVariants,
  resolveButtonSize,
  resolveButtonVariant,
  type ButtonSize,
  type ButtonVariant,
} from './button-variants'

export interface ButtonProps extends Omit<React.ComponentPropsWithRef<'button'>, 'color'> {
  /** 视觉样式。 */
  variant?: ButtonVariant
  /** 高度与内边距。`icon-*` 为正方形，用于纯图标按钮。 */
  size?: ButtonSize
  /** 撑满父容器宽度。 */
  fullWidth?: boolean
  /** 展示 spinner 并阻止点击。 */
  loading?: boolean
  /** loading 期间替换的文案；不传则保留 children。 */
  loadingText?: string
  /** 按下态（如工具栏的 toggle 按钮），会映射到 `aria-pressed`。 */
  active?: boolean
  /** 换成别的元素或与其它组件组合。渲染链接时请改用 `buttonVariants`。 */
  render?: BaseButton.Props['render']
  /** 渲染出来的是不是原生 `<button>`。`render` 一个非按钮元素时设为 false。 */
  nativeButton?: boolean
  /** disabled 后仍保留焦点，避免焦点掉回 body。 */
  focusableWhenDisabled?: boolean
  /**
   * @deprecated 改用 `data-icon="start"` 标注 children 里的图标。
   */
  leadingIcon?: React.ReactNode
  /**
   * @deprecated 改用 `data-icon="end"` 标注 children 里的图标。
   */
  trailingIcon?: React.ReactNode
}

function ButtonSpinner() {
  return (
    <svg
      viewBox="0 0 16 16"
      data-icon="start"
      aria-hidden="true"
      className="animate-spin motion-reduce:[animation-duration:3s]"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="28 10"
      />
    </svg>
  )
}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  loading = false,
  loadingText,
  leadingIcon,
  trailingIcon,
  active,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const resolvedVariant = resolveButtonVariant(variant) as never
  const resolvedSize = resolveButtonSize(size) as never

  return (
    <BaseButton
      className={cn(
        buttonVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          fullWidth,
          loading,
        }),
        className,
      )}
      data-slot="button"
      data-variant={dataAttr(resolveButtonVariant(variant) ?? 'primary')}
      data-size={dataAttr(resolveButtonSize(size) ?? 'md')}
      data-loading={dataAttr(loading)}
      data-active={dataAttr(active)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-pressed={active || undefined}
      {...props}
    >
      {loading && <ButtonSpinner />}
      {!loading && leadingIcon && (
        <span
          data-icon="start"
          data-slot="button-icon"
          aria-hidden="true"
          className="inline-flex items-center"
        >
          {leadingIcon}
        </span>
      )}
      {loading && loadingText ? loadingText : children}
      {!loading && trailingIcon && (
        <span
          data-icon="end"
          data-slot="button-icon"
          aria-hidden="true"
          className="inline-flex items-center"
        >
          {trailingIcon}
        </span>
      )}
    </BaseButton>
  )
}

Button.displayName = 'Button'

export default Button
