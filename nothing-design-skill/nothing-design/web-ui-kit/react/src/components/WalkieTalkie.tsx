import * as React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/walkie-talkie.css'

export type WalkieState = 'READY' | 'TRANSMITTING' | 'SENT'

export type WalkieStatus = 'ready' | 'transmitting' | 'sent'

const walkieTalkieVariants = cva('nothing-walkie-talkie', {
  variants: {
    status: {
      ready: 'nothing-walkie-talkie--ready',
      transmitting: 'nothing-walkie-talkie--transmitting',
      sent: 'nothing-walkie-talkie--sent',
    },
  },
  defaultVariants: { status: 'ready' },
})

export interface WalkieTalkieProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof walkieTalkieVariants>, 'status'> {
  channel?: number
  minChannel?: number
  maxChannel?: number
  volumeSegments?: number
  volumeLevel?: number
  status?: WalkieStatus
}

const STATUS_LABELS: Record<WalkieStatus, WalkieState> = {
  ready: 'READY',
  transmitting: 'TRANSMITTING',
  sent: 'SENT',
}

export const WalkieTalkie = React.forwardRef<HTMLDivElement, WalkieTalkieProps>(
  (
    {
      className,
      channel: initialChannel = 1,
      minChannel = 1,
      maxChannel = 22,
      volumeSegments = 5,
      volumeLevel = 3,
      status: statusProp,
      style,
      ...props
    },
    ref
  ) => {
    const [channel, setChannel] = useState(initialChannel)
    const [isTransmitting, setIsTransmitting] = useState(false)
    const [status, setStatus] = useState<WalkieState>('READY')
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioStreamRef = useRef<MediaStream | null>(null)
    const sentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const derivedStatus: WalkieStatus = statusProp ?? (status === 'TRANSMITTING' ? 'transmitting' : status === 'SENT' ? 'sent' : 'ready')

    const handleChannelChange = useCallback(
      (delta: number) => {
        setChannel((prev) => {
          let next = prev + delta
          if (next > maxChannel) next = minChannel
          if (next < minChannel) next = maxChannel
          return next
        })
      },
      [minChannel, maxChannel]
    )

    const startTransmitting = useCallback(async () => {
      if (isTransmitting) return
      setIsTransmitting(true)
      setStatus('TRANSMITTING')

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        audioStreamRef.current = stream
        const recorder = new MediaRecorder(stream)
        mediaRecorderRef.current = recorder
        recorder.start()
      } catch {
        // Web Audio not supported or permission denied - UI only
      }
    }, [isTransmitting])

    const stopTransmitting = useCallback(() => {
      setIsTransmitting(false)

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((t) => t.stop())
        audioStreamRef.current = null
      }
      mediaRecorderRef.current = null

      setStatus('SENT')
      if (sentTimeoutRef.current) clearTimeout(sentTimeoutRef.current)
      sentTimeoutRef.current = setTimeout(() => {
        setStatus('READY')
      }, 2000)
    }, [])

    useEffect(() => {
      return () => {
        if (sentTimeoutRef.current) clearTimeout(sentTimeoutRef.current)
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop()
        }
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((t) => t.stop())
        }
      }
    }, [])

    const handlePttDown = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      startTransmitting()
    }

    useEffect(() => {
      const onMouseUp = () => {
        if (isTransmitting) stopTransmitting()
      }
      const onTouchEnd = () => {
        if (isTransmitting) stopTransmitting()
      }
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('touchend', onTouchEnd)
      return () => {
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('touchend', onTouchEnd)
      }
    }, [isTransmitting, stopTransmitting])

    const segmentHeights = [8, 14, 20, 26, 32]

    const statusClass = cn(
      derivedStatus === 'transmitting' && 'transmitting',
      derivedStatus === 'sent' && 'sent'
    )

    return (
      <div
        ref={ref}
        className={cn(walkieTalkieVariants({ status: derivedStatus }), className)}
        style={style}
        data-status={dataAttr(derivedStatus)}
        data-channel={dataAttr(channel)}
        {...props}
      >
        <div className="walkie-channel">
          <button className="walkie-channel__btn" onClick={() => handleChannelChange(-1)}>
            <svg viewBox="0 0 24 24">
              <polyline className="walkie-channel__btn-icon" points="6 9 12 15 18 9" />
            </svg>
          </button>
          <span className="walkie-channel__label">CHANNEL</span>
          <span className="walkie-channel__number">{String(channel).padStart(2, '0')}</span>
          <button className="walkie-channel__btn" onClick={() => handleChannelChange(1)}>
            <svg viewBox="0 0 24 24">
              <polyline className="walkie-channel__btn-icon" points="6 15 12 9 18 15" />
            </svg>
          </button>
        </div>

        <div className={cn('walkie-ptt-area', isTransmitting && 'transmitting')}>
          <div className="walkie-pulse" />
          <div className="walkie-pulse" />
          <div className="walkie-pulse" />
          <button
            className={cn('walkie-ptt', isTransmitting && 'active')}
            onMouseDown={handlePttDown}
            onTouchStart={handlePttDown}
          >
            <svg className="walkie-ptt__icon" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        </div>

        <div className={cn('walkie-status', statusClass)}>[{STATUS_LABELS[derivedStatus]}]</div>

        <div className="walkie-volume">
          {Array.from({ length: volumeSegments }).map((_, i) => (
            <div
              key={i}
              className={cn('walkie-volume__segment', i < volumeLevel && 'filled')}
              style={{ height: `${segmentHeights[i] || 20}px` }}
            />
          ))}
        </div>
        <div className="walkie-volume__label">VOL</div>
      </div>
    )
  }
)
WalkieTalkie.displayName = 'WalkieTalkie'

export { walkieTalkieVariants }
export default WalkieTalkie
