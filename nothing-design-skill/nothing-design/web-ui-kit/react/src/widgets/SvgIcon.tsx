import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import '@/styles/svg-icon.css'

export type SvgIconTheme = 'light' | 'dark' | 'accent' | 'error'
export type SvgIconSize = 'sm' | 'md' | 'lg'

const svgIconVariants = cva('nothing-svg-icon', {
  variants: {
    theme: {
      light: 'nothing-svg-icon--light',
      dark: 'nothing-svg-icon--dark',
      accent: 'nothing-svg-icon--accent',
      error: 'nothing-svg-icon--error',
    },
    size: {
      sm: 'nothing-svg-icon--sm',
      md: 'nothing-svg-icon--md',
      lg: 'nothing-svg-icon--lg',
    },
    labeled: { true: 'nothing-svg-icon--labeled', false: '' },
  },
  defaultVariants: { theme: 'dark', size: 'md', labeled: false },
})

const themeBgTokens: Record<SvgIconTheme, string> = {
  dark: 'var(--widget-dark-bg, #1A1D1C)',
  light: 'var(--widget-card-bg, #FCFAFE)',
  accent: 'var(--widget-primary, #D71921)',
  error: 'var(--widget-error, #D71921)',
}

const themeIconTokens: Record<SvgIconTheme, string> = {
  dark: 'var(--widget-white, #FCFAFE)',
  light: 'var(--widget-dark-bg, #1A1D1C)',
  accent: 'var(--widget-white, #FCFAFE)',
  error: 'var(--widget-white, #FCFAFE)',
}

const sizeViewBox: Record<SvgIconSize, string> = {
  sm: '0 0 48 48',
  md: '0 0 68 68',
  lg: '0 0 96 96',
}

const sizeRadius: Record<SvgIconSize, number> = {
  sm: 24,
  md: 34,
  lg: 48,
}

const sizeCenter: Record<SvgIconSize, number> = {
  sm: 24,
  md: 34,
  lg: 48,
}

export interface SvgIconProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof svgIconVariants>, 'theme' | 'size' | 'labeled'> {
  bgFill?: string
  iconPath?: string | React.ReactNode
  iconFill?: string
  size?: SvgIconSize
  theme?: SvgIconTheme
  label?: string
  'aria-label'?: string
  dataName?: string
  children?: React.ReactNode
}

export const SvgIcon = React.forwardRef<HTMLDivElement, SvgIconProps>(
  (
    {
      bgFill,
      iconPath,
      iconFill,
      size = 'md',
      theme = 'dark',
      label,
      'aria-label': ariaLabel,
      className,
      style,
      dataName,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedBg = bgFill ?? themeBgTokens[theme]
    const resolvedIconFill = iconFill ?? themeIconTokens[theme]

    const iconContent =
      typeof iconPath === 'string' ? (
        <path d={iconPath} fill={resolvedIconFill} />
      ) : (
        iconPath
      )

    return (
      <div
        ref={ref}
        className={cn(
          svgIconVariants({ theme, size, labeled: Boolean(label) }),
          className
        )}
        style={style}
        data-name={dataName}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        role="img"
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        {...props}
      >
        <svg
          className="nothing-svg-icon__svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox={sizeViewBox[size]}
        >
          <circle
            cx={sizeCenter[size]}
            cy={sizeCenter[size]}
            fill={resolvedBg}
            r={sizeRadius[size]}
          />
          {iconContent}
          {children}
        </svg>
        {label && <span className="nothing-svg-icon__label">{label}</span>}
      </div>
    )
  }
)
SvgIcon.displayName = 'SvgIcon'

export { svgIconVariants }
export default SvgIcon
