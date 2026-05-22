import React from 'react';
import imgRectangle14 from '../../../assets/images/a0a6cb8be18624a2222418a1e4e27381fc343af8.png';

function Frame24() {
  return (
    <div className="h-[48px] widget-relative widget-shrink-0 w-[6px]" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 6 48">
        <g id="Frame 40">
          <circle cx="3" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 133" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 187" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 188" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="24" fill="var(--fill-0, var(--widget-white))" id="Ellipse 189" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="31" fill="var(--fill-0, var(--widget-white))" id="Ellipse 190" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="38" fill="var(--fill-0, var(--widget-white))" id="Ellipse 191" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="45" fill="var(--fill-0, var(--widget-white))" id="Ellipse 192" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-[34px] widget-relative widget-shrink-0 w-[6px]" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 6 34">
        <g id="Frame 41">
          <circle cx="3" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 133" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 187" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 188" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="24" fill="var(--fill-0, var(--widget-white))" id="Ellipse 189" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="31" fill="var(--fill-0, var(--widget-white))" id="Ellipse 190" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="h-[20px] widget-relative widget-shrink-0 w-[6px]" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 6 20">
        <g id="Frame 42">
          <circle cx="3" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 188" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 189" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 190" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Frame27() {
  return (
    <div className="widget-relative widget-shrink-0 size-[6px]" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
        <g id="Frame 43">
          <circle cx="3" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 190" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

export function Dots5({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`absolute bottom-[8px] left-1/2 -translate-x-1/2 content-stretch flex gap-px items-center w-[27px] ${className || ''}`.trim()} data-name="Dots" aria-label={ariaLabel || "Dots"}>
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
    </div>
  );
}

export function Play({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card-wrapper ${className || ''}`.trim()} data-name="Play" aria-label={ariaLabel || "Play"}>
      <div className="absolute inset-0 widget-card--rounded widget-size-152">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none widget-card--rounded size-full" src={imgRectangle14} />
      </div>
      <Dots5 />
    </div>
  );
}
