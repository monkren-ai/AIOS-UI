import { QuickToggle } from 'aios-ui-kit/quick-toggle'
import type { ComponentDoc } from '../types'
export const quickToggleDoc: ComponentDoc = {
  slug: 'quick-toggle', name: 'QuickToggle', category: 'actions-inputs', status: 'stable',
  description: { zh: '使用全局主题的圆形或胶囊快捷开关。', en: 'A circle or pill quick toggle using the global theme.' },
  preview: () => <QuickToggle label="Wi-Fi" active />,
  importStatement: `import { QuickToggle } from 'aios-ui-kit/quick-toggle'`, usageSnippet: `<QuickToggle label="Wi-Fi" active={on} onClick={toggle} />`,
  composition: { zh: 'active 同时驱动 aria-pressed 与可见开启态；3.0 移除独立 theme。', en: 'active drives both aria-pressed and the visible on state; 3.0 removes the local theme prop.' },
  examples: [], api: [{ name: 'QuickToggle', props: [
    { name: 'variant', type: `'circle' | 'pill'`, default: `'circle'`, description: { zh: '外形。', en: 'Shape.' } },
    { name: 'active', type: 'boolean', default: 'false', description: { zh: '受控开关状态。', en: 'Controlled toggle state.' } },
    { name: 'label', type: 'string', description: { zh: '可见标签。', en: 'Visible label.' } },
  ] }], accessibility: [{ zh: '纯图标用法必须提供 aria-label。', en: 'Icon-only usage must provide aria-label.' }],
}
