import * as React from 'react'
import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/ReducedMotionProvider'
import { cn, dataAttr } from '@/lib/utils'
import {
  carouselContainerVariants,
  carouselControlsVariants,
  carouselCounterVariants,
  carouselIndicatorVariants,
  carouselIndicatorsVariants,
  carouselInfoVariants,
  carouselNavButtonVariants,
  carouselNavButtonsVariants,
  carouselSlideIconVariants,
  carouselSlideSubtitleVariants,
  carouselSlideTextVariants,
  carouselSlideTitleVariants,
  carouselSlideVariants,
  photoCarouselVariants,
  type PhotoCarouselOrientation,
} from './photo-carousel-variants'

interface Slide {
  title: string
  subtitle?: string
  /** CSS background (gradient / color). 默认回退到 dot-matrix pattern。 */
  gradient?: string
  /** 可选图片 URL (优先于 gradient). */
  image?: string
  /** 占位 dot-matrix 索引 0-3，NF 美学默认（无 image/gradient 时） */
  pattern?: number
}

export type { PhotoCarouselOrientation }

export interface PhotoCarouselProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  autoPlay?: boolean
  autoPlayInterval?: number
  slides?: Slide[]
  orientation?: PhotoCarouselOrientation
  autoplay?: boolean
}

const defaultSlides: Slide[] = [
  { title: 'Solar Flare', subtitle: 'Chromosphere · H-alpha', pattern: 0 },
  { title: 'Verdant', subtitle: 'Coastal pine · 04:21', pattern: 1 },
  { title: 'Glacial', subtitle: 'Polar · -12°C', pattern: 2 },
  { title: 'Ember', subtitle: 'Magma flow', pattern: 3 },
]

export function PhotoCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 4000,
  slides = defaultSlides,
  orientation = 'horizontal',
  autoplay: autoplayProp,
  style,
  ...props
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const autoplay = autoplayProp ?? autoPlay
  // 自动轮播是「不请自来的动效」，降级偏好下一律不启动，只留手动翻页。
  const autoplayActive = autoplay && !reducedMotion
  const hasImages = slides.some((s) => !!s.image)

  useEffect(() => {
    if (!autoplayActive) return
    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [autoplayActive, autoPlayInterval, slides.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const handleGoToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className={cn(photoCarouselVariants({ orientation, autoplay }), className)}
      style={style}
      data-slot="photo-carousel"
      data-orientation={dataAttr(orientation)}
      data-autoplay={dataAttr(autoplay)}
      data-autoplay-active={dataAttr(autoplayActive)}
      data-index={dataAttr(currentIndex)}
      data-real={dataAttr(hasImages)}
      {...props}
    >
      <div data-slot="photo-carousel-track" className={carouselContainerVariants()}>
        {slides.map((slide, index) => (
          <div
            key={index}
            data-slot="photo-carousel-slide"
            className={carouselSlideVariants({ active: index === currentIndex })}
            data-active={dataAttr(index === currentIndex)}
            style={
              slide.image
                ? {
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : {
                    background:
                      slide.gradient ?? defaultSlides[index % defaultSlides.length].gradient,
                  }
            }
          >
            {slide.image ? null : (
              <svg
                data-slot="photo-carousel-slide-icon"
                className={carouselSlideIconVariants()}
                viewBox="0 0 24 24"
                fill="none"
                width="48"
                height="48"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  strokeWidth="2"
                  stroke="currentColor"
                />
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" stroke="currentColor" />
                <path
                  d="M21 15l-5-5L5 21"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                />
              </svg>
            )}
            <div data-slot="photo-carousel-slide-text" className={carouselSlideTextVariants()}>
              <div data-slot="photo-carousel-slide-title" className={carouselSlideTitleVariants()}>
                {slide.title}
              </div>
              {slide.subtitle && (
                <div
                  data-slot="photo-carousel-slide-subtitle"
                  className={carouselSlideSubtitleVariants()}
                >
                  {slide.subtitle}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div data-slot="photo-carousel-controls" className={carouselControlsVariants()}>
        <div data-slot="photo-carousel-nav" className={carouselNavButtonsVariants()}>
          <button
            data-slot="photo-carousel-prev"
            className={carouselNavButtonVariants()}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18l-6-6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            data-slot="photo-carousel-next"
            className={carouselNavButtonVariants()}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 18l6-6-6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div data-slot="photo-carousel-indicators" className={carouselIndicatorsVariants()}>
          {slides.map((_, index) => (
            <button
              key={index}
              data-slot="photo-carousel-indicator"
              className={carouselIndicatorVariants({ active: index === currentIndex })}
              data-active={dataAttr(index === currentIndex)}
              onClick={() => handleGoToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>

        <div data-slot="photo-carousel-info" className={carouselInfoVariants()}>
          <div data-slot="photo-carousel-counter" className={carouselCounterVariants()}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  )
}

PhotoCarousel.displayName = 'PhotoCarousel'

export { photoCarouselVariants }
export default PhotoCarousel
