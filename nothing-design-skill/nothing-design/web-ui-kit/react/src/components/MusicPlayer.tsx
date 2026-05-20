import { useState, useEffect } from 'react'
import '../styles/music-player.css'

interface Track {
  title: string
  artist: string
  duration: number
}

interface MusicPlayerProps {
  totalSegments?: number
  updateInterval?: number
  tracks?: Track[]
}

const defaultTracks: Track[] = [
  { title: 'Digital Silence', artist: 'Void Ensemble', duration: 245 },
  { title: 'Neon Streets', artist: 'Circuit Rhythm', duration: 198 },
  { title: 'Binary Dreams', artist: 'Pixel Noise', duration: 312 }
]

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  totalSegments = 20, 
  updateInterval = 1000,
  tracks = defaultTracks
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const currentTrack = tracks[currentTrackIndex]
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
            handleNext()
            return 0
          }
          return prev + 1
        })
      }, updateInterval)
    }

    return () => clearInterval(timer)
  }, [isPlaying, currentTrackIndex, updateInterval, currentTrack.duration])

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrev = () => {
    setCurrentTrackIndex(prev => (prev - 1 + tracks.length) % tracks.length)
    setCurrentTime(0)
  }

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev + 1) % tracks.length)
    setCurrentTime(0)
  }

  return (
    <div className="nothing-music-player">
      <div className="player-album-art">
        <svg viewBox="0 0 24 24" fill="none">
          <circle className="player-album-icon" cx="12" cy="12" r="10" strokeWidth="2"/>
          <circle className="player-album-icon" cx="12" cy="12" r="3" strokeWidth="2"/>
        </svg>
      </div>
      
      <div className="player-info">
        <div className="player-title">{currentTrack.title}</div>
        <div className="player-artist">{currentTrack.artist}</div>
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
