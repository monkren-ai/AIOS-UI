import * as React from 'react'
import { Button, type ButtonProps } from '@/Button/Button'

export interface CopyButtonProps extends Omit<ButtonProps, 'value' | 'onCopy'> {
  /** 要复制到剪贴板的文本。 */
  value: string
  /** 复制成功后短暂展示的回执文案。 */
  copiedText?: string
  /** 复制失败时展示的文案。 */
  errorText?: string
  /** 复制结果回调，true 表示成功。 */
  onCopy?: (ok: boolean) => void
}

type CopyState = 'idle' | 'copied' | 'error'

/** 不传 children 时的默认剪贴板图标。 */
function CopyIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="8" height="8" rx="1" />
      <path d="M3 11V3h8" />
    </svg>
  )
}

/**
 * 独立复制按钮。
 *
 * 点击后用 `navigator.clipboard.writeText` 复制 `value`，成功后短暂展示
 * `[COPIED]` 回执（默认 1.5 秒）再回退原 children；失败展示 `[ERROR]`。
 * 不弹 toast——回执就长在按钮自己身上。
 */
export function CopyButton({
  value,
  copiedText = '[COPIED]',
  errorText = '[ERROR]',
  onCopy,
  variant = 'secondary',
  size = 'sm',
  children,
  onClick,
  disabled,
  'aria-label': ariaLabelProp,
  ref,
  ...props
}: CopyButtonProps) {
  const [state, setState] = React.useState<CopyState>('idle')
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // 卸载时清掉回执计时器，避免 setState 打到已卸载组件
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const scheduleReset = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setState('idle'), 1500)
  }, [])

  const handleClick = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      // 兜底：Button 自身已会在 disabled 时拦截点击
      if (disabled) return
      try {
        await navigator.clipboard.writeText(value)
        setState('copied')
        onCopy?.(true)
      } catch {
        setState('error')
        onCopy?.(false)
      }
      scheduleReset()
    },
    [value, onCopy, onClick, disabled, scheduleReset],
  )

  const content =
    state === 'copied'
      ? copiedText
      : state === 'error'
        ? errorText
        : (children ?? <CopyIcon />)

  // 中英双语的无障碍名，随状态切换，让读屏软件能播报复制结果
  const stateLabel =
    state === 'copied'
      ? '已复制 Copied'
      : state === 'error'
        ? '复制失败 Copy failed'
        : '复制 Copy'

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled}
      data-slot="copy-button"
      data-state={state}
      aria-label={ariaLabelProp ?? stateLabel}
      {...props}
    >
      {content}
    </Button>
  )
}

CopyButton.displayName = 'CopyButton'

export default CopyButton
