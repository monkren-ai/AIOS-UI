import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { TopNav } from './components/TopNav'
import { SearchDialog } from './components/SearchDialog'

/**
 * 文档站外壳：顶栏 + ⌘K 搜索 + 路由出口。
 *
 * 侧栏不放在这里 —— /docs 和 /components 各自的侧栏内容不同，
 * 由它们各自的布局提供。
 */
export function SiteLayout() {
  const [searchOpen, setSearchOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav onOpenSearch={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Outlet />
    </div>
  )
}

export default SiteLayout
