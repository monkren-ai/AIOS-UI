import { IconSwap } from 'aios-ui-kit/icon-swap'
import type { ComponentDoc } from '../types'
import Basic from '../../examples/icon-swap/basic'
import basicSource from '../../examples/icon-swap/basic.tsx?raw'
import { HeartFilledIcon, HeartIcon } from '../../examples/icons'

export const iconSwapDoc: ComponentDoc = {
  slug: 'icon-swap',
  name: 'IconSwap',
  category: 'data-display',
  status: 'new',
  description: {
    zh: '同一槽位交叉切换图标：缩放加淡入淡出，没有 blur。',
    en: 'Cross-fade two icons in one slot with scale and opacity, never blur.',
  },
  preview: () => (
    <IconSwap active={false}>
      <HeartIcon className="size-5" />
      <HeartFilledIcon className="size-5" />
    </IconSwap>
  ),
  importStatement: `import { IconSwap } from 'aios-ui-kit/icon-swap'`,
  usageSnippet: `<IconSwap active={liked}><HeartIcon /><HeartFilledIcon /></IconSwap>`,
  examples: [
    {
      id: 'basic',
      title: { zh: '切换图标', en: 'Swap icons' },
      description: {
        zh: '`active` 可以是下标，也可以是布尔值（`false` → 第一层，`true` → 第二层）。隐藏层带 `aria-hidden`。',
        en: '`active` is either an index or a boolean (`false` → first layer, `true` → second). Hidden layers are `aria-hidden`.',
      },
      code: basicSource,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: 'IconSwap',
      props: [
        {
          name: 'active',
          type: 'number | boolean',
          default: '0',
          description: {
            zh: '当前可见层。布尔值映射到 0 / 1。',
            en: 'The visible layer. Booleans map to 0 / 1.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '槽位尺寸。', en: 'Slot size.' },
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: { zh: '要切换的图标层。', en: 'The icon layers to swap.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '未激活的层带 `aria-hidden`。如果图标有语义，把可访问名称放在外层按钮上，而不是 IconSwap 自己。',
      en: 'Inactive layers are `aria-hidden`. If the icon is meaningful, put the accessible name on the outer control, not on IconSwap.',
    },
  ],
}
