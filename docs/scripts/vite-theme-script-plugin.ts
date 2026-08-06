import type { Plugin } from 'vite'
import { getThemeScript } from '../../aios-design-skill/aios-design/web-ui-kit/react/src/ThemeProvider/ThemeScript'

/**
 * Vite 插件：在构建时将 ThemeScript 注入到 index.html 的 <head> 最前面。
 *
 * 避免 index.html 与 src/ThemeProvider/ThemeScript.tsx 之间的逻辑重复维护。
 */
export function themeScriptPlugin(): Plugin {
  return {
    name: 'nothing:theme-script',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const script = getThemeScript()
        return html.replace('<head>', `<head>\n    <script>${script}</script>`)
      },
    },
  }
}
