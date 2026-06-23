import * as React from 'react'
import { useState, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { withWidgetCard } from './withWidgetCard'
import { useNow } from '@/system/hooks'
import DotMatrix from '@/DotMatrix'
import { cn, dataAttr } from '@/lib/utils'
import '@/styles/photo-frame-widget.css'

export interface PhotoFrameImage {
  src: string
  alt?: string
}

const photoFrameVariants = cva('nothing-photo-frame', {
  variants: {
    variant: {
      pill: 'nothing-photo-frame--pill',
      square: 'nothing-photo-frame--square',
    },
    theme: {
      light: 'nothing-photo-frame--light',
      dark: 'nothing-photo-frame--dark',
    },
    aspectRatio: {
      '1:1': 'nothing-photo-frame--ratio-1x1',
      '4:5': 'nothing-photo-frame--ratio-4x5',
      '16:9': 'nothing-photo-frame--ratio-16x9',
    },
  },
  defaultVariants: { variant: 'square', theme: 'dark', aspectRatio: '1:1' },
})

const slideVariants = cva('nothing-photo-frame__slide', {
  variants: {
    active: { true: 'nothing-photo-frame__slide--active', false: '' },
  },
  defaultVariants: { active: false },
})

const dotVariants = cva('nothing-photo-frame__dot', {
  variants: {
    active: { true: 'nothing-photo-frame__dot--active', false: '' },
  },
  defaultVariants: { active: false },
})

export interface PhotoFrameWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof photoFrameVariants>, 'variant' | 'theme' | 'aspectRatio'> {
  variant?: 'pill' | 'square'
  src?: string
  alt?: string
  images?: PhotoFrameImage[]
  autoPlay?: boolean
  autoPlayInterval?: number
  theme?: 'light' | 'dark'
  aspectRatio?: '1:1' | '4:5' | '16:9'
}

const PhotoFrameWidgetInner = React.forwardRef<HTMLDivElement, PhotoFrameWidgetProps>(
  (
    {
      className,
      variant = 'square',
      src,
      alt = '',
      images,
      autoPlay = true,
      autoPlayInterval = 4000,
      theme = 'dark',
      aspectRatio,
      style,
      ...props
    },
    ref
  ) => {
    const isCarousel = Array.isArray(images) && images.length > 1
    const displayImages = isCarousel ? images! : src ? [{ src, alt }] : []
    const hasContent = displayImages.length > 0
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    // useNow 节拍:仅在需要时按 autoPlayInterval tick,否则保持低频心跳
    const tickInterval = isCarousel && autoPlay && !isPaused && hasContent ? autoPlayInterval : 60_000
    const now = useNow(tickInterval)
    // 将 now 引用作为 effect 依赖,触发 autoPlay 推进
    void now

    useEffect(() => {
      if (!isCarousel || !autoPlay || isPaused || !hasContent) return
      if (typeof document !== 'undefined' && document.hidden) return
      setActiveIndex((prev) => (prev + 1) % displayImages.length)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [now, isCarousel, autoPlay, isPaused, hasContent, displayImages.length])

    const handleMouseEnter = () => {
      if (autoPlay && isCarousel) {
        setIsPaused(true)
      }
    }

    const handleMouseLeave = () => {
      if (autoPlay && isCarousel) {
        setIsPaused(false)
      }
    }

    const handleDotClick = (index: number) => {
      setActiveIndex(index)
    }

    const ariaLabel = isCarousel
      ? `Photo carousel, ${displayImages.length} images, showing ${displayImages[activeIndex]?.alt || `image ${activeIndex + 1}`}`
      : alt || 'Photo frame'

    // 无图片 / 无 src 时 fallback 到 4x4 DotMatrix 几何占位
    const showFallback = !hasContent
    // pulse dots: 用 activeIndex 派生几何 frame (4x4 旋转 / scan)
    const fallbackDots: [number, number][] = React.useMemo(() => {
      if (!showFallback) return []
      const dots: [number, number][] = []
      // 边框 + 对角线
      for (let i = 0; i < 4; i++) {
        dots.push([0, i], [3, i], [i, 0], [i, 3])
        if (i < 2) {
          dots.push([i + 1, i + 1])
          dots.push([i + 1, 2 - i])
        }
      }
      return dots
    }, [showFallback])

    return (
      <div
        ref={ref}
        className={cn(photoFrameVariants({ variant, theme, aspectRatio }), className)}
        style={style}
        role={isCarousel ? 'group' : 'img'}
        aria-label={ariaLabel}
        data-variant={dataAttr(variant)}
        data-theme={dataAttr(theme)}
        data-state={dataAttr(isCarousel ? (isPaused ? 'paused' : 'playing') : showFallback ? 'fallback' : 'static')}
        data-real={dataAttr(hasContent)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="nothing-photo-frame__image-wrapper">
          {showFallback ? (
            <DotMatrix
              rows={4}
              cols={4}
              dotSize="md"
              theme={theme === 'light' ? 'light' : 'dark'}
              pattern="pulse"
              activeDots={fallbackDots}
            />
          ) : isCarousel ? (
            displayImages.map((image, index) => (
              <div
                key={index}
                className={cn(slideVariants({ active: index === activeIndex }))}
                aria-hidden={index !== activeIndex}
              >
                <img
                  src={image.src}
                  alt={image.alt || ''}
                  className="nothing-photo-frame__image"
                  draggable={false}
                />
              </div>
            ))
          ) : (
            <img
              src={displayImages[0].src}
              alt={displayImages[0].alt || ''}
              className="nothing-photo-frame__image"
              draggable={false}
            />
          )}
        </div>
        {isCarousel && (
          <div className="nothing-photo-frame__dots" role="tablist" aria-label="Carousel navigation">
            {displayImages.map((image, index) => (
              <button
                key={index}
                className={cn(dotVariants({ active: index === activeIndex }))}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={image.alt || `Image ${index + 1}`}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => handleDotClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault()
                    const next = (index + 1) % displayImages.length
                    setActiveIndex(next)
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault()
                    const prev = (index - 1 + displayImages.length) % displayImages.length
                    setActiveIndex(prev)
                  }
                }}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
PhotoFrameWidgetInner.displayName = 'PhotoFrameWidget'

export { photoFrameVariants, slideVariants, dotVariants }
export { PhotoFrameWidgetInner as PhotoFrameWidgetBase }
export const PhotoFrameWidget = withWidgetCard(PhotoFrameWidgetInner)
export default PhotoFrameWidget
