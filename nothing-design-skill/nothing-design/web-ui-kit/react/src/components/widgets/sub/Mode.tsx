import React from 'react';
import svgPaths from '../widget-svg-paths';

export function Group30({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`absolute h-[24px] left-[1.4px] top-[4px] w-[29.192px] ${className || ''}`.trim()} aria-label={ariaLabel || "Group30"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 29.1922 24">
        <g id="Group 20">
          <path d={svgPaths.p205ee00} id="Ellipse 228" stroke="var(--fill-0, var(--widget-white))" strokeWidth="3" style={{ stroke: "var(--widget-white)", strokeOpacity: "1" }} />
          <circle cx="14.5961" cy="14.0644" fill="var(--fill-0, var(--widget-white))" id="Ellipse 229" r="2.99935" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

export function Icon33({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-overflow-clip widget-relative widget-shrink-0 size-[32px] ${className || ''}`.trim()} data-name="Icon" aria-label={ariaLabel || "Icon"}>
      <Group30 />
    </div>
  );
}

export function Mode({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim()} data-name="Mode" aria-label={ariaLabel || "Mode"}>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center justify-center p-[16px] widget-relative size-full">
          <p className=" widget-text widget-text--16 widget-text--grey widget-text--center widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            BALANCED
          </p>
          <Icon33 />
        </div>
      </div>
    </div>
  );
}
