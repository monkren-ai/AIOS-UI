import { SuccessCheck } from 'aios-ui-kit/success-check'
import type { ComponentDoc } from '../types'
import Basic from '../../examples/success-check/basic'
import basicSource from '../../examples/success-check/basic.tsx?raw'

export const successCheckDoc: ComponentDoc = {
  slug: 'success-check',
  name: 'SuccessCheck',
  category: 'feedback',
  status: 'new',
  description: {
    zh: '完成瞬间：圆标淡入，勾选描边画出。没有弹跳，没有 blur。',
    en: 'A completion moment: the mark fades in and the check strokes itself. No bounce, no blur.',
  },
  preview: () => <SuccessCheck active />,
  importStatement: `import { SuccessCheck } from 'aios-ui-kit/success-check'`,
  usageSnippet: `<SuccessCheck active />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '描边勾选', en: 'Stroke draw' },
      description: {
        zh: '`active` 从 false 翻到 true 时播放一次 path draw。默认文案是 `[DONE]`；传 `label={null}` 只留标记。',
        en: 'Flipping `active` from false to true plays a single path draw. The default label is `[DONE]`; pass `label={null}` to keep the mark only.',
      },
      code: basicSource,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: 'SuccessCheck',
      props: [
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: { zh: '为 true 时画出勾选。', en: 'When true, the check is drawn.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '标记尺寸。', en: 'Mark size.' },
        },
        {
          name: 'label',
          type: 'string | null',
          default: `'[DONE]'`,
          description: {
            zh: '状态文案。`null` 隐藏文字。',
            en: 'Status copy. `null` hides the text.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '有 `label` 时根节点是 `role="img"`，名称就是这段文案。没有 label 时标记视为装饰并 `aria-hidden`。',
      en: 'With a `label`, the root is `role="img"` named by that copy. Without a label the mark is decorative and `aria-hidden`.',
    },
    {
      zh: '描边动画走 `motion-safe:`，减弱动效时勾选直接出现。',
      en: 'The stroke runs under `motion-safe:`; reduced motion shows the check immediately.',
    },
  ],
}
