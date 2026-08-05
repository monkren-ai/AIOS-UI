import * as React from 'react'
import svgPaths from './widget-svg-paths'
import SvgIcon, { type SvgIconTheme, type SvgIconSize, type SvgIconVariant } from './SvgIcon'
import { widgetIconSvg } from './icon-svg-registry'

interface WidgetIconProps {
  theme?: SvgIconTheme
  size?: SvgIconSize
  variant?: SvgIconVariant
  className?: string
  'aria-label'?: string
  style?: React.CSSProperties
}

/** Resolve dot-matrix SVG markup from the registry when variant='dot'. */
function dotMarkup(name: keyof typeof widgetIconSvg, variant?: SvgIconVariant): string | undefined {
  return variant === 'dot' ? widgetIconSvg[name] : undefined
}

/* ──────────────────────────────────────────────
   Simple icons: dark bg + white icon
   ────────────────────────────────────────────── */

export function Home({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('home', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p2f639780}
      dataName="Home"
    />
  )
}

export function Location({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('location', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p3dac5000}
      dataName="Location"
    />
  )
}

export function Remote({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('remote', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p20de0900}
      dataName="Remote"
    />
  )
}

export function Share({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('share', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p362aab00}
      dataName="Share"
    />
  )
}

export function Shield({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('shield', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p325eb300}
      dataName="Shield"
    />
  )
}

export function Aeroplane({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('aeroplane', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p687b0f0}
      dataName="Aeroplane"
    />
  )
}

export function Chart({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('chart', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p1832e580}
      dataName="Chart"
    />
  )
}

export function MicOff({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('micOff', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p6242870}
      dataName="Mic Off"
    />
  )
}

