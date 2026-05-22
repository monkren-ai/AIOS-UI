import React from 'react';

export function Recording({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--pill widget-card--light content-stretch flex gap-[6px] items-center justify-center widget-relative widget-shrink-0 ${className || ''}`.trim()} data-name="Recording" aria-label={ariaLabel || "Recording"}>
      <div className="widget-relative widget-shrink-0 size-[8px]" data-name="Dot">
        <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, var(--widget-primary))" id="Dot" r="4" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
        </svg>
      </div>
      <p className=" widget-text widget-text--ndot widget-text--12 widget-text--grey2 widget-text--center widget-text--nowrap">00:00:05</p>
    </div>
  );
}
