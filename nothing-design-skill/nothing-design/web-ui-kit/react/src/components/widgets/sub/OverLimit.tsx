import React from 'react';

export function OverLimit({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 widget-text widget-text--center widget-opacity-70 ${className || ''}`.trim()} data-name="Over Limit" aria-label={ariaLabel || "Over Limit"}>
      <p className="widget-text widget-text--18" style={{ fontVariationSettings: "'wdth' 100" }}>
        30m
      </p>
      <p className="widget-text widget-text--10 widget-text--grey2 widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Over Limit
      </p>
    </div>
  );
}

export function Overlimit({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--rounded widget-card--accent ${className || ''}`.trim()} data-name="Overlimit" aria-label={ariaLabel || "Overlimit"}>
      <div className="flex flex-col justify-center size-full">
        <div className=" content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full text-white whitespace-nowrap">
          <OverLimit />
          <p className="widget-text widget-text--ndot widget-text--sr widget-text--uppercase widget-relative widget-shrink-0">
            <span className="widget-leading-29 widget-text widget-text--32">16</span>
            <span className="widget-leading-29 widget-text widget-text--16">{`H `}</span>
            <span className="widget-leading-29 widget-text widget-text--32">32</span>
            <span className="widget-leading-29 widget-text widget-text--16">M</span>
          </p>
        </div>
      </div>
    </div>
  );
}
