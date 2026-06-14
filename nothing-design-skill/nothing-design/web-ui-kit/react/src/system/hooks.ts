import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { animate } from 'motion/react'
import { bus, type Snapshot } from './telemetry'

export function useTelemetry(): Snapshot {
  return useSyncExternalStore(bus.subscribe, bus.get)
}

export function useBootNumber(live: number, dec = 0, duration = 0.9): string {
  const [p, setP] = useState(0)
  useEffect(() => {
    const c = animate(0, 1, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setP })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (live * p).toFixed(dec)
}

/**
 * 每 N 毫秒触发一次状态更新，返回当前 Date。
 * 文档可见性自动暂停（标签页隐藏时不浪费 tick）。
 *
 * 用于 Clock / WorldClock / TimeWidget / AnalogClockWidget / ClockHero 等时间显示。
 */
export function useNow(intervalMs = 1000): Date {
  const [now, setNow] = useState<Date>(() => new Date())
  useEffect(() => {
    let alive = true
    let id: number | null = null
    const tick = () => {
      if (!alive) return
      setNow(new Date())
      id = window.setTimeout(tick, intervalMs)
    }
    tick()
    return () => {
      alive = false
      if (id !== null) clearTimeout(id)
    }
  }, [intervalMs])
  return now
}

export interface TypedTextOptions {
  messages: string[]
  typeMs?: number
  holdMs?: number
  eraseMs?: number
}

export interface TypedTextResult {
  current: string
  isErasing: boolean
}

/**
 * 打字机循环：输入 → 停留 → 擦除 → 下一条。
 * 文档可见性自动暂停。
 *
 * 用于 ActivityCard commit feed / ClockHero TypedStatus。
 */
export function useTypedText(opts: TypedTextOptions): TypedTextResult {
  const { messages, typeMs = 60, holdMs = 1400, eraseMs = 30 } = opts
  const msgRef = useRef(messages)
  msgRef.current = messages

  const [idx, setIdx] = useState(0)
  const idxRef = useRef(idx)
  idxRef.current = idx
  const [len, setLen] = useState(0)
  const [erasing, setErasing] = useState(false)
  const erasingRef = useRef(erasing)
  erasingRef.current = erasing
  const lenRef = useRef(len)
  lenRef.current = len

  useEffect(() => {
    const msgs = msgRef.current
    if (msgs.length === 0) return
    let alive = true
    let id: number | null = null

    const step = () => {
      if (!alive) return
      if (document.hidden) {
        id = window.setTimeout(step, 4000)
        return
      }
      const msg = msgs[idxRef.current % msgs.length]
      if (!erasingRef.current) {
        if (lenRef.current < msg.length) {
          setLen((n) => n + 1)
          id = window.setTimeout(step, typeMs)
        } else {
          id = window.setTimeout(() => {
            if (!alive) return
            setErasing(true)
            step()
          }, holdMs)
        }
      } else {
        if (lenRef.current > 0) {
          setLen((n) => n - 1)
          id = window.setTimeout(step, eraseMs)
        } else {
          setErasing(false)
          setIdx((i) => (i + 1) % msgs.length)
        }
      }
    }
    step()
    return () => {
      alive = false
      if (id !== null) clearTimeout(id)
    }
  }, [typeMs, holdMs, eraseMs])

  const current = messages.length === 0 ? '' : messages[idx % messages.length].slice(0, len)
  return { current, isErasing: erasing }
}

export type Ctl = {
  focus: boolean
  setFocus: (v: boolean) => void
  motionOff: boolean
  setMotionOff: (v: boolean) => void
  autoSweep: boolean
  setAutoSweep: (v: boolean) => void
  paletteOpen: boolean
  setPaletteOpen: (v: boolean) => void
}

export const CtlCtx = createContext<Ctl | null>(null)
export function useCtl(): Ctl {
  const ctx = useContext(CtlCtx)
  if (!ctx) throw new Error('useCtl must be used within CtlCtx.Provider')
  return ctx
}
