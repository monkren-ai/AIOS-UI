import * as React from 'react'
import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { bus } from '@/system/telemetry'
import { useCtl } from '@/system/hooks'
import { cn, dataAttr } from '@/lib/utils'

export type NfTag = 'LIVE' | 'SIM' | 'none'

const nfCardVariants = cva('card', {
  variants: {
    essential: {
      true: 'essential',
      false: 'dimmable',
    },
    sweep: {
      true: 'sweep',
      false: '',
    },
    tag: {
      LIVE: 'tag-live',
      SIM: 'tag-sim',
      none: '',
    },
  },
  defaultVariants: { essential: false, sweep: false, tag: 'none' },
})

export interface NfCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>,
    Omit<VariantProps<typeof nfCardVariants>, 'essential' | 'sweep' | 'tag'> {
  index: number
  label: string
  right?: ReactNode
  tag?: 'LIVE' | 'SIM'
  tagAlways?: boolean
  essential?: boolean
  sweep?: boolean
  /**
   * Custom body content. If omitted, falls back to `children` for backward compat.
   * 推荐用法: <NfCard body={<ActivityBody />} /> (从 ./bodies 导入)
   */
  body?: ReactNode
  children?: ReactNode
}

export const NfCard = React.forwardRef<HTMLElement, NfCardProps>(
  (
    {
      index,
      label,
      right,
      tag,
      tagAlways = false,
      className,
      essential = false,
      sweep: sweepProp,
      body,
      children,
      ...props
    },
    ref
  ) => {
    const [sweepState, setSweep] = useState(false)
    const ctl = useCtl()
    const reduced = (useReducedMotion() ?? false) || ctl.motionOff

    const sweep = sweepProp ?? sweepState

    useEffect(() => {
      if (sweepProp !== undefined) return
      let timer = 0
      const unsub = bus.on('sync', () => {
        timer = window.setTimeout(() => {
          setSweep(true)
          timer = window.setTimeout(() => setSweep(false), 1100)
        }, index * 70)
      })
      return () => {
        unsub()
        clearTimeout(timer)
      }
    }, [index, sweepProp])

    return (
      <motion.section
        ref={ref as React.Ref<HTMLElement>}
        className={cn(nfCardVariants({ essential, sweep, tag: tag ?? 'none' }), className)}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.93 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'tween', ease: [0.25, 0.1, 0.25, 1], duration: 0.3, delay: index * 0.07 }}
        data-state={dataAttr(sweep ? 'sweeping' : 'idle')}
        data-tag={dataAttr(tag)}
        data-essential={dataAttr(essential)}
        {...props}
      >
        <span className="shine" />
        {tag && <span className={cn('tag', tagAlways && 'always')}>{tag}</span>}
        <div className="meta-row">
          <span>{label}</span>
          {right && <span className="right">{right}</span>}
        </div>
        {body ?? children}
      </motion.section>
    )
  }
)
NfCard.displayName = 'NfCard'

export { nfCardVariants }
export default NfCard
