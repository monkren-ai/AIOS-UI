import { useState } from 'react'
import { PhotoCarousel, type PhotoCarouselOrientation } from '@/PhotoCarousel'

const btn = {
  padding: '6px 14px',
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.15)',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 11,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
}

const label = {
  fontSize: 10,
  opacity: 0.4,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: 8,
}

const landscapeSlides = [
  { title: 'Solar Flare', subtitle: 'Chromosphere · H-alpha', gradient: 'linear-gradient(135deg, #ff5b1f 0%, #ffb627 100%)' },
  { title: 'Verdant', subtitle: 'Coastal pine · 04:21', gradient: 'linear-gradient(135deg, #0a3d2c 0%, #1ec27e 100%)' },
  { title: 'Glacial', subtitle: 'Polar · -12°C', gradient: 'linear-gradient(135deg, #0a1d3a 0%, #4a8bff 100%)' },
  { title: 'Ember', subtitle: 'Magma flow', gradient: 'linear-gradient(135deg, #6a0e2a 0%, #ff3066 100%)' },
  { title: 'Aurora', subtitle: 'Borealis · 66°N', gradient: 'linear-gradient(135deg, #1a0a3a 0%, #2ecc71 100%)' },
]

const portraitSlides = [
  { title: 'Monolith', subtitle: 'Desert · dusk', gradient: 'linear-gradient(180deg, #1a1a2e 0%, #e94560 100%)' },
  { title: 'Tide', subtitle: 'Bay · low', gradient: 'linear-gradient(180deg, #0f3460 0%, #16c79a 100%)' },
  { title: 'Summit', subtitle: '8,849 m', gradient: 'linear-gradient(180deg, #2c2c54 0%, #aaa6c3 100%)' },
]

export default function Demo() {
  const [orientation, setOrientation] = useState<PhotoCarouselOrientation>('horizontal')
  const [autoPlay, setAutoPlay] = useState(true)

  const slides = orientation === 'horizontal' ? landscapeSlides : portraitSlides

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={label}>Orientation:</span>
          {(['horizontal', 'vertical'] as const).map((o) => (
            <button
              key={o}
              style={{
                ...btn,
                ...(orientation === o
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setOrientation(o)}
            >
              {o}
            </button>
          ))}
        </div>
        <button
          style={{
            ...btn,
            ...(autoPlay
              ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
              : { opacity: 0.55 }),
          }}
          onClick={() => setAutoPlay((v) => !v)}
        >
          autoPlay: {autoPlay ? 'on' : 'off'}
        </button>
      </div>

      <div style={{ maxWidth: orientation === 'horizontal' ? 480 : 280 }}>
        <PhotoCarousel
          key={orientation}
          orientation={orientation}
          autoPlay={autoPlay}
          autoPlayInterval={3500}
          slides={slides}
        />
      </div>
    </div>
  )
}
