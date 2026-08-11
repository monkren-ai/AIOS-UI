import { Carousel } from 'aios-ui-kit/carousel'
import type { ComponentDoc } from '../types'

const items = [
  <div className="p-8 text-center" key="one">
    01 / SYSTEM
  </div>,
  <div className="p-8 text-center" key="two">
    02 / SIGNAL
  </div>,
  <div className="p-8 text-center" key="three">
    03 / OUTPUT
  </div>,
]

export const carouselDoc: ComponentDoc = {
  slug: 'carousel',
  name: 'Carousel',
  category: 'data-display',
  status: 'new',
  description: {
    zh: '通用内容轮播，支持受控索引和首尾循环。',
    en: 'A general content carousel with controlled indexing and looping.',
  },
  preview: () => <Carousel aria-label="System sequence" items={items} />,
  importStatement: `import { Carousel } from 'aios-ui-kit/carousel'`,
  usageSnippet: `<Carousel aria-label="Featured items" items={cards} loop />`,
  examples: [],
  api: [
    {
      name: 'Carousel',
      props: [
        {
          name: 'items',
          type: 'ReactNode[]',
          required: true,
          description: { zh: '幻灯片内容。', en: 'Slide content.' },
        },
        {
          name: 'value',
          type: 'number',
          description: { zh: '受控索引。', en: 'Controlled index.' },
        },
        {
          name: 'defaultValue',
          type: 'number',
          default: '0',
          description: {
            zh: '非受控初始索引。',
            en: 'Initial uncontrolled index.',
          },
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '允许首尾循环。',
            en: 'Loop between the first and last slides.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '根节点使用 carousel roledescription，每一页使用 slide roledescription，状态通过 aria-live 播报。',
      en: 'The root and slides expose carousel/slide role descriptions, and status changes are announced through aria-live.',
    },
  ],
}
