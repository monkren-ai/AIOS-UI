import '../styles/aspect-ratio.css'

interface AspectRatioProps {
  ratio?: number
  children: React.ReactNode
  style?: React.CSSProperties
}

const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 16 / 9,
  children,
  style
}) => {
  return (
    <div
      className="nothing-aspect-ratio"
      style={{ aspectRatio: `${ratio}`, ...style }}
    >
      <div className="nothing-aspect-ratio__inner">
        {children}
      </div>
    </div>
  )
}

export default AspectRatio
