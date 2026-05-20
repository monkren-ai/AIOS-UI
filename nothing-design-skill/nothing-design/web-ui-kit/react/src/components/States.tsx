import '../styles/states.css'

interface LoadingStateProps {
  progress?: number
  totalSegments?: number
  label?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({
  progress,
  totalSegments = 20,
  label
}) => {
  const filledSegments = progress !== undefined
    ? Math.round((progress / 100) * totalSegments)
    : 0

  return (
    <div className="nothing-state nothing-state--loading">
      <div className="nothing-state__spinner">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="nothing-state__spinner-segment" />
        ))}
      </div>
      {progress !== undefined && (
        <>
          <div className="nothing-state__loading-bar">
            {Array.from({ length: totalSegments }).map((_, i) => (
              <div
                key={i}
                className={[
                  'nothing-state__loading-segment',
                  i < filledSegments ? 'nothing-state__loading-segment--filled' : ''
                ].filter(Boolean).join(' ')}
              />
            ))}
          </div>
          <div className="nothing-state__percentage">{progress}%</div>
        </>
      )}
      {label && <div className="nothing-state__bracket-text">[ {label} ]</div>}
    </div>
  )
}

interface ErrorStateProps {
  headline: string
  message?: string
  prefix?: string
  onRetry?: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({
  headline,
  message,
  prefix,
  onRetry
}) => {
  return (
    <div className="nothing-state nothing-state--error">
      <div className="nothing-state__headline">
        {prefix && <span className="nothing-state__prefix">{prefix}</span>}
        {headline}
      </div>
      {message && <div className="nothing-state__message">{message}</div>}
      {onRetry && (
        <div className="nothing-state__action">
          <button className="nothing-btn nothing-btn--secondary" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}
    </div>
  )
}

interface EmptyStateProps {
  headline?: string
  description?: string
  action?: React.ReactNode
}

const EmptyState: React.FC<EmptyStateProps> = ({
  headline = 'Nothing here',
  description,
  action
}) => {
  return (
    <div className="nothing-state nothing-state--empty">
      <div className="nothing-state__dot-matrix" />
      <div className="nothing-state__headline">{headline}</div>
      {description && <div className="nothing-state__description">{description}</div>}
      {action && <div className="nothing-state__action">{action}</div>}
    </div>
  )
}

interface DisabledStateProps {
  headline?: string
  description?: string
}

const DisabledState: React.FC<DisabledStateProps> = ({
  headline = 'Unavailable',
  description
}) => {
  return (
    <div className="nothing-state nothing-state--disabled">
      <h3 className="nothing-state__headline">{headline}</h3>
      {description && <div className="nothing-state__description">{description}</div>}
    </div>
  )
}

export { LoadingState, ErrorState, EmptyState, DisabledState }
