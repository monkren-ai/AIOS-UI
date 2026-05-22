import React from 'react';

export function Device1({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`h-[25.456px] widget-relative widget-shrink-0 w-[25.841px] ${className || ''}`.trim()} data-name="Device" aria-label={ariaLabel || "Device"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 25.8406 25.4559">
        <g id="Device">
          <rect fill="var(--fill-0, var(--widget-dark-5, #939196))" height="26" id="Rectangle 10" rx="5" style={{ fill: "color(display-p3 0.5765 0.5686 0.5882)", fillOpacity: "1" }} transform="rotate(45 18.3848 2.2769e-05)" width="10" x="18.3848" y="2.2769e-05" />
          <rect fill="var(--fill-0, var(--widget-dark-5, #939196))" height="26" id="Rectangle 11" rx="5" style={{ fill: "color(display-p3 0.5765 0.5686 0.5882)", fillOpacity: "1" }} transform="rotate(-45 0.384776 7.07107)" width="10" x="0.384776" y="7.07107" />
          <circle cx="18.6895" cy="18.344" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 227" r="4" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

export function SelectDevice({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--rounded widget-card--light ${className || ''}`.trim()} data-name="Select Device" aria-label={ariaLabel || "Select Device"}>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center justify-center p-[16px] widget-relative size-full">
          <Device1 />
          <div className=" widget-text widget-text--ndot widget-text--16 widget-text--grey2 widget-text--center widget-text--nowrap">
            <p className="widget-leading-20 mb-0 whitespace-pre">{`SELECT THE `}</p>
            <p className="widget-leading-20 whitespace-pre">DEVICE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
