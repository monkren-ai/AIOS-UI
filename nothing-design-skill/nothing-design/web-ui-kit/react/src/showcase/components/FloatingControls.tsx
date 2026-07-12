import type { T } from '../hooks/useShowcaseState'

interface FloatingControlsProps {
  t: T
  lang: 'zh' | 'en'
  forceSim: boolean
  onToggleLang: () => void
  onToggleTheme: () => void
  onToggleForceSim: () => void
}

/**
 * 浮动控制按钮组（主题切换、语言切换、强制模拟数据）。
 *
 * 固定在页面右上角，与原 App.tsx 行为一致。
 */
export function FloatingControls({
  t,
  lang,
  forceSim,
  onToggleLang,
  onToggleTheme,
  onToggleForceSim,
}: FloatingControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onToggleForceSim}
        aria-label={forceSim ? 'Switch to real data' : 'Force simulated data'}
        data-active={forceSim}
        className="showcase-floating-btn showcase-floating-btn--sim"
      >
        {forceSim ? 'FORCE SIM' : 'REAL'}
      </button>

      <button
        type="button"
        onClick={onToggleLang}
        aria-label="Toggle language"
        className="showcase-floating-btn showcase-floating-btn--lang"
      >
        {lang === 'zh' ? 'EN' : '中'}
      </button>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
        className="showcase-floating-btn showcase-floating-btn--theme"
      >
        {t('切换主题', 'Toggle Theme')}
      </button>
    </>
  )
}

export default FloatingControls
