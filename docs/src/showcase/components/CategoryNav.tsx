import { useShowcaseContext } from '../ShowcaseContext'

interface Category {
  id: string
  zh: string
  en: string
}

const categories: Category[] = [
  { id: 'agent-os', zh: 'AI OS Agent', en: 'AI OS Agent' },
  { id: 'core-interaction', zh: '核心交互', en: 'Core Interaction' },
  { id: 'data-display', zh: '数据展示', en: 'Data Display' },
  { id: 'overlays', zh: '弹窗与层', en: 'Overlays' },
  { id: 'navigation', zh: '导航', en: 'Navigation' },
  { id: 'menus-selection', zh: '菜单与选择', en: 'Menus & Selection' },
  { id: 'states', zh: '状态', en: 'States' },
  { id: 'utility', zh: '工具', en: 'Utility' },
  { id: 'clock-calendar', zh: '时钟与日历', en: 'Clock & Calendar' },
  { id: 'system-monitoring', zh: '系统与监控', en: 'System & Monitoring' },
  { id: 'utility-tools', zh: '实用工具', en: 'Utility Tools' },
  { id: 'time-progress', zh: '时间与进度', en: 'Time & Progress' },
  { id: 'visual-display', zh: '视觉展示', en: 'Visual Display' },
  { id: 'figma-20-library', zh: 'Figma 2.0 库', en: 'Figma 2.0 Library' },
  { id: 'nullframe', zh: 'Nullframe 仪表盘', en: 'Nullframe Dashboard' },
]

/**
 * 侧边栏分类导航。
 *
 * 渲染所有分类的锚点链接，点击平滑滚动到对应区段。
 */
export function CategoryNav() {
  const { t } = useShowcaseContext()

  return (
    <aside className="showcase-aside" aria-label="Category navigation">
      <div className="showcase-aside-label">{t('分类', 'Categories')}</div>
      <nav className="showcase-nav">
        {categories.map((cat) => (
          <a key={cat.id} href={`#${cat.id}`} className="showcase-nav-link">
            {t(cat.zh, cat.en)}
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default CategoryNav
