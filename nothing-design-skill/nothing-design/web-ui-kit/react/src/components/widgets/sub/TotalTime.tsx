import React from 'react';

export function Graphic({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`h-[20px] widget-relative widget-shrink-0 w-[118px] ${className || ''}`.trim()} data-name="Graphic" aria-label={ariaLabel || "Graphic"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 118 20">
        <g id="Graphic">
          <circle cx="38" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 90" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="38" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 131" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="38" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 96" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="52" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 91" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="52" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 132" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="87" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 119" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="87" cy="17" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 133" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="52" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 97" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="87" cy="10" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 120" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="66" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 92" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="66" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 134" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="101" cy="3" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 121" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="101" cy="17" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 135" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="73" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 117" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="73" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 136" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="108" cy="3" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 122" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="108" cy="17" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 137" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="115" cy="3" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 129" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="115" cy="17" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 138" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="66" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 98" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="101" cy="10" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 123" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="73" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 118" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="108" cy="10" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 124" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="115" cy="10" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 130" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="24" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 72" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="24" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 139" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="10" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 84" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="10" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 140" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="10" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 86" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="24" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 74" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="31" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 93" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="31" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 141" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="31" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 99" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="45" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 94" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="45" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 142" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="80" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 125" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="80" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 143" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="45" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 100" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="80" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 126" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="59" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 95" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="59" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 144" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="94" cy="3" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 127" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="94" cy="17" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 145" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="59" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 101" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="94" cy="10" fill="var(--fill-0, var(--widget-primary))" id="Ellipse 128" r="3" style={{ fill: "color(display-p3 0.8431 0.0980 0.1294)", fillOpacity: "1" }} />
          <circle cx="17" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 73" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="17" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 146" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="3" fill="var(--fill-0, var(--widget-white))" id="Ellipse 85" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="17" fill="var(--fill-0, var(--widget-white))" id="Ellipse 147" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="3" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 87" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
          <circle cx="17" cy="10" fill="var(--fill-0, var(--widget-white))" id="Ellipse 75" r="3" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

export function Info4({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={` content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 whitespace-nowrap ${className || ''}`.trim()} data-name="Info" aria-label={ariaLabel || "Info"}>
      <p className="widget-text widget-text--light widget-text--sr widget-text--white widget-relative widget-shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="widget-leading-normal text-[32px]">6</span>
        <span className="widget-leading-normal text-[16px]">{`H `}</span>
        <span className="widget-leading-normal text-[32px]">20</span>
      </p>
      <p className="widget-text widget-text--10 widget-text--grey2 widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Total Time
      </p>
    </div>
  );
}

export function TotalTime({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim()} data-name="Total Time" aria-label={ariaLabel || "Total Time"}>
      <div className="content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full">
        <Graphic />
        <Info4 />
      </div>
    </div>
  );
}
