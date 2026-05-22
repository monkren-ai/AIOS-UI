import React from 'react';

export function PairNewDevice({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim()} data-name="Pair New Device" aria-label={ariaLabel || "Pair New Device"}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] widget-relative size-full">
          <div className=" widget-text widget-text--ndot widget-text--16 widget-text--grey widget-text--center widget-text--uppercase widget-text--nowrap">
            <p className="widget-leading-normal mb-0">Pair</p>
            <p className="widget-leading-normal">New Device</p>
          </div>
        </div>
      </div>
    </div>
  );
}
