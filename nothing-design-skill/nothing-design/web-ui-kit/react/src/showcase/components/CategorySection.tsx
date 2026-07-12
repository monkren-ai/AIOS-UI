import type { ReactNode } from 'react'

interface CategorySectionProps {
  id: string
  title: string
  children: ReactNode
}

/**
 * 分类区段容器。
 *
 * 对应展示页侧边栏导航的一个锚点分类，
 * 渲染分类标题（带下边框）与子内容。
 */
export function CategorySection({ id, title, children }: CategorySectionProps) {
  return (
    <div id={id} className="showcase-category">
      <h2 className="showcase-category-title">{title}</h2>
      {children}
    </div>
  )
}

export default CategorySection
