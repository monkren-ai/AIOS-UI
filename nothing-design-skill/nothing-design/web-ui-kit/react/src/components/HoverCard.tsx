import React, { useState, useRef, useEffect, useCallback, useId } from 'react'
import { useFloating } from '../hooks'
import '../styles/hover-card.css'

interface HoverCardProps {
  content: React.ReactNode
  side?: 'top' | 'bottom'
  delay?: number
  children: React.ReactElement
}

const HoverCard: React.FC<HoverCardProps> = ({
  content,
  side = 'bottom',
  delay = 300,
  children
}) => {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const hoverCardId = useId()
  const { style, update } = useFloating(side)

  const show = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setVisible(true)
    }, delay)
  }, [delay])

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])

  useEffect(() => {
    if (visible && triggerRef.current && contentRef.current) {
      update(triggerRef.current, contentRef.current)
    }
  }, [visible, update])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const contentClassNames = [
    'nothing-hover-card__content',
    visible ? 'nothing-hover-card__content--visible' : '',
    `nothing-hover-card__content--${side}`
  ].filter(Boolean).join(' ')

  return (
    <div className="nothing-hover-card">
      <span
        className="nothing-hover-card__trigger"
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={hoverCardId}
      >
        {children}
      </span>
      <div
        ref={contentRef}
        className={contentClassNames}
        id={hoverCardId}
        style={style}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {content}
      </div>
    </div>
  )
}

export default HoverCard
