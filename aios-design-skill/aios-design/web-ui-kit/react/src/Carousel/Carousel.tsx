import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  carouselButtonVariants,
  carouselControlsVariants,
  carouselSlideVariants,
  carouselStatusVariants,
  carouselVariants,
  carouselViewportVariants,
} from './carousel-variants'

export interface CarouselProps extends Omit<React.ComponentPropsWithRef<'section'>, 'children'> {
  items: React.ReactNode[]
  value?: number
  defaultValue?: number
  onValueChange?: (index: number) => void
  loop?: boolean
  previousLabel?: string
  nextLabel?: string
}

function clampIndex(index: number, length: number) {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0))
}

export function Carousel({
  items,
  value,
  defaultValue = 0,
  onValueChange,
  loop = false,
  previousLabel = 'Previous slide',
  nextLabel = 'Next slide',
  className,
  ...props
}: CarouselProps) {
  const [internalValue, setInternalValue] = React.useState(() =>
    clampIndex(defaultValue, items.length),
  )
  const activeIndex = clampIndex(value ?? internalValue, items.length)
  const controlled = value !== undefined

  const setIndex = React.useCallback(
    (nextIndex: number) => {
      if (items.length === 0) return
      const resolved = loop
        ? (nextIndex + items.length) % items.length
        : clampIndex(nextIndex, items.length)
      if (!controlled) setInternalValue(resolved)
      onValueChange?.(resolved)
    },
    [controlled, items.length, loop, onValueChange],
  )

  const previousDisabled = !loop && activeIndex === 0
  const nextDisabled = !loop && activeIndex === items.length - 1

  return (
    <section
      aria-roledescription="carousel"
      className={cn(carouselVariants(), className)}
      data-slot="carousel"
      data-index={dataAttr(activeIndex)}
      {...props}
    >
      <div className={cn(carouselViewportVariants())} data-slot="carousel-viewport">
        {items.map((item, index) => (
          <div
            aria-label={`${index + 1} of ${items.length}`}
            aria-roledescription="slide"
            className={cn(carouselSlideVariants())}
            data-slot="carousel-slide"
            hidden={index !== activeIndex}
            key={index}
            role="group"
          >
            {item}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className={cn(carouselControlsVariants())} data-slot="carousel-controls">
          <button
            aria-label={previousLabel}
            className={cn(carouselButtonVariants())}
            data-slot="carousel-previous"
            disabled={previousDisabled}
            onClick={() => setIndex(activeIndex - 1)}
            type="button"
          >
            ‹
          </button>
          <span
            aria-live="polite"
            className={cn(carouselStatusVariants())}
            data-slot="carousel-status"
          >
            {activeIndex + 1} / {items.length}
          </span>
          <button
            aria-label={nextLabel}
            className={cn(carouselButtonVariants())}
            data-slot="carousel-next"
            disabled={nextDisabled}
            onClick={() => setIndex(activeIndex + 1)}
            type="button"
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}

Carousel.displayName = 'Carousel'

export {
  carouselButtonVariants,
  carouselControlsVariants,
  carouselSlideVariants,
  carouselStatusVariants,
  carouselVariants,
  carouselViewportVariants,
}
export default Carousel
