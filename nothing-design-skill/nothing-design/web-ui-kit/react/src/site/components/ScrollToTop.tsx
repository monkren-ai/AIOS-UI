import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 换页时回到顶部。
 *
 * 文档站的侧栏是 sticky 的，不加这个的话从一个长组件页跳到下一个，
 * 落地位置会停在上一页的滚动偏移上，看着像页面没换。
 * 带 hash 的链接（示例锚点）跳过处理，交给浏览器自己滚。
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
