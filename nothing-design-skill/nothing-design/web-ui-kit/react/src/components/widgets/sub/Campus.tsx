import React from 'react';

function Dots2() {
  return (
    <div className="widget-col-1 h-[49px] ml-[58px] mt-[52px] widget-relative widget-row-1 w-[35px]" data-name="Dots" aria-hidden="true">
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 35 49">
        <g id="Dots">
          <circle cx="17.5" cy="3.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 220" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="17.5" cy="10.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 221" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="17.5" cy="17.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 222" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="17.5" cy="24.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 223" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="17.5" cy="31.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 224" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="17.5" cy="38.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 225" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="17.5" cy="45.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 226" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="10.5" cy="10.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 221_2" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="3.5" cy="17.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 223_2" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="31.5" cy="17.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 224_2" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <circle cx="24.5" cy="10.5" fill="var(--fill-0, var(--widget-card-bg))" id="Ellipse 222_2" r="3.5" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

export function Campus({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-grid-auto ${className || ''}`.trim()} data-name="Campus" aria-label={ariaLabel || "Campus"}>
      <div className="widget-col-1 ml-0 mt-0 widget-relative widget-row-1 size-[152px]" data-name="BG">
        <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 152 152">
          <circle cx="76" cy="76" fill="var(--fill-0, var(--widget-dark-bg))" id="BG" r="76" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
        </svg>
      </div>
      <p className=" widget-col-1 ml-[13px] mt-[70px] widget-relative widget-row-1 widget-text widget-text--10 widget-text--grey widget-text--center widget-text--uppercase widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        W
      </p>
      <p className=" widget-col-1 ml-[132px] mt-[70px] widget-relative widget-row-1 widget-text widget-text--10 widget-text--grey widget-text--center widget-text--uppercase widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        E
      </p>
      <p className=" widget-col-1 ml-[72px] mt-[131px] widget-relative widget-row-1 widget-text widget-text--10 widget-text--grey widget-text--center widget-text--uppercase widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        S
      </p>
      <p className=" widget-col-1 ml-[71px] mt-[9px] widget-relative widget-row-1 widget-text widget-text--10 widget-text--accent widget-text--center widget-text--uppercase widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        N
      </p>
      <Dots2 />
    </div>
  );
}
