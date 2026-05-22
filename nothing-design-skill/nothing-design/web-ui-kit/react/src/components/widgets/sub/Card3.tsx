import React from 'react';
import imgImage3 from '../../../assets/images/08fa5ab888d375f4821c4d4815b806ab537f90ed.png';

export function Card3({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`grid-cols-[max-content] grid-rows-[max-content] inline-grid widget-leading-0 place-items-start widget-relative widget-shrink-0 widget-overflow-hidden ${className || ''}`.trim()} data-name="Card" aria-label={ariaLabel || "Card"}>
      <div className="widget-bg-light widget-col-1 h-[152px] ml-0 mt-0 widget-relative widget-rounded-pill widget-row-1 w-[320px]" data-name="BG" />
      <div className="widget-col-1 h-[136px] ml-[8.1px] mt-[8px] widget-relative widget-rounded-pill widget-row-1 w-[303.798px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none widget-rounded-pill">
          <img alt="" className="absolute h-[148.71%] left-0 max-w-none top-[-7.82%] w-full" src={imgImage3} />
        </div>
      </div>
    </div>
  );
}
