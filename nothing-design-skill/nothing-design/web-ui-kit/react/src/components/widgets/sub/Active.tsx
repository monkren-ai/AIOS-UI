import React from 'react';
import svgPaths from '../widget-svg-paths';

function Icon27() {
  return (
    <div className="widget-relative widget-shrink-0 widget-card__svg--24" data-name="Icon" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p28fe7100} fill="var(--fill-0, var(--widget-dark-bg))" id="Vector" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

export function Active({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--pill widget-card--light content-stretch flex flex-col gap-[12px] items-center justify-center widget-relative widget-shrink-0 ${className || ''}`.trim()} data-name="Active" aria-label={ariaLabel || "Active"}>
      <Icon27 />
      <p className=" widget-relative widget-shrink-0 widget-text widget-text--12 widget-text--grey2 widget-text--center widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Active
      </p>
    </div>
  );
}
