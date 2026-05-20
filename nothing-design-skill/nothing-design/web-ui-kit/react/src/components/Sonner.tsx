import { useState, useEffect, useCallback } from 'react'
import '../styles/sonner.css'

interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
}

interface SonnerProps {
  toasts: Toast[]
  onDismiss: (id: string) => void
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false)
  const duration = toast.duration ?? 5000
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)
      if (remaining <= 0) {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [duration])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  const handleDismiss = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onDismiss(toast.id)
    }, 200)
  }, [onDismiss, toast.id])

  const variant = toast.variant ?? 'default'

  const toastClassNames = [
    'nothing-sonner__toast',
    `nothing-sonner__toast--${variant}`,
    isExiting ? 'nothing-sonner__toast--exit' : 'nothing-sonner__toast--enter'
  ].filter(Boolean).join(' ')

  return (
    <div className={toastClassNames} role="status" aria-live="polite">
      <div className="nothing-sonner__toast-content">
        <div className="nothing-sonner__toast-title">{toast.title}</div>
        {toast.description && (
          <div className="nothing-sonner__toast-description">{toast.description}</div>
        )}
      </div>
      <button className="nothing-sonner__toast-close" onClick={handleDismiss} aria-label="Dismiss notification">
        ×
      </button>
      <div className="nothing-sonner__toast-progress">
        <div className="nothing-sonner__toast-progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

const Sonner: React.FC<SonnerProps> = ({
  toasts,
  onDismiss,
  position = 'top-right'
}) => {
  const containerClassNames = [
    'nothing-sonner',
    `nothing-sonner--${position}`
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClassNames} aria-label="Notifications">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export default Sonner
