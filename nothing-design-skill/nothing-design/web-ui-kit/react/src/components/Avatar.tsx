import { useState } from 'react'
import '../styles/avatar.css'

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  fallback,
  size = 'md',
  style
}) => {
  const [imageError, setImageError] = useState(false)

  const classNames = [
    'nothing-avatar',
    `nothing-avatar--${size}`
  ].filter(Boolean).join(' ')

  const showImage = src && !imageError

  return (
    <div className={classNames} style={style}>
      {showImage ? (
        <img
          className="nothing-avatar__image"
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="nothing-avatar__fallback" aria-label={alt || fallback}>
          {fallback || ''}
        </span>
      )}
    </div>
  )
}

export default Avatar
