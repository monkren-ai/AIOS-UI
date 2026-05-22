import React from 'react';
import svgPaths from '../widget-svg-paths';

function Group29() {
  return (
    <div className="widget-col-1 h-[21px] ml-[4px] mt-[2px] widget-relative widget-row-1 w-[15px]" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 15 21">
        <g id="Group 24">
          <path d={svgPaths.p29036d00} fill="var(--fill-0, var(--widget-white))" id="C" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <g id="Frame 75">
            <circle cx="1.5" cy="1.5" fill="var(--fill-0, var(--widget-white))" id="Ellipse 248" r="1.5" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
            <circle cx="13.5" cy="1.5" fill="var(--fill-0, var(--widget-white))" id="Ellipse 247" r="1.5" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          </g>
          <circle cx="7.5" cy="19.5" fill="var(--fill-0, var(--widget-white))" id="Ellipse 249" r="1.5" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Group28() {
  return (
    <div className="widget-grid-auto" aria-hidden="true">
      <div className="widget-col-1 ml-0 mt-0 widget-relative widget-row-1 widget-card__svg--24" />
      <Group29 />
    </div>
  );
}

export function Glyphs1({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--pill widget-card--dark content-stretch flex flex-col gap-[12px] items-center justify-center widget-relative widget-shrink-0 ${className || ''}`.trim()} data-name="Glyphs" aria-label={ariaLabel || "Glyphs"}>
      <Group28 />
      <p className=" widget-relative widget-shrink-0 widget-text widget-text--12 widget-text--grey widget-text--center widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Glyphs
      </p>
    </div>
  );
}
