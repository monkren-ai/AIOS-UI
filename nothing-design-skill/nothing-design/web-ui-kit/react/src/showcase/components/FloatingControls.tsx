import { useTheme } from '@/ThemeProvider'
import { useShowcaseContext } from '../ShowcaseContext'

interface FloatingControlsProps {
  forceSim: boolean
  onToggleForceSim: () => void
}

/**
 * 浮动控制按钮组（主题切换、语言切换、强制模拟数据）。
 *
 * 固定在页面右上角，与原 App.tsx 行为一致。
 * 主题由 ThemeProvider 直接管理，不再通过 ShowcaseContext 透传。
 */
export function FloatingControls({ forceSim, onToggleForceSim }: FloatingControlsProps) {
  const { theme, toggleTheme } = useTheme()
  const { t, lang, toggleLang } = useShowcaseContext()

  return (
    <>
      <button
        type="button"
        onClick={onToggleForceSim}
        aria-label={forceSim ? t('切换到真实数据', 'Switch to real data') : t('强制模拟数据', 'Force simulated data')}
        data-active={forceSim}
        className="showcase-floating-btn showcase-floating-btn--sim"
      >
        {forceSim ? 'FORCE SIM' : 'REAL'}
      </button>

      <button
        type="button"
        onClick={toggleLang}
        aria-label="Toggle language"
        className="showcase-floating-btn showcase-floating-btn--lang"
      >
        {lang === 'zh' ? 'EN' : '中'}
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t('切换主题', 'Toggle theme')}
        className="showcase-floating-btn showcase-floating-btn--theme"
      >
        {theme === 'system'
          ? t('系统', 'System')
          : theme === 'dark'
            ? t('深色', 'Dark')
            : t('浅色', 'Light')}
      </button>
    </>
  )
}

export default FloatingControls
