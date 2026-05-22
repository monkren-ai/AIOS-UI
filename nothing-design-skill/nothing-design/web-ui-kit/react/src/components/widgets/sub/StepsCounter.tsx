import React from 'react';

export function StepsCount({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 ${className || ''}`.trim()} data-name="Steps Count" aria-label={ariaLabel || "Steps Count"}>
      <p className="widget-text widget-text--10 widget-text--grey widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Total Steps
      </p>
      <p className="widget-text widget-text--ndot widget-text--30 widget-text--grey3">5,543</p>
    </div>
  );
}

export function Streak({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 ${className || ''}`.trim()} data-name="Streak" aria-label={ariaLabel || "Streak"}>
      <p className="widget-text widget-text--10 widget-text--grey widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Streak
      </p>
      <p className="widget-text widget-text--ndot widget-text--30 widget-text--grey3">3 DAYS</p>
    </div>
  );
}

export function StepsCounter({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--rounded widget-card--light ${className || ''}`.trim()} data-name="Steps Counter" aria-label={ariaLabel || "Steps Counter"}>
      <div className="flex flex-col justify-center size-full">
        <div className=" content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full whitespace-nowrap">
          <StepsCount />
          <Streak />
        </div>
      </div>
    </div>
  );
}
