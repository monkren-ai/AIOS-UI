import React from 'react';
import svgPaths from '../widget-svg-paths';

export function Date({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card-wrapper ${className || ''}`.trim()} data-name="Date" aria-label={ariaLabel || "Date"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 152 152">
        <g id="Date">
          <rect fill="var(--fill-0, var(--widget-card-bg))" height="152" id="BG" rx="20" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} width="152" />
          <g id="29">
            <path d={svgPaths.p20cd9480} fill="var(--fill-0, var(--widget-dark-bg))" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <path d={svgPaths.p2af22e80} fill="var(--fill-0, var(--widget-dark-bg))" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function Date1({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--rounded widget-card--light ${className || ''}`.trim()} data-name="Date" aria-label={ariaLabel || "Date"}>
      <div className="flex flex-col justify-center size-full">
        <div className=" content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full widget-text widget-text--ndot widget-text--nowrap widget-leading-27">
          <p className="widget-relative widget-shrink-0 widget-text widget-text--16 widget-text--grey2">TUESDAY</p>
          <p className="widget-relative widget-shrink-0 widget-text widget-text--32 widget-text--dark">GMT+1</p>
        </div>
      </div>
    </div>
  );
}
