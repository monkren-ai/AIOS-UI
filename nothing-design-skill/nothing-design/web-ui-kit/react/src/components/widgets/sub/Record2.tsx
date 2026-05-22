import React from 'react';

export function Record2({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-grid-auto ${className || ''}`.trim()} data-name="Record" aria-label={ariaLabel || "Record"}>
      <div className="widget-col-1 ml-0 mt-0 widget-relative widget-row-1 size-[152px]" data-name="BG">
        <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 152 152">
          <circle cx="76" cy="76" fill="var(--fill-0, var(--widget-primary))" id="BG" r="76" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
        </svg>
      </div>
      <p className=" widget-col-1 ml-[63px] mt-[68px] widget-opacity-70 widget-relative widget-row-1 widget-text widget-text--14 widget-text--white widget-text--center widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        REC
      </p>
    </div>
  );
}
