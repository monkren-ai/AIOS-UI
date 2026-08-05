import { PhotoCarousel } from 'nothing-ui/photo-carousel'
import type { ComponentDoc } from '../types'

import PhotoCarouselDefault from '../../examples/photo-carousel/default'
import defaultSource from '../../examples/photo-carousel/default.tsx?raw'

export const photoCarouselDoc: ComponentDoc = {
  slug: 'photo-carousel',
  name: 'PhotoCarousel',
  category: 'widgets',
  status: 'stable',
  description: {
    zh: '图片轮播，可自动播放；用户偏好降低动效时只保留手动翻页。',
    en: 'An image carousel that autoplays — unless the user asked for reduced motion.',
  },
  preview: () => <PhotoCarousel className="w-full max-w-md" autoPlay={false} />,
  importStatement: `import { PhotoCarousel } from 'nothing-ui/photo-carousel'`,
  usageSnippet: `<PhotoCarousel slides={[{ title: 'Slide 1', pattern: 0 }]} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '自动轮播', en: 'Autoplay' },
      description: {
        zh: '没有 `image` / `gradient` 时回退到 dot-matrix pattern 占位。`useReducedMotion()` 为 true 时自动播放会被关掉，只留 Prev/Next 和指示点手动翻页。标签页不可见时也会暂停计时器。',
        en: 'Falls back to a dot-matrix pattern when neither `image` nor `gradient` is set. Autoplay is suppressed when `useReducedMotion()` is true, leaving only Prev/Next and dot indicators for manual paging. The timer also pauses while the tab is hidden.',
      },
      code: defaultSource,
      render: () => <PhotoCarouselDefault />,
    },
  ],
  api: [
    {
      name: 'PhotoCarousel',
      props: [
        {
          name: 'slides',
          type: '{ title: string; subtitle?: string; gradient?: string; image?: string; pattern?: number }[]',
          description: { zh: '幻灯片数据。', en: 'Slide data.' },
        },
        {
          name: 'autoPlay',
          type: 'boolean',
          default: 'true',
          description: { zh: '是否自动轮播（可被 reduced motion 覆盖）。', en: 'Whether to autoplay (overridden by reduced motion).' },
        },
        {
          name: 'autoplay',
          type: 'boolean',
          description: { zh: '`autoPlay` 的别名。', en: 'Alias for `autoPlay`.' },
        },
        {
          name: 'autoPlayInterval',
          type: 'number',
          default: '4000',
          description: { zh: '自动轮播间隔（毫秒）。', en: 'Autoplay interval in ms.' },
        },
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: { zh: '翻页方向。', en: 'Paging direction.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'Prev / Next 是带可见标签的按钮。指示点也是可聚焦按钮，当前页用 `aria-current` 标记。自动轮播在 reduced motion 下会关闭，避免不请自来的动效。',
      en: 'Prev / Next are buttons with visible labels. Dot indicators are focusable buttons; the current slide is marked with `aria-current`. Autoplay is disabled under reduced motion to avoid unsolicited movement.',
    },
  ],
}
