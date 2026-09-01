import { Card } from 'aios-ui-kit/card'
import type { ComponentDoc } from '../types'
export const cardDoc: ComponentDoc = {
  slug: 'card', name: 'Card', category: 'data-display', status: 'stable',
  description: { zh: '由全局语义令牌驱动的内容卡片。', en: 'A content card driven by global semantic tokens.' },
  preview: () => <Card className="w-full max-w-sm" title="Storage" action="Manage">128 GB of 256 GB used.</Card>,
  importStatement: `import { Card } from 'aios-ui-kit/card'`, usageSnippet: `<Card title="Storage">128 GB used.</Card>`,
  composition: { zh: '标题、媒体、功能标记、操作和页脚均按需渲染。3.0 已移除 WidgetCard 与 mode="widget"。', en: 'Title, media, feature, action, and footer render on demand. 3.0 removes WidgetCard and mode="widget".' },
  examples: [],
  api: [{ name: 'Card', props: [
    { name: 'variant', type: `'soft' | 'secondary' | 'outline' | 'ghost'`, default: `'soft'`, description: { zh: '表面层级。', en: 'Surface emphasis.' } },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: { zh: '内边距密度。', en: 'Padding density.' } },
    { name: 'shape', type: `'rounded' | 'technical'`, default: `'rounded'`, description: { zh: '容器形状。', en: 'Container shape.' } },
    { name: 'interactive', type: 'boolean', default: 'false', description: { zh: '让整卡可由点击和键盘激活。', en: 'Makes the entire card pointer and keyboard activatable.' } },
  ] }],
  accessibility: [{ zh: 'interactive 模式支持 Enter 与 Space；卡内不要嵌套其他交互控件。', en: 'Interactive mode supports Enter and Space; do not nest other controls inside it.' }],
}
