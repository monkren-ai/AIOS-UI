import * as React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  walkieChannelButtonVariants,
  walkieChannelLabelVariants,
  walkieChannelNumberVariants,
  walkieChannelVariants,
  walkiePttAreaVariants,
  walkiePttVariants,
  walkiePulseVariants,
  walkieStatusVariants,
  walkieTalkieVariants,
  walkieVolumeLabelVariants,
  walkieVolumeSegmentVariants,
  walkieVolumeVariants,
  type WalkieStatus,
} from './walkie-talkie-variants'
import './WalkieTalkie.css'

export type WalkieState = 'READY' | 'TRANSMITTING' | 'SENT'

export type { WalkieStatus }

export interface WalkieTalkieProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
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

/** 三圈涟漪，相位依次错开 0.4s。 */
const PULSE_RINGS = [0, 1, 2] as const

export function WalkieTalkie({
  className,
  channel: initialChannel = 1,
  minChannel = 1,
  maxChannel = 22,
  volumeSegments = 5,
  volumeLevel = 3,
  status: statusProp,
  style,
  ...props
}: WalkieTalkieProps) {
  const [channel, setChannel] = useState(initialChannel)
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [status, setStatus] = useState<WalkieState>('READY')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const sentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const derivedStatus: WalkieStatus =
    statusProp ??
    (status === 'TRANSMITTING' ? 'transmitting' : status === 'SENT' ? 'sent' : 'ready')

  const handleChannelChange = useCallback(
    (delta: number) => {
      setChannel((prev) => {
        let next = prev + delta
        if (next > maxChannel) next = minChannel
        if (next < minChannel) next = maxChannel
        return next
      })
    },
    [minChannel, maxChannel],
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

  return (
    <div
      className={cn(walkieTalkieVariants({ status: derivedStatus }), className)}
      style={style}
      data-slot="walkie-talkie"
      data-status={dataAttr(derivedStatus)}
      data-channel={dataAttr(channel)}
      data-transmitting={dataAttr(isTransmitting)}
      {...props}
    >
      <div data-slot="walkie-talkie-channel" className={walkieChannelVariants()}>
        <button
          data-slot="walkie-talkie-channel-down"
          className={walkieChannelButtonVariants()}
          onClick={() => handleChannelChange(-1)}
          aria-label="Previous channel"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <span data-slot="walkie-talkie-channel-label" className={walkieChannelLabelVariants()}>
          CHANNEL
        </span>
        <span data-slot="walkie-talkie-channel-number" className={walkieChannelNumberVariants()}>
          {String(channel).padStart(2, '0')}
        </span>
        <button
          data-slot="walkie-talkie-channel-up"
          className={walkieChannelButtonVariants()}
          onClick={() => handleChannelChange(1)}
          aria-label="Next channel"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="6 15 12 9 18 15" />
          </svg>
        </button>
      </div>

      <div
        data-slot="walkie-talkie-ptt-area"
        className={walkiePttAreaVariants()}
        data-transmitting={dataAttr(isTransmitting)}
      >
        {PULSE_RINGS.map((index) => (
          <div
            key={index}
            data-slot="walkie-talkie-pulse"
            aria-hidden="true"
            className={walkiePulseVariants({ transmitting: isTransmitting, index })}
          />
        ))}
        <button
          data-slot="walkie-talkie-ptt"
          className={walkiePttVariants({ active: isTransmitting })}
          data-active={dataAttr(isTransmitting)}
          aria-label="Push to talk"
          onMouseDown={handlePttDown}
          onTouchStart={handlePttDown}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </div>

      <div
        data-slot="walkie-talkie-status"
        className={walkieStatusVariants({ status: derivedStatus })}
      >
        [{STATUS_LABELS[derivedStatus]}]
      </div>

      <div data-slot="walkie-talkie-volume" className={walkieVolumeVariants()}>
        {Array.from({ length: volumeSegments }).map((_, i) => (
          <div
            key={i}
            data-slot="walkie-talkie-volume-segment"
            data-filled={dataAttr(i < volumeLevel)}
            className={walkieVolumeSegmentVariants({ filled: i < volumeLevel })}
            style={{ height: `${segmentHeights[i] || 20}px` }}
          />
        ))}
      </div>
      <div data-slot="walkie-talkie-volume-label" className={walkieVolumeLabelVariants()}>
        VOL
      </div>
    </div>
  )
}

WalkieTalkie.displayName = 'WalkieTalkie'

export { walkieTalkieVariants }
export default WalkieTalkie
