import { IconButton } from 'aios-ui-kit/button'
import type { ComponentDoc } from '../types'
import Basic from '../../examples/icon-button/basic'
import basicSource from '../../examples/icon-button/basic.tsx?raw'

export const iconButtonDoc: ComponentDoc = {
  slug: 'icon-button', name: 'IconButton', category: 'actions-inputs', status: 'new',
  description: { zh: '复用 Button 状态体系的纯图标按钮，并在类型层强制可访问名称。', en: 'An icon-only Button that requires an accessible name at the type level.' },
  preview: () => <IconButton aria-label="Add item" icon={<span aria-hidden>＋</span>} variant="outline" />,
  importStatement: `import { IconButton } from 'aios-ui-kit/button'`,
  usageSnippet: `<IconButton aria-label="Add item" icon={<PlusIcon />} />`,
  examples: [{ id: 'basic', title: { zh: '基础', en: 'Basic' }, code: basicSource, render: () => <Basic /> }],
  api: [{ name: 'IconButton', props: [
    { name: 'aria-label', type: 'string', required: true, description: { zh: '按钮的可访问名称。', en: 'Accessible name for the button.' } },
    { name: 'icon', type: 'ReactNode', required: true, description: { zh: '视觉图标；组件会将其标记为装饰。', en: 'Visual icon; marked decorative by the component.' } },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: { zh: '映射到共享 Button 的 icon 尺寸。', en: 'Maps to the shared Button icon sizes.' } },
    { name: 'shape', type: `'circle' | 'technical'`, default: `'circle'`, description: { zh: '圆形或工业小圆角。', en: 'Circular or technical-corner shape.' } },
  ] }],
  accessibility: [{ zh: '`aria-label` 是必填属性，图标本身不会被读屏重复朗读。', en: '`aria-label` is required and the visual icon is hidden from assistive tech.' }],
  baseUi: 'Button',
}
