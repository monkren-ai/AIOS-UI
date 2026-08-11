import { cva } from 'class-variance-authority'

/**
 * Toast 的视觉变体。
 *
 * appica 原版是浮窗 portal + 自动消失——AIOS 禁止浮窗 toast，所以这里改造成
 * 文档流内的内联状态条：`role="status"` 横条，左侧 bracket 标记 + 消息文案，
 * 不 portal、不 fixed、不自动消失（由调用方控制挂载）。
 *
 * 配色走语义 severity：error 落到 AIOS 红（`--accent`），success/warning 用对应
 * 状态色，info 回到中性。左侧 3px 粗边是仪表盘状态条的标识。
 */
export const toastVariants = cva(
  [
    'aios-toast',
    'flex w-full items-center gap-3 rounded-md border border-border-visible border-l-[3px]',
    'bg-surface px-4 py-3 font-body text-sm text-foreground',
    'transition-[opacity,transform] duration-300 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      severity: {
        info: 'border-l-border-visible',
        success: 'border-l-success',
        warning: 'border-l-warning',
        error: 'border-l-accent',
      },
    },
    defaultVariants: { severity: 'info' },
  },
)

/** 左侧 `[ LABEL ]` bracket 文案。颜色随 severity。 */
export const toastLabelVariants = cva(
  ['aios-toast__label', 'shrink-0 font-mono text-label uppercase tracking-wider'],
  {
    variants: {
      severity: {
        info: 'text-foreground-muted',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-accent',
      },
    },
    defaultVariants: { severity: 'info' },
  },
)

export type ToastSeverity = 'info' | 'success' | 'error' | 'warning'
