import { useShowcaseContext } from '../ShowcaseContext'

interface FloatingControlsProps {
  forceSim: boolean
  onToggleForceSim: () => void
}

/**
 * 展示页的浮动控制。
 *
 * 只剩「强制模拟数据」这一个开关 —— 主题与语言切换已经收进站点顶栏，
 * 再在右上角摆一份会和顶栏叠在一起。
 */
export function FloatingControls({ forceSim, onToggleForceSim }: FloatingControlsProps) {
  const { t } = useShowcaseContext()

  return (
    <button
      type="button"
      onClick={onToggleForceSim}
      aria-label={
        forceSim
          ? t('切换到真实数据', 'Switch to real data')
          : t('强制模拟数据', 'Force simulated data')
      }
      aria-pressed={forceSim}
      data-active={forceSim}
      className="showcase-floating-btn showcase-floating-btn--sim"
    >
      {forceSim ? 'FORCE SIM' : 'REAL'}
    </button>
  )
}

export default FloatingControls
