import * as React from 'react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { cva } from 'class-variance-authority'
import { bus } from '@/system/telemetry'
import { useCtl } from '@/system/hooks'
import { useMotionComponent } from '@/MotionProvider'
import { cn, dataAttr } from '@/lib/utils'

const commandPaletteVariants = cva('', {
  variants: {
    state: {
      open: 'nothing-palette--open',
      closed: 'nothing-palette--closed',
    },
  },
  defaultVariants: { state: 'open' },
})

export type CommandPaletteProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>

export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({ className, ...props }, ref) => {
    const ctl = useCtl()
    const motionModule = useMotionComponent()
    const [q, setQ] = useState('')
    const [sel, setSel] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const cmds = useMemo(
      () => [
        { label: `Focus mode · ${ctl.focus ? 'off' : 'on'}`, run: () => ctl.setFocus(!ctl.focus) },
        { label: 'Trigger sync sweep', run: () => bus.sync() },
        { label: 'Reroll clock', run: () => bus.reroll() },
        { label: `Motion FX · ${ctl.motionOff ? 'on' : 'off'}`, run: () => ctl.setMotionOff(!ctl.motionOff) },
        { label: `Auto sweep · ${ctl.autoSweep ? 'off' : 'on'}`, run: () => ctl.setAutoSweep(!ctl.autoSweep) },
      ],
      [ctl],
    )
    const list = cmds.filter(c => c.label.toLowerCase().includes(q.toLowerCase()))

    useEffect(() => inputRef.current?.focus(), [])
    useEffect(() => setSel(0), [q])

    const close = () => ctl.setPaletteOpen(false)

    function onKey(e: KeyboardEvent<HTMLDivElement>) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSel(s => Math.min(list.length - 1, s + 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSel(s => Math.max(0, s - 1))
      } else if (e.key === 'Enter' && list[sel]) {
        list[sel].run()
        close()
      }
    }

    const MotionDiv = motionModule.div as React.FC<Record<string, unknown>>

    return (
      <MotionDiv
        ref={ref}
        className={cn('pal-overlay', commandPaletteVariants({ state: 'open' }), className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={close}
        data-state={dataAttr('open')}
        data-query={dataAttr(q)}
        data-selected={dataAttr(sel)}
        {...props}
      >
        <MotionDiv
          className="pal"
          initial={{ opacity: 0, y: -14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          onKeyDown={onKey}
          role="combobox"
          aria-expanded={true}
          aria-haspopup="listbox"
          tabIndex={-1}
        >
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="RUN COMMAND…"
            spellCheck={false}
            aria-label="Run command"
          />
          {list.length === 0 && <div className="pal-empty">NO MATCH</div>}
          {list.map((c, i) => (
            <div
              key={c.label}
              className={cn('pal-row', i === sel && 'sel')}
              data-selected={dataAttr(i === sel)}
              onMouseEnter={() => setSel(i)}
              onClick={() => {
                c.run()
                close()
              }}
              role="option"
              aria-selected={i === sel}
            >
              <span>{c.label}</span>
              <span className="dim">↵</span>
            </div>
          ))}
        </MotionDiv>
      </MotionDiv>
    )
  }
)
CommandPalette.displayName = 'CommandPalette'

export { commandPaletteVariants }
export default CommandPalette
