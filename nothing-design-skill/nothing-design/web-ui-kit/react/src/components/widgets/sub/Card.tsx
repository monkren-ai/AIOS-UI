import React from 'react';
import imgImage from '../../../assets/images/069cf4a7d68229b16958df0e634b08f7e38a57a5.png';
import imgImage1 from '../../../assets/images/d4958924652b57d9264472fb648b23352acb5efe.png';

export function Card({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card-wrapper ${className || ''}`.trim()} data-name="Card" aria-label={ariaLabel || "Card"}>
      <div className="widget-bg-light absolute inset-0 widget-card--rounded widget-size-152" data-name="BG" />
      <div className="absolute left-[8px] top-[8px] widget-rounded-16 size-[136px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none widget-rounded-16 size-full" src={imgImage} />
      </div>
    </div>
  );
}

export function Card1({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card-wrapper ${className || ''}`.trim()} data-name="Card" aria-label={ariaLabel || "Card"}>
      <div className="widget-bg-light absolute inset-0 widget-card--rounded widget-size-152" data-name="BG" />
      <div className="absolute left-[8px] top-[8px] widget-rounded-16 size-[136px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none widget-rounded-16 size-full" src={imgImage1} />
      </div>
    </div>
  );
}
