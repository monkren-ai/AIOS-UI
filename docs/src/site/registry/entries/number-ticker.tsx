import { NumberTicker } from 'aios-ui-kit/number-ticker'
import type { ComponentDoc } from '../types'
import Basic from '../../examples/number-ticker/basic'
import basicSource from '../../examples/number-ticker/basic.tsx?raw'

export const numberTickerDoc: ComponentDoc = {
  slug: 'number-ticker',
  name: 'NumberTicker',
  category: 'data-display',
  status: 'new',
  description: {
    zh: '数字变化时按位交错滑入，只动位移和透明度。',
    en: 'Digits restagger with a slide when a number updates. Opacity and transform only.',
  },
  preview: () => <NumberTicker value={1280} prefix="$" />,
  importStatement: `import { NumberTicker } from 'aios-ui-kit/number-ticker'`,
  usageSnippet: `<NumberTicker value={1280} prefix="$" />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '按位更新', en: 'Digit updates' },
      description: {
        zh: '每一位独立换入。增大向下滑出、减小向上滑出。没有 blur，减弱动效时直接落到新值。',
        en: 'Each digit swaps independently. Increases slide up, decreases slide down. No blur; reduced motion snaps to the new value.',
      },
      code: basicSource,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: 'NumberTicker',
      props: [
        {
          name: 'value',
          type: 'number | string',
          required: true,
          description: { zh: '要展示的数字。', en: 'The number to display.' },
        },
        {
          name: 'prefix',
          type: 'ReactNode',
          description: { zh: '数字前的固定前缀。', en: 'A stable prefix before the digits.' },
        },
        {
          name: 'suffix',
          type: 'ReactNode',
          description: { zh: '数字后的固定后缀。', en: 'A stable suffix after the digits.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '字号阶梯。', en: 'Type size.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '根节点是 `<span>`，读屏读到的是完整文本（含前后缀），不播报每一位的过渡。',
      en: 'The root is a `<span>`; assistive tech reads the full string, including affixes, and does not announce per-digit motion.',
    },
    {
      zh: '数字会实时变化时，请把组件放进 `role="status"` 或带 `aria-live` 的容器。',
      en: 'If the value updates at runtime, wrap it in a `role="status"` region or an `aria-live` container.',
    },
  ],
}
