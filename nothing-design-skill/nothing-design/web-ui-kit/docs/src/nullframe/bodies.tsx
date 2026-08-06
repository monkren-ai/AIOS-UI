/**
 * Nullframe Card body components — 动态化版本 (Phase 1 of static-to-dynamic plan).
 *
 * 每个 body 组件只渲染卡片内部内容 (no NfCard wrap, no forwardRef, no state of its own).
 * 由 NullframeDashboard 通过 `<NfCard body={<ActivityBody />} />` 拼装。
 *
 * Data strategy:
 *  - 优先用 `useTelemetry()` (来自 system/bus) 真实硬件/网络数据.
 *  - 失败 / 不存在时回退到 useNow + 伪随机, 根元素加 `data-real="false"`.
 */
import * as React from 'react'
import { Segbar } from './Segbar'
import { useTelemetry, useBootNumber, useCtl, useNow, useTypedText } from '@/system/hooks'
import { pad2 } from '@/system/time'
import { bus } from '@/system/telemetry'
import {
  commitMessages,
  statusMessages,
  WEEKS,
  DAYS,
  totalContribs,
  streakDays,
  streakSince,
  bestStreak,
} from '@/system/fake'
import { glyphFrame, fbm1D, GLYPH_ANIMS, type GlyphAnim } from './animations'
import { useMotionComponent } from '@/MotionProvider'
import { cn, dataAttr } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

function stamp(d = new Date()) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

/** 简单 Mulberry32, seed 来自 current minute, 切换自然. */
function makeRng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ------------------------------------------------------------------ */
/* Activity — typed commit feed (已有, 增强 reroll 联动)                */
/* ------------------------------------------------------------------ */

type Line = { msg: string; time: string }

