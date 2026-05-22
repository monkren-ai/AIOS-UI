import { useState, useEffect } from 'react'
import '../styles/music-player.css'

interface Track {
  title: string
  artist: string
  duration: number
}

interface BlinkingSeparatorProps {
  active?: boolean
  speed?: number
  className?: string
}

export const BlinkingSeparator: React.FC<BlinkingSeparatorProps> = ({
  active = true,
  speed = 1000,
  className
}) => {
  return (
    <span
      className={[
        'nothing-blinking-separator',
        active ? 'nothing-blinking-separator--active' : '',
        className || ''
      ].filter(Boolean).join(' ')}
      style={active ? { animationDuration: `${speed}ms` } : undefined}
      aria-hidden="true"
    />
  )
}

interface MusicPlayerProps {
  totalSegments?: number
  updateInterval?: number
  tracks?: Track[]
  variant?: 'default' | 'compact'
  showRecordingIndicator?: boolean
  sourceIcon?: React.ReactNode
  style?: React.CSSProperties
}

const defaultTracks: Track[] = [
  { title: 'Digital Silence', artist: 'Void Ensemble', duration: 245 },
  { title: 'Neon Streets', artist: 'Circuit Rhythm', duration: 198 },
  { title: 'Binary Dreams', artist: 'Pixel Noise', duration: 312 }
]

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  totalSegments = 20,
  updateInterval = 1000,
  tracks: tracksProp,
  variant = 'default',
  showRecordingIndicator = false,
  sourceIcon,
  style
}) => {
  const safeTracks = tracksProp && tracksProp.length > 0 ? tracksProp : defaultTracks
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const currentTrack = safeTracks[currentTrackIndex]
  const percent = (currentTime / currentTrack.duration) * 100
  const filledSegments = Math.round((percent / 100) * totalSegments)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            setCurrentTrackIndex(p => (p + 1) % safeTracks.length)
            return 0
          }
          return prev + 1
        })
      }, updateInterval)
    }

    return () => clearInterval(timer)
  }, [isPlaying, currentTrackIndex, updateInterval, currentTrack.duration, safeTracks.length])

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrev = () => {
    setCurrentTrackIndex(prev => (prev - 1 + safeTracks.length) % safeTracks.length)
    setCurrentTime(0)
  }

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev + 1) % safeTracks.length)
    setCurrentTime(0)
  }

  if (variant === 'compact') {
    return (
      <div
        className={[
          'nothing-music-player',
          'nothing-music-player--compact'
        ].join(' ')}
        style={style}
      >
        <div className="nothing-music-player__compact-top">
          <div className="nothing-music-player__compact-album">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                className="nothing-music-player__compact-album-icon"
                d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {sourceIcon && (
            <div className="nothing-music-player__compact-source">
              {sourceIcon}
            </div>
          )}
        </div>

        <div className="nothing-music-player__compact-info">
          <span className="nothing-music-player__compact-info-text">
            {currentTrack.artist} - {currentTrack.title}
          </span>
          {showRecordingIndicator && (
            <BlinkingSeparator active={isPlaying} />
          )}
        </div>

        <div
          className="nothing-music-player__compact-progress"
          role="progressbar"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Playback progress: ${formatTime(currentTime)} of ${formatTime(currentTrack.duration)}`}
        >
          <div
            className="nothing-music-player__compact-progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="nothing-music-player" style={style}>
      <div className="player-album-art">
        <svg viewBox="0 0 24 24" fill="none">
          <circle className="player-album-icon" cx="12" cy="12" r="10" strokeWidth="2"/>
          <circle className="player-album-icon" cx="12" cy="12" r="3" strokeWidth="2"/>
        </svg>
      </div>

      <div className="player-info">
        <div className="player-title">{currentTrack.title}</div>
        <div className="player-artist">{currentTrack.artist}</div>
        {showRecordingIndicator && (
          <div className="player-recording-indicator">
            <BlinkingSeparator active={isPlaying} />
          </div>
        )}
      </div>

      <div className="player-progress">
        <div className="player-progress-bar">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={`player-progress-segment ${index < filledSegments ? 'filled' : ''}`}
            />
          ))}
        </div>
        <div className="player-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <button className="player-btn" onClick={handlePrev} aria-label="Previous track">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path className="player-btn-icon" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="player-btn primary" onClick={handleTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {isPlaying ? (
              <path className="player-btn-icon" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path className="player-btn-icon" d="M8 5v14l11-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
        <button className="player-btn" onClick={handleNext} aria-label="Next track">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path className="player-btn-icon" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MusicPlayer
