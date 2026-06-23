import * as React from 'react'
import { useState, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './PhotoCarousel.css'

interface Slide {
  title: string
  subtitle?: string
  /** CSS background (gradient / color). 默认 4 色循环. */
  gradient?: string
  /** 可选图片 URL (优先于 gradient). */
  image?: string
}

export type PhotoCarouselOrientation = 'horizontal' | 'vertical'

const photoCarouselVariants = cva('nothing-photo-carousel', {
  variants: {
    orientation: {
      horizontal: 'nothing-photo-carousel--horizontal',
      vertical: 'nothing-photo-carousel--vertical',
    },
    autoplay: {
      true: 'nothing-photo-carousel--autoplay',
      false: '',
    },
  },
  defaultVariants: { orientation: 'horizontal', autoplay: false },
})

export interface PhotoCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof photoCarouselVariants>, 'orientation' | 'autoplay'> {
  autoPlay?: boolean
  autoPlayInterval?: number
  slides?: Slide[]
  orientation?: PhotoCarouselOrientation
  autoplay?: boolean
}

const defaultSlides: Slide[] = [
  { title: 'Solar Flare', subtitle: 'Chromosphere · H-alpha', gradient: 'linear-gradient(135deg, #ff5b1f 0%, #ffb627 100%)' },
  { title: 'Verdant', subtitle: 'Coastal pine · 04:21', gradient: 'linear-gradient(135deg, #0a3d2c 0%, #1ec27e 100%)' },
  { title: 'Glacial', subtitle: 'Polar · -12°C', gradient: 'linear-gradient(135deg, #0a1d3a 0%, #4a8bff 100%)' },
  { title: 'Ember', subtitle: 'Magma flow', gradient: 'linear-gradient(135deg, #6a0e2a 0%, #ff3066 100%)' },
]

export const PhotoCarousel = React.forwardRef<HTMLDivElement, PhotoCarouselProps>(
  (
    {
      className,
      autoPlay = true,
      autoPlayInterval = 4000,
      slides = defaultSlides,
      orientation = 'horizontal',
      autoplay: autoplayProp,
      style,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const autoplay = autoplayProp ?? autoPlay
    const hasImages = slides.some((s) => !!s.image)

    useEffect(() => {
      if (!autoplay) return
      const timer = setInterval(() => {
        if (typeof document !== 'undefined' && document.hidden) return
        setCurrentIndex((prev) => (prev + 1) % slides.length)
      }, autoPlayInterval)
      return () => clearInterval(timer)
    }, [autoplay, autoPlayInterval, slides.length])

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
        ref={ref}
        className={cn(photoCarouselVariants({ orientation, autoplay }), className)}
        style={style}
        data-orientation={dataAttr(orientation)}
        data-autoplay={dataAttr(autoplay)}
        data-index={dataAttr(currentIndex)}
        data-real={dataAttr(hasImages)}
        {...props}
      >
        <div className="carousel-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn('carousel-slide', index === currentIndex && 'active')}
              data-active={dataAttr(index === currentIndex)}
              style={
                slide.image
                  ? { backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { background: slide.gradient ?? defaultSlides[index % defaultSlides.length].gradient }
              }
            >
              {slide.image ? null : (
                <svg
                  className="carousel-slide-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  width="48"
                  height="48"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" stroke="currentColor" />
                  <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" stroke="currentColor" />
                  <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                </svg>
              )}
              <div className="carousel-slide-text">
                <div className="carousel-slide-title">{slide.title}</div>
                {slide.subtitle && <div className="carousel-slide-subtitle">{slide.subtitle}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <div className="carousel-nav-buttons">
            <button className="carousel-nav-btn" onClick={handlePrev} aria-label="Previous slide">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  className="carousel-nav-icon"
                  d="M15 18l-6-6 6-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="carousel-nav-btn" onClick={handleNext} aria-label="Next slide">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  className="carousel-nav-icon"
                  d="M9 18l6-6-6-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn('carousel-indicator', index === currentIndex && 'active')}
                onClick={() => handleGoToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>

          <div className="carousel-info">
            <div className="carousel-counter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
PhotoCarousel.displayName = 'PhotoCarousel'

export { photoCarouselVariants }
export default PhotoCarousel
