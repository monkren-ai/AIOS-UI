import React from 'react';
import svgPaths from '../widget-svg-paths';

function LocationOnFill0Wght400Grad0Opsz() {
  return (
    <div className="widget-relative widget-shrink-0 widget-card__svg--24" data-name="location_on_FILL0_wght400_GRAD0_opsz24 1" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="location_on_FILL0_wght400_GRAD0_opsz24 1">
          <path d={svgPaths.p1179fd00} fill="var(--fill-0, var(--widget-dark-bg))" id="Vector" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div className="widget-col-1 content-stretch flex flex-col gap-[6px] items-center ml-[49px] mt-[47px] widget-relative widget-row-1 w-[55px]" aria-hidden="true">
      <LocationOnFill0Wght400Grad0Opsz />
      <div className=" widget-text widget-text--14 widget-text--dark widget-text--center widget-text--nowrap widget-opacity-70" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="widget-leading-normal mb-0">Location</p>
        <p className="widget-leading-normal">access</p>
      </div>
    </div>
  );
}

export function LocationAccess1({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
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
          <circle cx="76" cy="76" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 188" r="76" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
        </svg>
      </div>
      <Frame43 />
    </div>
  );
}
