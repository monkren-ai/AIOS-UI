import { Link } from 'react-router-dom'
import { Showcase } from '@/showcase'
import { useT } from '../i18n'

export function ComponentsOverviewPage() {
  const { t } = useT()

  return (
    <main>
      <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-background px-4 py-3 md:px-6">
        <div className="min-w-0">
          <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
            {t('组件目录 / 交互总览', 'Components / Live overview')}
          </span>
          <p className="mt-1 text-sm text-foreground-muted">
            {t('在真实状态中查看组件的组合与行为。', 'See component composition and behaviour in real states.')}
          </p>
        </div>
        <Link
          to="/components"
          className="shrink-0 font-mono text-label uppercase tracking-widest text-foreground-muted no-underline hover:text-foreground-display"
        >
          ← {t('返回目录', 'Directory')}
        </Link>
      </header>
      <Showcase />
    </main>
  )
}

export default ComponentsOverviewPage
