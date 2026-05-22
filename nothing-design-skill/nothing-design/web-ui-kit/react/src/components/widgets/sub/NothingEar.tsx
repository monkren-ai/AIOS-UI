import React from 'react';
import imgImage5 from '../../../assets/images/8fd879d735c082acd40888c7284af2fafd403f6a.png';

export function Image({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[12px] items-center ${className || ''}`.trim()} data-name="Image" aria-label={ariaLabel || "Image"}>
      <div className="h-[69px] widget-relative w-[50px]" data-name="image 5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[213.23%] left-[-58.7%] max-w-none top-[-57.55%] w-[217.39%]" src={imgImage5} />
        </div>
      </div>
      <div className="flex h-[69px] items-center justify-center w-[50px]">
        <div className="widget-rotate widget-rotate-180 widget-flex-none">
          <div className="h-[69px] widget-relative w-[50px]" data-name="image 6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[213.23%] left-[-58.7%] max-w-none top-[-57.55%] w-[217.39%]" src={imgImage5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NothingEar({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-card-wrapper ${className || ''}`.trim()} data-name="Nothing Ear 2" aria-label={ariaLabel || "Nothing Ear 2"}>
      <div className="widget-bg-light absolute inset-0 widget-card--rounded size-[152px]" data-name="BG" />
      <Image />
      <p className=" absolute bottom-[16px] left-1/2 -translate-x-1/2 widget-text widget-text--ndot widget-text--16 widget-text--grey2 widget-text--center widget-text--uppercase widget-text--nowrap widget-leading-19">CONNECT</p>
    </div>
  );
}