export function ActivityBody({ className, feed = true }: { className?: string; feed?: boolean }) {
  const [lines, setLines] = React.useState<Line[]>([])
  const [typing, setTyping] = React.useState('')
  const [active, setActive] = React.useState(false)
  const ctl = useCtl()
  const motionModule = useMotionComponent()
  const MotionDiv = motionModule.div as React.FC<Record<string, unknown>>

  React.useEffect(() => {
    let alive = true
    let t = 0
    let idx = 0
    const push = () => {
      if (!alive) return
      if (document.hidden) {
        t = window.setTimeout(push, 7000)
        return
      }
      const msg = commitMessages[idx % commitMessages.length]
      idx++
      const time = stamp()
      let i = 0
      setActive(true)
      const type = () => {
        if (!alive) return
        i++
        setTyping(msg.slice(0, i))
        if (i < msg.length) {
          t = window.setTimeout(type, 18)
        } else {
          setLines((ls) => [{ msg, time }, ...ls].slice(0, 3))
          setTyping('')
          setActive(false)
          t = window.setTimeout(push, 6500)
        }
      }
      type()
    }
    t = window.setTimeout(push, 1200)
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [])

  return (
    <div
      className={cn('feed-rows', className)}
      data-feed={dataAttr(feed)}
      data-active={dataAttr(active)}
      data-typing={dataAttr(typing ? 'typing' : 'idle')}
      data-ctl-motion={dataAttr(ctl.motionOff)}
    >
      {typing && (
        <div className="feed-row">
          <span>
            {typing}
            <span className="sq" />
          </span>
          <span className="dim">{stamp()}</span>
        </div>
      )}
      {lines.map((l, i) => (
        <MotionDiv
          key={l.time + l.msg}
          className="feed-row"
          style={{ opacity: 1 - i * 0.3 }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1 - i * 0.3, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span>{l.msg}</span>
          <span className="dim">{l.time}</span>
        </MotionDiv>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Battery — live percentage + Segbar (已有, 真实 telemetry)            */
/* ------------------------------------------------------------------ */

export function BatteryBody({ className }: { className?: string }) {
  const snap = useTelemetry()
  const real = snap.batteryReal
  const pct = Math.round((snap.battery?.level ?? 0.87) * 100)
  const charging = snap.battery?.charging ?? false
  const shown = useBootNumber(pct)
  const status: 'good' | 'warning' | 'overlimit' =
    pct <= 20 ? 'overlimit' : pct <= 40 ? 'warning' : 'good'
  return (
    <div
      className={cn('battery-body', className)}
      data-status={dataAttr(status)}
      data-charging={dataAttr(charging)}
      data-level={dataAttr(pct)}
      data-real={dataAttr(real)}
    >
      <div className="doto-val">
        {shown}
        <small>%</small>
      </div>
      <Segbar total={24} on={Math.round((pct / 100) * 24)} color="green" baseDelay={0.56} />
      <div className="mono-sub" style={{ marginTop: 12 }}>
        {charging ? 'ON AC POWER · CHARGING' : 'ON CELL · DISCHARGING'}
        {!real && ' [SIM]'}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Streak — animated number scramble (已有)                             */
/* ------------------------------------------------------------------ */

export function StreakBody({ className }: { className?: string }) {
  const ctl = useCtl()
  const shown = useBootNumber(streakDays)
  const [scramble, setScramble] = React.useState<string | null>(null)
  React.useEffect(() => {
    if (ctl.motionOff) return
    let iv = 0
    let n = 0
    const auto = window.setInterval(() => {
      if (document.hidden) return
      n = 0
      clearInterval(iv)
      iv = window.setInterval(() => {
        setScramble(`${((Math.random() * 9) | 0) + 1}${(Math.random() * 10) | 0}`)
        if (++n > 5) {
          clearInterval(iv)
          setScramble(null)
        }
      }, 45)
    }, 12000)
    return () => {
      clearInterval(auto)
      clearInterval(iv)
    }
  }, [ctl.motionOff])
  return (
    <div
      className={cn('streak-body', className)}
      data-state={dataAttr(scramble ? 'scrambling' : 'idle')}
    >
      <div className="doto-val">
        {scramble ?? shown}
        <small>D</small>
      </div>
      <div className="streakbar">
        {Array.from({ length: 7 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${0.6 + i * 0.05}s, ${0.8 + i * 0.3}s` }} />
        ))}
      </div>
      <div className="mono-sub" style={{ marginTop: 12 }}>
        Since {streakSince} · best {bestStreak}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Contributions — 52-week heatmap, click to reroll                    */
/* ------------------------------------------------------------------ */

export function ContributionsBody({ className }: { className?: string }) {
  const [tick, setTick] = React.useState(0)
  const ctl = useCtl()
  const cells = React.useMemo(() => {
    const rng = makeRng(Date.now() / 60000 + tick)
    const out: number[] = []
    for (let w = 0; w < WEEKS; w++) {
      const heat = 0.35 + 0.5 * Math.sin(((w + tick) / WEEKS) * Math.PI * 2.3 + 1) ** 2
      for (let d = 0; d < DAYS; d++) {
        const weekday = d >= 1 && d <= 5 ? 1 : 0.45
        const r = rng() * heat * weekday
        out.push(r > 0.42 ? 4 : r > 0.3 ? 3 : r > 0.19 ? 2 : r > 0.09 ? 1 : 0)
      }
    }
    return out
  }, [tick])

  return (
    <div
      className={cn('contributions-body', className)}
      data-real="false"
      data-ctl-motion={dataAttr(ctl.motionOff)}
      onClick={() => bus.reroll()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setTick((t) => t + 1)
        }
      }}
      title="Click to reroll"
    >
      <div className="contributions-grid">
        {cells.map((v, i) => (
          <i key={i} data-v={v} className="contributions-cell" />
        ))}
      </div>
      <div className="mono-sub" style={{ marginTop: 8 }}>
        {totalContribs} contribs this year · tap to reroll [SIM]
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Memory — live JS heap (telemetry)                                   */
/* ------------------------------------------------------------------ */

export function MemoryBody({ className }: { className?: string }) {
  const snap = useTelemetry()
  const real = snap.heapReal
  const mb = snap.heapMB
  const limit = snap.heapLimitMB || 4096
  const pct = Math.min(100, Math.round((mb / limit) * 100))
  const shown = useBootNumber(mb, 0)
  const usedSeg = Math.round((pct / 100) * 24)
  return (
    <div
      className={cn('memory-body', className)}
      data-real={dataAttr(real)}
      data-pct={dataAttr(pct)}
    >
      <div className="doto-val">
        {shown}
        <small>MB</small>
      </div>
      <Segbar total={24} on={usedSeg} color={real ? 'green' : 'orange'} baseDelay={0.4} />
      <div className="mono-sub" style={{ marginTop: 12 }}>
        {real ? 'JS HEAP · LIVE' : 'JS HEAP · SIM'} · {pct}% of {Math.round(limit)}MB
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Network — live navigator.connection (telemetry)                     */
/* ------------------------------------------------------------------ */

export function NetworkBody({ className }: { className?: string }) {
  const snap = useTelemetry()
  const real = snap.netReal
  const net = snap.net
  const shown = useBootNumber(net.downlink, 1)
  const status = snap.online ? 'online' : 'offline'
  const bars = Math.min(4, Math.max(0, Math.round(net.downlink / 2.5)))
  return (
    <div
      className={cn('network-body', className)}
      data-real={dataAttr(real)}
      data-status={dataAttr(status)}
      data-type={dataAttr(net.type)}
    >
      <div className="doto-val">
        {shown}
        <small>Mb/s</small>
      </div>
      <div className="network-bars" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <i key={i} data-on={dataAttr(i < bars)} />
        ))}
      </div>
      <div className="mono-sub" style={{ marginTop: 12 }}>
        {net.type.toUpperCase()} · {snap.online ? 'ONLINE' : 'OFFLINE'}
        {!real && ' [SIM]'}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Glyph — animated DotMatrix, 6 patterns                               */
/* ------------------------------------------------------------------ */

export function GlyphBody({ className }: { className?: string }) {
  const ctl = useCtl()
  const t = useNow(80) // 12.5Hz for smooth animation
  const [animIdx, setAnimIdx] = React.useState(0)
  const anim: GlyphAnim = GLYPH_ANIMS[animIdx]
  const phase = ctl.motionOff ? 0 : (t.getTime() % 4000) / 4000
  const dots = glyphFrame(anim, phase)

  // cycle animation every 8s
  React.useEffect(() => {
    if (ctl.motionOff) return
    const id = window.setInterval(() => {
      setAnimIdx((i) => (i + 1) % GLYPH_ANIMS.length)
    }, 8000)
    return () => clearInterval(id)
  }, [ctl.motionOff])

  return (
    <div
      className={cn('glyph-body', className)}
      data-real="false"
      data-anim={dataAttr(anim)}
      data-ctl-motion={dataAttr(ctl.motionOff)}
    >
      <div className="glyph-dots" aria-label={`Glyph animation: ${anim}`}>
        {Array.from({ length: 5 * 7 }, (_, i) => {
          const y = Math.floor(i / 7)
          const x = i % 7
          const on = dots.some(([dy, dx]) => dy === y && dx === x)
          return <i key={i} data-on={dataAttr(on)} />
        })}
      </div>
      <div className="mono-sub" style={{ marginTop: 12 }}>
        GLYPH · {anim.toUpperCase()} [SIM]
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Render — canvas FPS line graph                                       */
/* ------------------------------------------------------------------ */

export function RenderBody({ className }: { className?: string }) {
  const snap = useTelemetry()
  const ref = React.useRef<HTMLCanvasElement | null>(null)
  const buf = React.useRef<number[]>(Array(60).fill(60))
  const rafRef = React.useRef<number | null>(null)

  // Sample FPS into a ring buffer at 4Hz (bus publishes at 2Hz; we oversample to smooth)
  React.useEffect(() => {
    buf.current.push(snap.fps)
    if (buf.current.length > 60) buf.current.shift()
  }, [snap.fps])

  // rAF redraw of canvas
  React.useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return
    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = cvs.clientWidth
      const h = cvs.clientHeight
      if (cvs.width !== w * dpr) cvs.width = w * dpr
      if (cvs.height !== h * dpr) cvs.height = h * dpr
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, w, h)
      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 1
      for (let i = 1; i < 4; i++) {
        const y = (i / 4) * h
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      // line
      const max = 90
      ctx.strokeStyle = 'currentColor'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      buf.current.forEach((v, i) => {
        const x = (i / (buf.current.length - 1)) * w
        const y = h - (v / max) * h
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className={cn('render-body', className)} data-real="false">
      <canvas ref={ref} className="render-canvas" />
      <div className="mono-sub" style={{ marginTop: 8 }}>
        FPS · {Math.round(snap.fps)} · 60s window [SIM]
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Clock Hero — big HH:MM:SS + typed status                              */
/* ------------------------------------------------------------------ */

export function ClockHeroBody({ className }: { className?: string }) {
  const now = useNow(1000)
  const typed = useTypedText({ messages: statusMessages, typeMs: 55, holdMs: 2200, eraseMs: 22 })
  const hh = pad2(now.getHours())
  const mm = pad2(now.getMinutes())
  const ss = pad2(now.getSeconds())
  return (
    <div className={cn('clock-hero-body', className)} data-real="true">
      <div className="clock-hero-time">
        {hh}:{mm}
        <small>:{ss}</small>
      </div>
      <div className="clock-hero-status" data-typing={dataAttr(typed.isErasing ? 'erase' : 'type')}>
        {typed.current || '\u00a0'}
        <span className="sq" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Seismo — canvas noise waveform                                       */
/* ------------------------------------------------------------------ */

export function SeismoBody({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement | null>(null)
  const t0Ref = React.useRef(performance.now())
  const rafRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return
    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = cvs.clientWidth
      const h = cvs.clientHeight
      if (cvs.width !== w * dpr) cvs.width = w * dpr
      if (cvs.height !== h * dpr) cvs.height = h * dpr
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, w, h)
      const t = (performance.now() - t0Ref.current) / 1000

      // baseline
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.beginPath()
      ctx.moveTo(0, h / 2)
      ctx.lineTo(w, h / 2)
      ctx.stroke()

      // seismo line
      ctx.strokeStyle = 'currentColor'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      const step = 2
      for (let x = 0; x < w; x += step) {
        const u = x / w
        const v = fbm1D(u * 8 + t * 1.2, 4, 3) - 0.5
        // center spike every 3s
        const spike = Math.exp(-Math.pow(((t % 3) - 1.5) * 4, 2))
        const y = h / 2 + v * h * 0.4 + (Math.random() - 0.5) * 4 * spike
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className={cn('seismo-body', className)} data-real="false">
      <canvas ref={ref} className="seismo-canvas" />
      <div className="mono-sub" style={{ marginTop: 8 }}>
        SEISMO · 3.0Hz · 4 octaves [SIM]
      </div>
    </div>
  )
}
