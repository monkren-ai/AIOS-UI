import { Battery } from 'aios-ui-kit/battery'
import type { ComponentDoc } from '../types'
export const batteryDoc: ComponentDoc = {
  slug: 'battery', name: 'Battery', category: 'time-system', status: 'stable',
  description: { zh: '语义令牌驱动的分段或圆环电量读数。', en: 'A semantic-token battery readout as segments or a ring.' },
  preview: () => <Battery percent={68} className="w-full max-w-md" />,
  importStatement: `import { Battery } from 'aios-ui-kit/battery'`, usageSnippet: `<Battery percent={68} variant="segmented" />`,
  composition: { zh: '3.0 移除 widgetMode 与独立 theme；devices 仍可展示外设电量。', en: '3.0 removes widgetMode and the local theme prop; devices still lists peripheral charge.' },
  examples: [], api: [{ name: 'Battery', props: [
    { name: 'variant', type: `'segmented' | 'ring'`, default: `'segmented'`, description: { zh: '读数画法。', en: 'Readout style.' } },
    { name: 'percent', type: 'number', description: { zh: '受控百分比。', en: 'Controlled percentage.' } },
    { name: 'devices', type: 'BatteryDevice[]', description: { zh: '可选外设清单。', en: 'Optional peripheral list.' } },
  ] }], accessibility: [{ zh: '根元素使用 meter 语义并暴露完整读数。', en: 'The root uses meter semantics and exposes the full reading.' }],
}
