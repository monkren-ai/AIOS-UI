import { Icon } from 'aios-ui-kit/icon'
import type { ComponentDoc } from '../types'
import Basic from '../../examples/icon/basic'
import basicSource from '../../examples/icon/basic.tsx?raw'

function PreviewGlyph(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><circle cx="12" cy="12" r="8" /></svg> }

export const iconDoc: ComponentDoc = {
  slug: 'icon', name: 'Icon', category: 'data-display', status: 'new',
  description: { zh: '轻量 SVG 组件适配层，统一 AIOS 尺寸与无障碍默认值，不内置图标注册表。', en: 'A light SVG component adapter that standardizes AIOS sizes and accessible defaults without bundling a registry.' },
  preview: () => <Icon glyph={PreviewGlyph} label="Status" size="lg" />,
  importStatement: `import { Icon } from 'aios-ui-kit/icon'`,
  usageSnippet: `<Icon glyph={IconCheck} label="Ready" size="lg" />`,
  examples: [{ id: 'basic', title: { zh: '语义图标', en: 'Semantic icon' }, code: basicSource, render: () => <Basic /> }],
  api: [{ name: 'Icon', props: [
    { name: 'glyph', type: 'ComponentType<SVGProps<SVGSVGElement>>', required: true, description: { zh: '要渲染的 SVG 图标组件。', en: 'SVG icon component to render.' } },
    { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, default: `'md'`, description: { zh: 'AIOS 图标尺寸。', en: 'AIOS icon size.' } },
    { name: 'label', type: 'string', description: { zh: '语义名称；省略时图标作为装饰隐藏。', en: 'Semantic name; without it the icon is decorative.' } },
  ] }],
  accessibility: [{ zh: '仅在图标独立传达信息时提供 label；按钮内图标应保持装饰性。', en: 'Provide label only when the icon conveys information alone; icons inside named buttons stay decorative.' }],
}
