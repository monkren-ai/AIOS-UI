import React from 'react';
import svgPaths from '../widget-svg-paths';

function Icon23() {
  return (
    <div className="widget-relative widget-shrink-0 widget-card__svg--24" data-name="Icon" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p13550f80} fill="var(--fill-0, var(--widget-white))" id="Vector" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Frame42() {
  return (
    <div className="widget-col-1 content-stretch flex flex-col gap-[6px] items-center ml-[49px] mt-[47px] widget-relative widget-row-1" aria-hidden="true">
      <Icon23 />
      <div className=" widget-text widget-text--14 widget-text--white widget-text--center widget-text--nowrap widget-opacity-70" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="widget-leading-normal mb-0">Location</p>
        <p className="widget-leading-normal">access</p>
      </div>
    </div>
  );
}

export function LocationAccess({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-grid-auto ${className || ''}`.trim()} data-name="Location Access" aria-label={ariaLabel || "Location Access"}>
      <div className="widget-col-1 ml-0 mt-0 widget-relative widget-row-1 size-[152px]" data-name="BG">
        <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 152 152">
          <circle cx="76" cy="76" fill="var(--fill-0, var(--widget-primary))" id="BG" r="76" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
        </svg>
      </div>
      <Frame42 />
    </div>
  );
}
