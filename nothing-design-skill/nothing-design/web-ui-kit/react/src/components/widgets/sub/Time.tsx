import React from 'react';

export function Time({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`grid-cols-[max-content] grid-rows-[max-content] inline-grid widget-leading-0 place-items-start widget-relative widget-shrink-0 widget-overflow-hidden ${className || ''}`.trim()} data-name="Time" aria-label={ariaLabel || "Time"}>
      <div className="widget-bg-dark widget-col-1 h-[152px] ml-0 mt-0 widget-relative widget-rounded-pill widget-row-1 w-[68px]" />
      <div className=" widget-col-1 ml-[13px] mt-[40px] widget-relative widget-row-1 widget-text widget-text--ndot widget-text--32 widget-text--grey widget-text--center widget-text--nowrap">
        <p className="widget-leading-36 mb-0">22</p>
        <p className="widget-leading-36">10</p>
      </div>
    </div>
  );
}
