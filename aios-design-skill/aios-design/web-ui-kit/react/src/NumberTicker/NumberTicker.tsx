import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  numberTickerAffixVariants,
  numberTickerDigitValueVariants,
  numberTickerDigitVariants,
  numberTickerVariants,
  type NumberTickerSize,
} from './number-ticker-variants'

export interface NumberTickerProps extends Omit<
  React.ComponentPropsWithRef<'span'>,
  'children' | 'prefix'
> {
  /** 要展示的数字。变化时按位交错滑入，无 blur。 */
  value: number | string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: NumberTickerSize
}

export function NumberTicker({
  value,
  prefix,
  suffix,
  size = 'md',
  className,
  ref,
  ...props
}: NumberTickerProps) {
  const next = String(value)
  const [display, setDisplay] = React.useState(next)
  const [from, setFrom] = React.useState(next)
  const [direction, setDirection] = React.useState<'up' | 'down'>('up')
  const [generation, setGeneration] = React.useState(0)

  React.useEffect(() => {
    if (next === display) return
    const numericNext = Number(next)
    const numericPrev = Number(display)
    if (!Number.isNaN(numericNext) && !Number.isNaN(numericPrev)) {
      setDirection(numericNext >= numericPrev ? 'up' : 'down')
    }
    setFrom(display)
    setDisplay(next)
    setGeneration((count) => count + 1)
  }, [next, display])

  return (
    <span
      ref={ref}
      className={cn(numberTickerVariants({ size }), className)}
      data-slot="number-ticker"
      data-size={dataAttr(size)}
      data-direction={direction}
      {...props}
    >
      {prefix != null && prefix !== '' && (
        <span className={numberTickerAffixVariants()} data-slot="number-ticker-prefix">
          {prefix}
        </span>
      )}
      {display.split('').map((character, index) => {
        const previous = from[index]
        const changed = previous !== character
        return (
          <span
            key={`${generation}-${index}-${character}`}
            className={numberTickerDigitVariants()}
            data-slot="number-ticker-digit"
            data-changed={dataAttr(changed)}
          >
            <span
              className={changed ? numberTickerDigitValueVariants() : undefined}
              style={
                changed
                  ? {
                      animationDelay: `calc(var(--duration-stagger) * ${index})`,
                      ['--digit-from' as string]: direction === 'up' ? '100%' : '-100%',
                    }
                  : undefined
              }
            >
              {character}
            </span>
          </span>
        )
      })}
      {suffix != null && suffix !== '' && (
        <span className={numberTickerAffixVariants()} data-slot="number-ticker-suffix">
          {suffix}
        </span>
      )}
    </span>
  )
}

NumberTicker.displayName = 'NumberTicker'

export {
  numberTickerVariants,
  numberTickerDigitVariants,
  numberTickerDigitValueVariants,
  type NumberTickerSize,
}
export default NumberTicker
