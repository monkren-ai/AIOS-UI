import * as React from 'react'
import { useEffect, useRef } from 'react'
import { NfCard } from './NfCard'
import { bus } from '../../system/telemetry'
import { useTelemetry, useBootNumber } from '../../system/hooks'
import { cn, dataAttr } from '../../lib/utils'

export interface SeismoCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  index: number
}

export const SeismoCard = React.forwardRef<HTMLElement, SeismoCardProps>(
  ({ className, index, ...props }, ref) => {
    const snap = useTelemetry()
    const shown = useBootNumber(snap.inputRate)
    const refLocal = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const cv = refLocal.current
      const ctx = cv?.getContext('2d')
      if (!cv || !ctx) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      let w = 0
      let h = 0
      const ro = new ResizeObserver(() => {
        w = cv.clientWidth
        h = cv.clientHeight
        cv.width = Math.max(1, Math.round(w * dpr))
        cv.height = Math.max(1, Math.round(h * dpr))
      })
      ro.observe(cv)
      let vis = true
      const io = new IntersectionObserver((en) => {
        vis = en[0]?.isIntersecting ?? true
      })
      io.observe(cv)

      const N = 300
      const buf = new Float32Array(N)
      let head = 0
      let acc = 0
      const offDraw = bus.draw((t, dt) => {
        if (!vis || !w || !h) return
        acc += dt
        if (acc < 0.033) return
        acc = 0
        buf[head] = Math.min(1, Math.pow(bus.get().velocity / 1800, 0.7))
        head = (head + 1) % N
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, w, h)
        const base = h * 0.8
        const amp = h * 0.68
        ctx.beginPath()
        for (let i = 0; i < N; i++) {
          const v = buf[(head + i) % N] + Math.sin(t * 2.2 + i * 0.55) * 0.012
          const x = (i / (N - 1)) * (w - 8)
          const y = base - v * amp
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = '#cfcfcf'
        ctx.lineWidth = 1.4
        ctx.stroke()
        ctx.fillStyle = '#f26522'
        ctx.fillRect(w - 4, h * 0.06, 2, h * 0.88)
      })
      return () => {
        offDraw()
        ro.disconnect()
        io.disconnect()
      }
    }, [])

    return (
      <NfCard
        ref={ref}
        className={cn('seismo', className)}
        index={index}
        label="Input seismograph · CH 01"
        right={
          <span className="rec">
            <span className="led red" />
            REC
          </span>
        }
        data-rate={dataAttr(snap.inputRate)}
        {...props}
      >
        <div className="bpm">
          <span className="doto-mid">{shown}</span>
          <span className="mono-sub">EVT/MIN · pointer + keys</span>
        </div>
        <div className="canvas-fill" style={{ marginTop: 6 }}>
          <canvas ref={refLocal} />
        </div>
      </NfCard>
    )
  }
)
SeismoCard.displayName = 'SeismoCard'

export default SeismoCard
