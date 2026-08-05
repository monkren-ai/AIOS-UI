import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/Button'
import { useTheme } from '@/ThemeProvider'
import { VERSION } from '@/version'
import { useT } from '../i18n'

const NAV_ITEMS = [
  { to: '/docs', zh: '文档', en: 'Docs' },
  { to: '/components', zh: '组件', en: 'Components' },
  { to: '/icons', zh: '图标', en: 'Icons' },
  { to: '/showcase', zh: '总览', en: 'Showcase' },
]

const THEME_GLYPH: Record<string, string> = {
  dark: '\u25CF',
  light: '\u25CB',
  system: '\u25D0',
}

export function TopNav({ onOpenSearch }: { onOpenSearch: () => void }) {
  const { t, lang, toggleLang } = useT()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'px-3 py-2 font-mono text-label uppercase tracking-widest',
      'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
      isActive ? 'text-foreground-display' : 'text-foreground-subtle hover:text-foreground',
    )

  return (
    <header
      data-slot="top-nav"
      className="sticky top-0 z-50 border-b border-border bg-background/95"
    >
      <div className="mx-auto flex h-14 w-full items-center gap-4 px-4 md:px-6">
        <Link to="/" className="flex shrink-0 items-baseline gap-2 no-underline">
          <span className="font-display text-subheading uppercase tracking-widest text-foreground-display">
            Nothing UI
          </span>
          <span className="font-mono text-label text-foreground-subtle">{VERSION}</span>
        </Link>

        <nav className="ms-4 hidden items-center md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {t(item.zh, item.en)}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              'hidden items-center gap-3 rounded-input border border-border bg-surface px-3 py-1.5 sm:flex',
              'cursor-pointer font-mono text-label uppercase tracking-widest text-foreground-subtle',
              'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
              'hover:border-border-visible hover:text-foreground',
            )}
          >
            <span>{t('搜索', 'Search')}</span>
            <kbd className="rounded-2xs border border-border px-1.5 py-0.5 font-mono text-micro text-foreground-subtle">
              ⌘K
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleLang}
            aria-label={t('切换语言', 'Toggle language')}
            className="rounded-card-technical font-mono"
          >
            {lang === 'zh' ? 'EN' : '中'}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label={t('切换主题', 'Toggle theme')}
            className="rounded-card-technical"
          >
            {THEME_GLYPH[theme] ?? THEME_GLYPH.dark}
          </Button>

          <a
            href="https://github.com/appica-dev/appica-ui"
            target="_blank"
            rel="noreferrer"
            className="hidden px-2 font-mono text-label uppercase tracking-widest text-foreground-subtle transition-colors duration-200 hover:text-foreground motion-reduce:transition-none sm:block"
          >
            GitHub
          </a>

          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-card-technical md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={t('切换导航', 'Toggle navigation')}
          >
            {mobileOpen ? '×' : '≡'}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col border-t border-border bg-surface px-4 py-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              {t(item.zh, item.en)}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

export default TopNav
