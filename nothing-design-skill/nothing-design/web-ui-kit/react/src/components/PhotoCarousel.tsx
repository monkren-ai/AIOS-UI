import { useState, useEffect } from 'react'
import '../styles/photo-carousel.css'

interface Slide {
  title: string
}

interface PhotoCarouselProps {
  autoPlay?: boolean
  autoPlayInterval?: number
  slides?: Slide[]
}

const defaultSlides: Slide[] = [
  { title: 'City Lights' },
  { title: 'Mountain View' },
  { title: 'Ocean Waves' },
  { title: 'Forest Path' }
]

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ 
  autoPlay = true, 
  autoPlayInterval = 4000,
  slides = defaultSlides
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (autoPlay) {
      timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % slides.length)
      }, autoPlayInterval)
    }

    return () => clearInterval(timer)
  }, [autoPlay, autoPlayInterval, slides.length])

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % slides.length)
  }

  const handleGoToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="nothing-photo-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="carousel-slide-placeholder">
              <svg className="carousel-slide-icon" viewBox="0 0 24 24" fill="none" width="48" height="48" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
                <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="carousel-slide-title">{slide.title}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="carousel-controls">
        <div className="carousel-nav-buttons">
          <button className="carousel-nav-btn" onClick={handlePrev}>
            <svg viewBox="0 0 24 24" fill="none">
              <path className="carousel-nav-icon" d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="carousel-nav-btn" onClick={handleNext}>
            <svg viewBox="0 0 24 24" fill="none">
              <path className="carousel-nav-icon" d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleGoToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="carousel-info">
          <div className="carousel-counter">
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoCarousel
