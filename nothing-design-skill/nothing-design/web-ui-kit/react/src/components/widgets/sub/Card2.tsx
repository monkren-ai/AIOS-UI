import React from 'react';
import imgImage2 from '../../../assets/images/7a8b290651784fe12426559d68090e7c46995862.png';

export function Card2({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card-wrapper ${className || ''}`.trim()} data-name="Card" aria-label={ariaLabel || "Card"}>
      <div className="widget-bg-light absolute inset-0 widget-card--rounded size-[152px]" data-name="BG" />
      <div className="absolute left-[8px] top-[8px] widget-rounded-16 size-[136px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none widget-rounded-16">
          <img alt="" className="absolute h-[133.33%] left-0 max-w-none top-[-8.32%] w-full" src={imgImage2} />
        </div>
      </div>
    </div>
  );
}
