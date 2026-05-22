import React from 'react';
import '../../styles/svg-icon.css';

export type SvgIconTheme = 'light' | 'dark' | 'accent' | 'error';
export type SvgIconSize = 'sm' | 'md' | 'lg';

export interface SvgIconProps {
  bgFill?: string;
  iconPath?: string | React.ReactNode;
  iconFill?: string;
  size?: SvgIconSize;
  theme?: SvgIconTheme;
  label?: string;
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
  dataName?: string;
  children?: React.ReactNode;
}

const themeBgTokens: Record<SvgIconTheme, string> = {
  dark: 'var(--widget-dark-bg, #1A1D1C)',
  light: 'var(--widget-card-bg, #FCFAFE)',
  accent: 'var(--widget-primary, #D71921)',
  error: 'var(--widget-error, #D71921)',
};

const themeIconTokens: Record<SvgIconTheme, string> = {
  dark: 'var(--widget-white, #FCFAFE)',
  light: 'var(--widget-dark-bg, #1A1D1C)',
  accent: 'var(--widget-white, #FCFAFE)',
  error: 'var(--widget-white, #FCFAFE)',
};

const sizeViewBox: Record<SvgIconSize, string> = {
  sm: '0 0 48 48',
  md: '0 0 68 68',
  lg: '0 0 96 96',
};

const sizeRadius: Record<SvgIconSize, number> = {
  sm: 24,
  md: 34,
  lg: 48,
};

const sizeCenter: Record<SvgIconSize, number> = {
  sm: 24,
  md: 34,
  lg: 48,
};

export default function SvgIcon({
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
}: SvgIconProps) {
  const resolvedBg = bgFill ?? themeBgTokens[theme];
  const resolvedIconFill = iconFill ?? themeIconTokens[theme];

  const iconContent = typeof iconPath === 'string'
    ? <path d={iconPath} fill={resolvedIconFill} />
    : iconPath;

  const labelClass = label ? ' nothing-svg-icon--labeled' : '';

  return (
    <div
      className={`nothing-svg-icon nothing-svg-icon--${size} nothing-svg-icon--${theme}${labelClass}${className ? ` ${className}` : ''}`}
      style={style}
      data-name={dataName}
      role="img"
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <svg
        className="nothing-svg-icon__svg"
        fill="none"
        preserveAspectRatio="none"
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
      {label && (
        <span className="nothing-svg-icon__label">{label}</span>
      )}
    </div>
  );
}
