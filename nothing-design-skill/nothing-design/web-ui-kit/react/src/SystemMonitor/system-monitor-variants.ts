import { cva } from 'class-variance-authority'

/**
 * SystemMonitor 的视觉变体。
 *
 * v1 的 `variant`（compact / detailed）与 `size`（sm / md / lg）只挂了类名、
 * 没有任何对应 CSS，这里保留 API 形状但不产出类名。
 */
export const systemMonitorVariants = cva(
  [
    'flex w-full flex-col',
    'rounded-lg border border-border bg-surface p-8',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        detailed: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

/** 顶部标题。 */
export const monitorTitleVariants = cva([
  'font-mono text-label uppercase tracking-widest text-foreground-muted',
  'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
])

/**
 * 单个指标块。
 *
 * 颜色都落在子元素上（数值与分段），这里只负责块与块之间的节奏。
 */
export const monitorItemVariants = cva(['mb-6 last:mb-0'], {
  variants: {
    type: {
      cpu: '',
      ram: '',
      storage: '',
      network: '',
      battery: '',
    },
    status: {
      none: '',
      warning: '',
      critical: '',
      charging: '',
      low: '',
      connected: '',
      disconnected: '',
    },
  },
  defaultVariants: { type: 'cpu', status: 'none' },
})

/** 指标名。 */
export const monitorItemLabelVariants = cva([
  'font-mono text-sm uppercase tracking-wider text-foreground-muted',
  'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
])

/** 指标读数。超过阈值时变黄 / 变红。 */
export const monitorItemValueVariants = cva(
  [
    'font-display text-base font-semibold tracking-[-0.02em] tabular-nums',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      status: {
        none: 'text-foreground-display',
        warning: 'text-warning',
        critical: 'text-error',
        charging: 'text-foreground-display',
        low: 'text-foreground-display',
        connected: 'text-foreground-display',
        disconnected: 'text-foreground-display',
      },
    },
    defaultVariants: { status: 'none' },
  },
)

/** 「12.5 / 16 GB」这类补充说明。 */
export const monitorItemDetailsVariants = cva([
  'mb-2 font-mono text-caption tabular-nums text-foreground-muted',
  'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
])

/** Connected / Charging 之类的状态标。 */
export const monitorItemStatusVariants = cva(
  ['ms-2 font-mono text-caption uppercase tracking-wider'],
  {
    variants: {
      tone: {
        connected: 'text-success',
        disconnected: 'text-error',
        charging: 'text-success',
        discharging: 'text-foreground-muted',
      },
    },
    defaultVariants: { tone: 'discharging' },
  },
)

/**
 * 进度条的单格。
 *
 * 填充色优先级与 v1 的 CSS 级联一致：critical / warning / low 的告警色
 * 盖过按指标类型分配的常规色。
 */
export const monitorSegmentVariants = cva(
  ['flex-1 transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none'],
  {
    variants: {
      filled: {
        true: 'bg-foreground-display',
        false: 'bg-border',
      },
      type: {
        cpu: '',
        ram: '',
        storage: '',
        network: '',
        battery: '',
      },
      status: {
        none: '',
        warning: '',
        critical: '',
        charging: '',
        low: '',
        connected: '',
        disconnected: '',
      },
    },
    compoundVariants: [
      // 常规色：按指标类型区分
      { filled: true, type: 'cpu', class: 'bg-interactive' },
      { filled: true, type: 'ram', class: 'bg-accent' },
      { filled: true, type: 'storage', class: 'bg-success' },
      { filled: true, type: 'network', class: 'bg-foreground' },
      { filled: true, type: 'battery', class: 'bg-success' },
      // 告警色：盖过常规色
      { filled: true, status: 'low', class: 'bg-warning' },
      { filled: true, status: 'warning', class: 'bg-warning' },
      { filled: true, status: 'critical', class: 'bg-error' },
    ],
    defaultVariants: { filled: false, type: 'cpu', status: 'none' },
  },
)
