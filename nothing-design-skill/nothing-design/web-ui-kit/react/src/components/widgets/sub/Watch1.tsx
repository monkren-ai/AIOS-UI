import React from 'react';

export function Watch1({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-relative widget-shrink-0 size-[152px] ${className || ''}`.trim()} data-name="Watch" aria-label={ariaLabel || "Watch"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 152 152">
        <g id="Watch">
          <circle cx="76" cy="76" fill="var(--fill-0, var(--widget-dark-bg))" id="BG" r="76" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
          <g id="Watch Hands">
            <rect fill="var(--fill-0, var(--widget-white))" height="52" id="Watch " rx="8" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} transform="rotate(-60 34 60.8564)" width="16" x="34" y="60.8564" />
            <rect fill="var(--fill-0, var(--widget-dark-3))" height="63.95" id="Watch _2" rx="3" style={{ fill: "color(display-p3 0.4235 0.4118 0.4314)", fillOpacity: "1" }} transform="rotate(60 126.382 42.025)" width="6" x="126.382" y="42.025" />
            <circle cx="42" cy="133" fill="var(--fill-0, var(--widget-primary))" id="Watch _3" r="4" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          </g>
        </g>
      </svg>
    </div>
  );
}
