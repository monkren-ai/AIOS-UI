import React, { useState, useRef, useEffect, useCallback, useId } from 'react'
import { useFloating } from '../hooks'
import '../styles/tooltip.css'

interface TooltipProps {
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: React.ReactElement
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = 'top',
  delay = 300,
  children
}) => {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)
  const tooltipId = useId()
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
    if (visible && triggerRef.current && popupRef.current) {
      update(triggerRef.current, popupRef.current)
    }
  }, [visible, update])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      hide()
    }
  }, [hide])

  const popupClassNames = [
    'nothing-tooltip__popup',
    visible ? 'nothing-tooltip__popup--visible' : '',
    `nothing-tooltip__popup--${side}`
  ].filter(Boolean).join(' ')

  return (
    <div className="nothing-tooltip">
      <span
        className="nothing-tooltip__trigger"
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onKeyDown={handleKeyDown}
        aria-describedby={tooltipId}
      >
        {children}
      </span>
      <div
        ref={popupRef}
        className={popupClassNames}
        role="tooltip"
        id={tooltipId}
        style={style}
      >
        {content}
      </div>
    </div>
  )
}

export default Tooltip
