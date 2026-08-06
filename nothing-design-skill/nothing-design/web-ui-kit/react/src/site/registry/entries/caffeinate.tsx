import { Caffeinate } from 'aios-ui-kit/caffeinate'
import type { ComponentDoc } from '../types'

import CaffeinateDefault from '../../examples/caffeinate/default'
import defaultSource from '../../examples/caffeinate/default.tsx?raw'

export const caffeinateDoc: ComponentDoc = {
  slug: 'caffeinate',
  name: 'Caffeinate',
  category: 'widgets',
  status: 'stable',
  description: {
    zh: '记录每杯饮品，按半衰期推算此刻体内还剩多少咖啡因。',
    en: 'Log each drink and see how much caffeine is left in you, decaying by half-life.',
  },
  preview: () => <Caffeinate className="w-full max-w-xs" />,
  importStatement: `import { Caffeinate } from 'aios-ui-kit/caffeinate'`,
  usageSnippet: `<Caffeinate />`,
  examples: [
    {
      id: 'default',
      title: { zh: '记录与衰减', en: 'Log and decay' },
      description: {
        zh: '点 Espresso / Coffee / Tea / Energy 记录摄入，组件按半衰期（默认 300 分钟）推算当前体内剩余量，并估算降到阈值以下还要多久。状态色随剩余量从 low → medium → high 变化。',
        en: 'Tap Espresso / Coffee / Tea / Energy to log intake. The widget extrapolates what is left in your system using a half-life (300 minutes by default) and estimates how long until you drop below the threshold. Status colour shifts from low → medium → high as the level rises.',
      },
      code: defaultSource,
      render: () => <CaffeinateDefault />,
    },
  ],
  api: [
    {
      name: 'Caffeinate',
      props: [
        {
          name: 'updateInterval',
          type: 'number',
          default: '60000',
          description: {
            zh: '衰减重算间隔（毫秒）。',
            en: 'How often, in ms, to recalculate decay.',
          },
        },
        {
          name: 'totalSegments',
          type: 'number',
          default: '10',
          description: { zh: '分段条格子数。', en: 'Number of segment-bar cells.' },
        },
        {
          name: 'maxCaffeine',
          type: 'number',
          default: '400',
          description: {
            zh: '分段条满格对应的毫克上限。',
            en: 'Mg ceiling that fills the segment bar.',
          },
        },
        {
          name: 'halfLifeMinutes',
          type: 'number',
          default: '300',
          description: { zh: '咖啡因半衰期（分钟）。', en: 'Caffeine half-life in minutes.' },
        },
        {
          name: 'thresholdMg',
          type: 'number',
          default: '50',
          description: {
            zh: '「降到安全线以下」的阈值（毫克）。',
            en: 'Mg threshold for “below safe line”.',
          },
        },
        {
          name: 'status',
          type: `'low' | 'medium' | 'high'`,
          description: {
            zh: '强制状态色。不传则按当前剩余量自动推导。',
            en: 'Force a status colour. Omit to derive from the current level.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用记录按钮。', en: 'Disable the drink buttons.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '饮品按钮是可聚焦的原生 `<button>`。状态变化目前只靠颜色区分，读屏用户应依赖旁边的数字读数（当前 mg 和预计清零时间）。',
      en: 'Drink buttons are focusable native `<button>` elements. Status changes are colour-coded for now; screen-reader users should rely on the numeric readout (current mg and time-to-clear).',
    },
  ],
}
