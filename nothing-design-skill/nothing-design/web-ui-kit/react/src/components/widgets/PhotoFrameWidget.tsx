import { useState, useEffect, useCallback, useRef } from 'react'
import { withWidgetCard } from './withWidgetCard'
import '../../styles/photo-frame-widget.css'

export interface PhotoFrameImage {
  src: string;
  alt?: string;
}

interface PhotoFrameWidgetProps {
  variant?: 'pill' | 'square';
  src?: string;
  alt?: string;
  images?: PhotoFrameImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
}

const PhotoFrameWidget: React.FC<PhotoFrameWidgetProps> = ({
  variant = 'square',
  src,
  alt = '',
  images,
  autoPlay = true,
  autoPlayInterval = 4000,
  theme = 'dark',
  className,
  style
}) => {
  const isCarousel = Array.isArray(images) && images.length > 1
  const displayImages = isCarousel ? images! : (src ? [{ src, alt }] : [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const advance = useCallback(() => {
    if (!isCarousel) return
    setActiveIndex(prev => (prev + 1) % displayImages.length)
  }, [isCarousel, displayImages.length])

  useEffect(() => {
    if (!isCarousel || !autoPlay || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(advance, autoPlayInterval)
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isCarousel, autoPlay, autoPlayInterval, isPaused, advance])

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

  const widgetClassName = [
    'nothing-photo-frame',
    `nothing-photo-frame--${variant}`,
    `nothing-photo-frame--${theme}`,
    className || ''
  ].filter(Boolean).join(' ')

  const ariaLabel = isCarousel
    ? `Photo carousel, ${displayImages.length} images, showing ${displayImages[activeIndex]?.alt || `image ${activeIndex + 1}`}`
    : alt || 'Photo frame'

  return (
    <div
      className={widgetClassName}
      style={style}
      role={isCarousel ? 'group' : 'img'}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nothing-photo-frame__image-wrapper">
        {isCarousel ? (
          displayImages.map((image, index) => (
            <div
              key={index}
              className={[
                'nothing-photo-frame__slide',
                index === activeIndex ? 'nothing-photo-frame__slide--active' : ''
              ].filter(Boolean).join(' ')}
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
          displayImages.length === 1 && (
            <img
              src={displayImages[0].src}
              alt={displayImages[0].alt || ''}
              className="nothing-photo-frame__image"
              draggable={false}
            />
          )
        )}
      </div>
      {isCarousel && (
        <div className="nothing-photo-frame__dots" role="tablist" aria-label="Carousel navigation">
          {displayImages.map((image, index) => (
            <button
              key={index}
              className={[
                'nothing-photo-frame__dot',
                index === activeIndex ? 'nothing-photo-frame__dot--active' : ''
              ].filter(Boolean).join(' ')}
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

export { PhotoFrameWidget }
export default withWidgetCard(PhotoFrameWidget)
