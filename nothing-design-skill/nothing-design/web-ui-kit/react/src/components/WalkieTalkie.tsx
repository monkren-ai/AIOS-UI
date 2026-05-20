import { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/walkie-talkie.css'

interface WalkieTalkieProps {
  channel?: number
  minChannel?: number
  maxChannel?: number
  volumeSegments?: number
  volumeLevel?: number
}

const WalkieTalkie: React.FC<WalkieTalkieProps> = ({
  channel: initialChannel = 1,
  minChannel = 1,
  maxChannel = 22,
  volumeSegments = 5,
  volumeLevel = 3
}) => {
  const [channel, setChannel] = useState(initialChannel)
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [status, setStatus] = useState<'READY' | 'TRANSMITTING' | 'SENT'>('READY')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const sentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChannelChange = useCallback((delta: number) => {
    setChannel(prev => {
      let next = prev + delta
      if (next > maxChannel) next = minChannel
      if (next < minChannel) next = maxChannel
      return next
    })
  }, [minChannel, maxChannel])

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
      audioStreamRef.current.getTracks().forEach(t => t.stop())
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
        audioStreamRef.current.getTracks().forEach(t => t.stop())
      }
    }
  }, [])

  const handlePttDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    startTransmitting()
  }

  useEffect(() => {
    const onMouseUp = () => { if (isTransmitting) stopTransmitting() }
    const onTouchEnd = () => { if (isTransmitting) stopTransmitting() }
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchend', onTouchEnd)
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [isTransmitting, stopTransmitting])

  const segmentHeights = [8, 14, 20, 26, 32]

  let statusClass = ''
  if (status === 'TRANSMITTING') statusClass = 'transmitting'
  if (status === 'SENT') statusClass = 'sent'

  return (
    <div className="nothing-walkie-talkie">
      <div className="walkie-channel">
        <button className="walkie-channel__btn" onClick={() => handleChannelChange(-1)}>
          <svg viewBox="0 0 24 24"><polyline className="walkie-channel__btn-icon" points="6 9 12 15 18 9"/></svg>
        </button>
        <span className="walkie-channel__label">CHANNEL</span>
        <span className="walkie-channel__number">{String(channel).padStart(2, '0')}</span>
        <button className="walkie-channel__btn" onClick={() => handleChannelChange(1)}>
          <svg viewBox="0 0 24 24"><polyline className="walkie-channel__btn-icon" points="6 15 12 9 18 15"/></svg>
        </button>
      </div>

      <div className={`walkie-ptt-area${isTransmitting ? ' transmitting' : ''}`}>
        <div className="walkie-pulse" />
        <div className="walkie-pulse" />
        <div className="walkie-pulse" />
        <button
          className={`walkie-ptt${isTransmitting ? ' active' : ''}`}
          onMouseDown={handlePttDown}
          onTouchStart={handlePttDown}
        >
          <svg className="walkie-ptt__icon" viewBox="0 0 24 24">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
      </div>

      <div className={`walkie-status ${statusClass}`}>[{status}]</div>

      <div className="walkie-volume">
        {Array.from({ length: volumeSegments }).map((_, i) => (
          <div
            key={i}
            className={`walkie-volume__segment${i < volumeLevel ? ' filled' : ''}`}
            style={{ height: `${segmentHeights[i] || 20}px` }}
          />
        ))}
      </div>
      <div className="walkie-volume__label">VOL</div>
    </div>
  )
}

export default WalkieTalkie