export function Dots({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('dots', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="Dots"
    >
      <g id="Dots_2">
        <circle cx="28.6665" cy="25.3333" fill={iconFill} r="1.33333" />
        <circle cx="31.3333" cy="25.3333" fill={iconFill} r="1.33333" />
        <circle cx="34.0001" cy="25.3333" fill={iconFill} r="1.33333" />
        <circle cx="36.6665" cy="25.3333" fill={iconFill} r="1.33333" />
        <circle cx="39.3333" cy="25.3333" fill={iconFill} r="1.33333" />
        <circle cx="31.3333" cy="34.2221" fill={iconFill} r="1.33333" />
        <circle cx="34.0001" cy="34.2221" fill={iconFill} r="1.33333" />
        <circle cx="36.6665" cy="34.2221" fill={iconFill} r="1.33333" />
        <circle cx="26.0001" cy="27.9996" fill={iconFill} r="1.33333" />
        <circle cx="28.6665" cy="27.9996" fill={iconFill} r="1.33333" />
        <circle cx="31.3333" cy="27.9996" fill={iconFill} r="1.33333" />
        <circle cx="34.0001" cy="27.9996" fill={iconFill} r="1.33333" />
        <circle cx="36.6665" cy="27.9996" fill={iconFill} r="1.33333" />
        <circle cx="39.3333" cy="27.9996" fill={iconFill} r="1.33333" />
        <circle cx="42.0001" cy="27.9996" fill={iconFill} r="1.33333" />
        <circle cx="28.6665" cy="36.8884" fill={iconFill} r="1.33333" />
        <circle cx="31.3333" cy="36.8884" fill={iconFill} r="1.33333" />
        <circle cx="34.0001" cy="36.8884" fill={iconFill} r="1.33333" />
        <circle cx="34.0001" cy="43.1108" fill={iconFill} r="1.33333" />
        <circle cx="36.6665" cy="36.8884" fill={iconFill} r="1.33333" />
        <circle cx="39.3333" cy="36.8884" fill={iconFill} r="1.33333" />
        <circle cx="23.3333" cy="30.6665" fill={iconFill} r="1.33333" />
        <circle cx="42.0001" cy="30.6665" fill={iconFill} r="1.33333" />
        <circle cx="26.0001" cy="30.6665" fill={iconFill} r="1.33333" />
        <circle cx="44.6665" cy="30.6665" fill={iconFill} r="1.33333" />
      </g>
    </SvgIcon>
  )
}

export function BatteryPlus({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('batteryPlus', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="Battery Plus"
    >
      <path d={svgPaths.pf1d8400} fill={iconFill} />
    </SvgIcon>
  )
}

/* ──────────────────────────────────────────────
   Simple icons: light bg + dark icon
   ────────────────────────────────────────────── */

export function DarkMode({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('darkMode', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p3ff6ad40}
      dataName="Dark Mode"
    />
  )
}

export function Subtitle({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('subtitle', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p367a9ef0}
      dataName="Subtitle"
    />
  )
}

export function Wallet({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('wallet', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p10ce0080}
      dataName="wallet"
    />
  )
}

export function DownArrow({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('downArrow', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p346526f2}
      dataName="Down Arrow"
    />
  )
}

export function Storage({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('storage', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p37508c00}
      dataName="Storage"
    />
  )
}

export function Record({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('record', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p28e78780}
      dataName="Record"
    />
  )
}

export function Video({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('video', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p99ce600}
      dataName="Video"
    />
  )
}

export function Filter({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('filter', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p3358de80}
      dataName="Filter"
    />
  )
}

/* ──────────────────────────────────────────────
   Icons with clipPath (light bg + dark icon)
   ────────────────────────────────────────────── */

export function NoSignal({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('noSignal', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="No Signal"
    >
      <g clipPath="url(#clip0_1_2502)">
        <path d={svgPaths.p1ff37100} fill={iconFill} />
      </g>
      <defs>
        <clipPath id="clip0_1_2502">
          <rect fill="white" height="24" transform="translate(23 22)" width="22.6667" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}

export function FullNetwork({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('fullNetwork', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="Full Network"
    >
      <g clipPath="url(#clip0_1_2492)">
        <path d={svgPaths.p1229a080} fill={iconFill} />
      </g>
      <defs>
        <clipPath id="clip0_1_2492">
          <rect fill="white" height="24" transform="translate(22 22)" width="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}

export function NoSim({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('noSim', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="No Sim"
    >
      <g clipPath="url(#clip0_1_2360)">
        <path d={svgPaths.p38a80e80} fill={iconFill} />
      </g>
      <defs>
        <clipPath id="clip0_1_2360">
          <rect fill="white" height="24" transform="translate(22 22)" width="24" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}

/* ──────────────────────────────────────────────
   Accent / error themed icons
   ────────────────────────────────────────────── */

export function DoNotDisturb({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill = 'var(--widget-white, #FCFAFE)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('doNotDisturb', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="Do not Disturb"
    >
      <path d={svgPaths.p399f00} fill={iconFill} />
    </SvgIcon>
  )
}

export function NoConnection({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('noConnection', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="No Connection"
    />
  )
}

export function Temp({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('temp', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="Temp"
    />
  )
}

export function AccessCamera({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill = 'var(--widget-white, #FCFAFE)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('accessCamera', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="Access Camera"
    >
      <path d={svgPaths.p113bc980} fill={iconFill} />
    </SvgIcon>
  )
}

/* ──────────────────────────────────────────────
   Complex icons with inner SVGs
   ────────────────────────────────────────────── */

export function QrCode({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('qrCode', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="QR Code"
    >
      <g id="Icon">
        <path d={svgPaths.p1aaafdc0} fill={iconFill} />
      </g>
    </SvgIcon>
  )
}

export function Glyphs({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('glyphs', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="Glyphs"
    >
      <g id="Group 24">
        <path d={svgPaths.p29036d00} fill={iconFill} />
        <g id="Frame 75">
          <circle cx="1.5" cy="1.5" fill={iconFill} r="1.5" />
          <circle cx="13.5" cy="1.5" fill={iconFill} r="1.5" />
        </g>
        <circle cx="7.5" cy="19.5" fill={iconFill} r="1.5" />
      </g>
    </SvgIcon>
  )
}

export function AutoRotate({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('autoRotate', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="Auto Rotate"
    >
      <path d={svgPaths.p7b40400} fill={iconFill} />
    </SvgIcon>
  )
}

export function Info({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('info', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="Info"
    />
  )
}

export function Watch({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('watch', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="Watch"
    >
      <g id="Watch Hands">
        <rect
          fill={iconFill}
          height="24"
          rx="4"
          transform="rotate(-60 15.2106 27.2254)"
          width="8"
          x="15.2106"
          y="27.2254"
        />
        <rect
          fill="var(--widget-grey, #AEABB1)"
          height="28"
          rx="1"
          transform="rotate(60 56.5391 18.8007)"
          width="2"
          x="56.5391"
          y="18.8007"
        />
        <circle cx="18.9999" cy="59.7108" fill="var(--widget-primary, #D71921)" r="2" />
      </g>
    </SvgIcon>
  )
}

export function Scan({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('scan', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="Scan"
    >
      <g id="Icon">
        <path d={svgPaths.p90a7c00} fill={iconFill} />
        <path clipRule="evenodd" d={svgPaths.p2aa04480} fill={iconFill} fillRule="evenodd" />
      </g>
    </SvgIcon>
  )
}

export function Cast({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('cast', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p1f6d8d00}
      dataName="Cast"
    />
  )
}

/* ──────────────────────────────────────────────
   Renamed "1" variants → semantic names
   These are the NEW preferred names.
   ────────────────────────────────────────────── */

/** Home1 → HomeLight (dark bg variant of Home) */
export function HomeLight({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('homeLight', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p2f639780}
      dataName="Home"
    />
  )
}

/** DarkMode1 → DarkModeLight (dark bg variant of DarkMode) */
export function DarkModeLight({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('darkModeLight', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p3ff6ad40}
      dataName="Dark Mode"
    />
  )
}

/** DoNotDisturb1 → DoNotDisturbLight (accent bg variant) */
export function DoNotDisturbLight({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill = 'var(--widget-white, #FCFAFE)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('doNotDisturbLight', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="Do not Disturb"
    >
      <path d={svgPaths.p399f00} fill={iconFill} />
    </SvgIcon>
  )
}

/** QrCode1 → QrCodeLight (dark bg variant of QrCode) */
export function QrCodeLight({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('qrCodeLight', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      dataName="QR Code"
    >
      <g id="Icon">
        <path d={svgPaths.p1aaafdc0} fill={iconFill} />
      </g>
    </SvgIcon>
  )
}

/** Subtitle1 → SubtitleLight (dark bg variant of Subtitle) */
export function SubtitleLight({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('subtitleLight', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p11360480}
      dataName="Subtitle"
    />
  )
}

/** Record1 → RecordAlt (dark bg variant of Record) */
export function RecordAlt({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('recordAlt', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p2a214d00}
      dataName="Record"
    />
  )
}

/** Cast1 → CastAlt (dark bg variant of Cast) */
export function CastAlt({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  const iconFill =
    theme === 'dark' ? 'var(--widget-white, #FCFAFE)' : 'var(--widget-dark-bg, #1A1D1C)'
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('castAlt', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconFill={iconFill}
      dataName="Cast"
    >
      <path d={svgPaths.p1f6d8d00} fill={iconFill} />
    </SvgIcon>
  )
}

/** ArrowDown → ArrowDownAlt (dark bg variant) */
export function ArrowDownAlt({
  theme = 'dark',
  size = 'md',
  variant,
  className,
  'aria-label': ariaLabel,
  style,
}: WidgetIconProps) {
  return (
    <SvgIcon
      theme={theme}
      size={size}
      variant={variant}
      svgMarkup={dotMarkup('arrowDownAlt', variant)}
      className={className}
      aria-label={ariaLabel}
      style={style}
      iconPath={svgPaths.p14c47600}
      dataName="Arrow Down"
    />
  )
}

/* ──────────────────────────────────────────────
   WidgetIconList — same order as original
   ────────────────────────────────────────────── */

export const WidgetIconList = [
  Home,
  DarkMode,
  Remote,
  Subtitle,
  Wallet,
  Location,
  DarkModeLight,
  NoSignal,
  DownArrow,
  DoNotDisturb,
  QrCode,
  Storage,
  Share,
  NoConnection,
  Record,
  FullNetwork,
  Shield,
  Glyphs,
  Aeroplane,
  Chart,
  Video,
  Temp,
  AutoRotate,
  Info,
  MicOff,
  NoSim,
  Watch,
  RecordAlt,
  AccessCamera,
  Dots,
  Filter,
  HomeLight,
  Cast,
  DoNotDisturbLight,
  ArrowDownAlt,
  QrCodeLight,
  SubtitleLight,
  Scan,
  CastAlt,
  BatteryPlus,
]
