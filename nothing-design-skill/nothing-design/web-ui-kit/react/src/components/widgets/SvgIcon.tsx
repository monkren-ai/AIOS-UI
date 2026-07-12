import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../../lib/utils'
import DotMatrixIcon from '../DotMatrixIcon'
import '../../styles/svg-icon.css'

export type SvgIconTheme = 'light' | 'dark' | 'accent' | 'error'
export type SvgIconSize = 'sm' | 'md' | 'lg'
export type SvgIconVariant = 'solid' | 'dot'

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

/** Dot-matrix config per size — used when variant="dot".
 *  Total px = cols * dotSize + (cols - 1) * gap, must match CSS container:
 *  sm=48px, md=68px, lg=96px. */
const sizeDotMatrix: Record<SvgIconSize, { dotSize: number; rows: number; cols: number; gap: number }> = {
  sm: { dotSize: 2, rows: 16, cols: 16, gap: 1 }, // 16*2 + 15*1 = 47px ≈ 48px
  md: { dotSize: 3, rows: 17, cols: 17, gap: 1 }, // 17*3 + 16*1 = 67px ≈ 68px
  lg: { dotSize: 3, rows: 24, cols: 24, gap: 1 }, // 24*3 + 23*1 = 95px ≈ 96px
}

/** Dot-matrix color config per theme — used when variant="dot". */
const themeDotMatrix: Record<SvgIconTheme, { baseColor: string; backgroundColor: string }> = {
  dark: { baseColor: 'var(--widget-white, #FCFAFE)', backgroundColor: 'var(--widget-dark-bg, #1A1D1C)' },
  light: { baseColor: 'var(--widget-dark-bg, #1A1D1C)', backgroundColor: 'var(--widget-card-bg, #FCFAFE)' },
  accent: { baseColor: 'var(--widget-white, #FCFAFE)', backgroundColor: 'var(--widget-primary, #D71921)' },
  error: { baseColor: 'var(--widget-white, #FCFAFE)', backgroundColor: 'var(--widget-error, #D71921)' },
}

export interface SvgIconProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof svgIconVariants>, 'theme' | 'size' | 'labeled'> {
  bgFill?: string
  iconPath?: string | React.ReactNode
  iconFill?: string
  size?: SvgIconSize
  theme?: SvgIconTheme
  variant?: SvgIconVariant
  /** Full <svg>...</svg> markup — required when variant="dot". */
  svgMarkup?: string
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
      variant = 'solid',
      svgMarkup,
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

    const isDot = variant === 'dot' && Boolean(svgMarkup)

    const dotConfig = sizeDotMatrix[size]
    const dotTheme = themeDotMatrix[theme]

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
        data-variant={isDot ? 'dot' : 'solid'}
        role="img"
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        {...props}
      >
        {isDot ? (
          <DotMatrixIcon
            svg={svgMarkup!}
            rows={dotConfig.rows}
            cols={dotConfig.cols}
            dotSize={dotConfig.dotSize}
            gap={dotConfig.gap}
            alphaThreshold={128}
            baseColor={dotTheme.baseColor}
            backgroundColor={dotTheme.backgroundColor}
            radius={sizeRadius[size]}
          />
        ) : (
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
        )}
        {label && <span className="nothing-svg-icon__label">{label}</span>}
      </div>
    )
  }
)
SvgIcon.displayName = 'SvgIcon'

export { svgIconVariants }
export default SvgIcon
