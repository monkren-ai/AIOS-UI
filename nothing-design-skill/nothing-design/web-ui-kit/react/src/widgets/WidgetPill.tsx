import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  WIDGET_PILL_PRESETS,
  type WidgetPillPresetName,
  renderPillPresetIcon,
} from './WidgetPillPresets'
import '@/styles/widget-pill.css'

type WidgetPillTheme = 'light' | 'dark' | 'accent' | 'error'

const widgetPillVariants = cva('nothing-widget-pill', {
  variants: {
    theme: {
      light: 'nothing-widget-pill--light',
      dark: 'nothing-widget-pill--dark',
      accent: 'nothing-widget-pill--accent',
      error: 'nothing-widget-pill--error',
    },
    pressed: { true: 'nothing-widget-pill--pressed', false: '' },
  },
  defaultVariants: { theme: 'dark', pressed: false },
})

export interface WidgetPillProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    Omit<VariantProps<typeof widgetPillVariants>, 'theme' | 'pressed'> {
  theme?: WidgetPillTheme
  children?: React.ReactNode
  icon?: React.ReactNode
  label?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  pressed?: boolean
  'aria-label'?: string
  /**
   * 使用 WidgetPillPresets 中预定义的 quick-toggle pill。
   * 当同时传入 `icon` / `label` / `theme` 时, 显式 props 优先。
   */
  preset?: WidgetPillPresetName
}

export const WidgetPill = React.forwardRef<HTMLDivElement, WidgetPillProps>(
  (
    {
      className,
      theme: themeProp,
      children,
      icon: iconProp,
      label: labelProp,
      onClick,
      pressed = false,
      'aria-label': ariaLabel,
      style,
      preset,
      ...props
    },
    ref,
  ) => {
    const presetConfig = preset ? WIDGET_PILL_PRESETS[preset] : undefined
    const theme = themeProp ?? presetConfig?.theme ?? 'dark'
    const icon = iconProp ?? (presetConfig ? renderPillPresetIcon(presetConfig) : undefined)
    const label = labelProp ?? presetConfig?.label

    const handleKeyDown = onClick
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick(e as unknown as React.MouseEvent<HTMLDivElement>)
          }
        }
      : undefined

    return (
      <div
        ref={ref}
        className={cn(widgetPillVariants({ theme, pressed }), className)}
        onClick={onClick}
        style={style}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        aria-pressed={onClick ? pressed : undefined}
        data-theme={dataAttr(theme)}
        data-state={dataAttr(pressed ? 'pressed' : 'idle')}
        {...props}
      >
        {(icon || children) && <div className="nothing-widget-pill__icon">{icon || children}</div>}
        {label && <div className="nothing-widget-pill__label">{label}</div>}
      </div>
    )
  },
)
WidgetPill.displayName = 'WidgetPill'

export { widgetPillVariants }
export default WidgetPill
