import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import imgImage from '@/assets/images/069cf4a7d68229b16958df0e634b08f7e38a57a5.png'
import imgImage1 from '@/assets/images/d4958924652b57d9264472fb648b23352acb5efe.png'
import imgImage2 from '@/assets/images/7a8b290651784fe12426559d68090e7c46995862.png'
import imgImage3 from '@/assets/images/08fa5ab888d375f4821c4d4815b806ab537f90ed.png'

const widgetSubVariants = cva('', {
  variants: {
    theme: { light: 'widget-theme--light', dark: 'widget-theme--dark' },
    size: {
      small: 'widget-size--small',
      medium: 'widget-size--medium',
      large: 'widget-size--large',
    },
  },
  defaultVariants: { theme: 'dark', size: 'medium' },
})

export interface WidgetSubProps {
  theme?: 'light' | 'dark'
  size?: 'small' | 'medium' | 'large'
  className?: string
  'aria-label'?: string
  style?: React.CSSProperties
}

/**
 * Card 组件 (合并自原 Card / Card1 / Card2 / Card3)
 *
 * - variant: 'square' (152×152, 默认) | 'pill' (320×152, 横长药丸)
 * - image: 'a' | 'b' | 'c' | 'd' 四张内建图片之一；或自定义 string URL
 */
export type CardVariant = 'square' | 'pill'
export type CardImagePreset = 'a' | 'b' | 'c' | 'd'

export interface CardProps extends WidgetSubProps {
  variant?: CardVariant
  image?: CardImagePreset | string
}

const IMAGE_PRESETS: Record<CardImagePreset, string> = {
  a: imgImage,
  b: imgImage1,
  c: imgImage2,
  d: imgImage3,
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      theme,
      size,
      className,
      'aria-label': ariaLabel,
      style,
      variant = 'square',
      image = 'a',
      ...props
    },
    ref,
  ) => {
    const imageSrc =
      typeof image === 'string' && image in IMAGE_PRESETS
        ? IMAGE_PRESETS[image as CardImagePreset]
        : image

    if (variant === 'pill') {
      return (
        <div
          ref={ref}
          style={style}
          className={cn(
            widgetSubVariants({ theme, size }),
            `grid-cols-[max-content] grid-rows-[max-content] inline-grid widget-leading-0 place-items-start widget-relative widget-shrink-0 widget-overflow-hidden ${className || ''}`.trim(),
          )}
          data-theme={dataAttr(theme)}
          data-size={dataAttr(size)}
          data-variant={dataAttr(variant)}
          {...props}
          data-name="Card"
          aria-label={ariaLabel || 'Card'}
        >
          <div
            className="widget-bg-light widget-col-1 h-[152px] ml-0 mt-0 widget-relative widget-rounded-pill widget-row-1 w-[320px]"
            data-name="BG"
          />
          <div
            className="widget-col-1 h-[136px] ml-[8.1px] mt-[8px] widget-relative widget-rounded-pill widget-row-1 w-[303.798px]"
            data-name="Image"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none widget-rounded-pill">
              <img
                alt=""
                className="absolute h-[148.71%] left-0 max-w-none top-[-7.82%] w-full"
                src={imageSrc}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card-wrapper ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        data-variant={dataAttr(variant)}
        {...props}
        data-name="Card"
        aria-label={ariaLabel || 'Card'}
      >
        <div
          className="widget-bg-light absolute inset-0 widget-card--rounded widget-size-152"
          data-name="BG"
        />
        <div
          className="absolute left-[8px] top-[8px] widget-rounded-16 size-[136px]"
          data-name="Image"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none widget-rounded-16 size-full"
            src={imageSrc}
          />
        </div>
      </div>
    )
  },
)
Card.displayName = 'Card'
