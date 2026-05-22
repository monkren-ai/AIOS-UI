import React from 'react';
import svgPaths from '../widget-svg-paths';
import imgRectangle13 from '../../../assets/images/fb6b3399e50e8d3dd4c4dc30de4861f4891a87e9.png';

export function DoubleDown({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card-wrapper ${className || ''}`.trim()} data-name="Double Down" aria-label={ariaLabel || "Double Down"}>
      <div className="absolute inset-0 widget-card--rounded size-[152px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none widget-card--rounded size-full" src={imgRectangle13} />
      </div>
      <div className="absolute left-[8px] top-[8px] widget-card__svg--24" data-name="Spotify - Negative">
        <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <path d={svgPaths.p10461b00} fill="var(--fill-0, var(--widget-white))" id="Vector" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </svg>
      </div>
    </div>
  );
}
