import { Radio } from 'aios-ui-kit/radio'
import type { ComponentDoc } from '../types'

export const radioDoc: ComponentDoc = {
  slug: 'radio',
  name: 'Radio',
  category: 'actions-inputs',
  status: 'new',
  baseUi: 'Radio',
  description: {
    zh: '独立单选原语，适合在 Base UI RadioGroup 中组合富内容选项。',
    en: 'A standalone radio primitive for rich options composed inside a Base UI RadioGroup.',
  },
  preview: () => <Radio aria-label="Option" value="option" />,
  importStatement: `import { Radio } from 'aios-ui-kit/radio'`,
  usageSnippet: `<Radio value="pro" aria-label="Pro plan" />`,
  examples: [],
  api: [
    {
      name: 'Radio',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: {
            zh: '提交到单选组的值。',
            en: 'Value submitted to the radio group.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '圆环尺寸。', en: 'Ring size.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用选项。', en: 'Disable the option.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '富内容标签必须通过 `<label>` 或 `aria-labelledby` 给 Radio 提供可访问名称。',
      en: 'Rich labels must give the Radio an accessible name through `<label>` or `aria-labelledby`.',
    },
  ],
}
