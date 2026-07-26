import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { cva } from 'class-variance-authority'
import { AnimatePresence } from 'motion/react'
import '@/styles/nullframe.css'
import { bus } from '@/system/telemetry'
import { CtlCtx, type Ctl } from '@/system/hooks'
import { NfCard } from './NfCard'
import { CommandPalette } from './CommandPalette'
import {
  ActivityBody,
  BatteryBody,
  ClockHeroBody,
  ContributionsBody,
  GlyphBody,
  MemoryBody,
  NetworkBody,
  RenderBody,
  SeismoBody,
  StreakBody,
} from './bodies'
import { cn, dataAttr } from '@/lib/utils'

const nullframeDashboardVariants = cva('', {
  variants: {
    focus: {
      true: 'nothing-focus--on',
      false: 'nothing-focus--off',
    },
    motion: {
      on: 'nothing-motion--on',
      off: 'nothing-motion--off',
    },
  },
  defaultVariants: { focus: false, motion: 'on' },
})

export interface NullframeDashboardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode
}

export const NullframeDashboard = React.forwardRef<HTMLDivElement, NullframeDashboardProps>(
  ({ className, ...props }, ref) => {
    const [focus, setFocus] = useState(false)
    const [motionOff, setMotionOff] = useState(false)
    const [autoSweep, setAutoSweepState] = useState(true)
    const [paletteOpen, setPaletteOpen] = useState(false)

    useEffect(() => {
      bus.start()
      return () => bus.stop()
    }, [])

    useEffect(() => {
      const h = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault()
          setPaletteOpen(o => !o)
        }
      }
      window.addEventListener('keydown', h)
      return () => window.removeEventListener('keydown', h)
    }, [])

    const ctl: Ctl = useMemo(
      () => ({
        focus,
        setFocus,
        motionOff,
        setMotionOff,
        autoSweep,
        setAutoSweep: (v: boolean) => {
          setAutoSweepState(v)
          bus.setAutoSweep(v)
        },
        paletteOpen,
        setPaletteOpen,
      }),
      [focus, motionOff, autoSweep, paletteOpen],
    )

    return (
      <CtlCtx.Provider value={ctl}>
        <div
          ref={ref}
          className={cn(
            'nullframe-dashboard',
            nullframeDashboardVariants({ focus, motion: motionOff ? 'off' : 'on' }),
            className,
          )}
          data-focus={dataAttr(focus)}
          data-motion={dataAttr(motionOff ? 'off' : 'on')}
          data-palette={dataAttr(paletteOpen ? 'open' : 'closed')}
          data-auto-sweep={dataAttr(autoSweep)}
          {...props}
        >
          <main className={cn('bento', focus && 'focus', motionOff && 'nofx')}>
            <NfCard index={0} label="Clock · Hero" tag="LIVE" body={<ClockHeroBody />} />
            <NfCard index={1} label="Render" tag="LIVE" body={<RenderBody />} />
            <NfCard index={2} label="Memory" tag="LIVE" body={<MemoryBody />} />
            <NfCard index={3} label="Glyph" tag="LIVE" body={<GlyphBody />} />
            <NfCard index={4} label="Battery" tag="LIVE" tagAlways body={<BatteryBody />} />
            <NfCard index={5} label="Network" tag="LIVE" body={<NetworkBody />} />
            <NfCard index={6} label={`Contributions`} tag="SIM" body={<ContributionsBody />} />
            <NfCard index={7} label="Streak" tag="SIM" body={<StreakBody />} />
            <NfCard index={8} label="Seismo" tag="LIVE" body={<SeismoBody />} />
            <NfCard index={9} label={`Activity`} tag="LIVE" body={<ActivityBody />} />
          </main>
          <AnimatePresence>{paletteOpen && <CommandPalette />}</AnimatePresence>
        </div>
      </CtlCtx.Provider>
    )
  }
)
NullframeDashboard.displayName = 'NullframeDashboard'

export { nullframeDashboardVariants }
export default NullframeDashboard
