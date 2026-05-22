import React from 'react';

export function Arrow({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`-translate-x-1/2 -translate-y-1/2 absolute h-[26.5px] left-1/2 top-[calc(50%+0.25px)] w-[26px] ${className || ''}`.trim()} data-name="Arrow" aria-label={ariaLabel || "Arrow"}>
      <div className="absolute inset-[-3.77%_-3.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28.5">
          <g id="Arrow">
            <path d="M1 14L14 1L27 14" id="Vector 8" stroke="var(--fill-0, var(--widget-primary-dark, #881532))" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" style={{ stroke: "color(display-p3 0.5333 0.0824 0.1961)", strokeOpacity: "1" }} />
            <path d="M14 1V27.5" id="Vector 9" stroke="var(--fill-0, var(--widget-primary-dark, #881532))" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" style={{ stroke: "color(display-p3 0.5333 0.0824 0.1961)", strokeOpacity: "1" }} />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function Icon32({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-relative widget-shrink-0 size-[32px] ${className || ''}`.trim()} data-name="Icon" aria-label={ariaLabel || "Icon"}>
      <Arrow />
    </div>
  );
}

export function LimitCount({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={` content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 widget-text widget-text--nowrap ${className || ''}`.trim()} data-name="Limit Count" aria-label={ariaLabel || "Limit Count"}>
      <p className="widget-leading-0 widget-relative widget-shrink-0 widget-sr text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="widget-text widget-text--light widget-text--32" style={{ fontVariationSettings: "'wdth' 100" }}>
          40
        </span>
        <span className="widget-leading-normal widget-text widget-text--10">{` `}</span>
        <span className="widget-text widget-text--light widget-text--16" style={{ fontVariationSettings: "'wdth' 100" }}>
          MIN
        </span>
      </p>
      <p className="widget-leading-normal widget-relative widget-shrink-0 widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Over Limit
      </p>
    </div>
  );
}

export function OverLimit1({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim()} data-name="Over Limit" aria-label={ariaLabel || "Over Limit"}>
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full">
          <Icon32 />
          <LimitCount />
        </div>
      </div>
    </div>
  );
}
