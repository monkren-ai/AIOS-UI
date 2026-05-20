import '../styles/skeleton.css'

interface SkeletonProps {
  width?: string
  height?: string
  variant?: 'text' | 'circular' | 'rectangular'
  animate?: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'text',
  animate = true
}) => {
  const classNames = [
    'nothing-skeleton',
    variant !== 'text' ? `nothing-skeleton--${variant}` : '',
    animate ? 'nothing-skeleton--animate' : ''
  ].filter(Boolean).join(' ')

  const style: React.CSSProperties = {
    width: width ?? undefined,
    height: height ?? undefined
  }

  return (
    <div
      className={classNames}
      style={style}
      aria-hidden="true"
    />
  )
}

export default Skeleton
