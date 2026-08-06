import { Thumbnail } from 'aios-ui-kit/thumbnail'
import type { ComponentDoc } from '../types'

import ThumbnailBasic from '../../examples/thumbnail/basic'
import ThumbnailFallback from '../../examples/thumbnail/fallback'

import basicSource from '../../examples/thumbnail/basic.tsx?raw'
import fallbackSource from '../../examples/thumbnail/fallback.tsx?raw'

/** 一张一定能加载成功的本地图片，省去 preview 对外部网络的依赖。 */
const photo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="#1f1f1f"/>
      <circle cx="32" cy="26" r="12" fill="#8f8f8f"/>
      <path d="M8 64c3-16 12-22 24-22s21 6 24 22z" fill="#8f8f8f"/>
    </svg>`,
  )

export const thumbnailDoc: ComponentDoc = {
  slug: 'thumbnail',
  name: 'Thumbnail',
  category: 'data-display',
  status: 'stable',
  baseUi: '—（自实现，参照 Avatar 图片加载）',
  description: {
    zh: '图片缩略图，加载失败回退到点阵占位而非灰色块。',
    en: 'An image thumbnail that falls back to a dot-matrix placeholder instead of a grey block.',
  },
  preview: () => <Thumbnail src={photo} alt="A portrait" />,
  importStatement: `import { Thumbnail } from 'aios-ui-kit/thumbnail'`,
  usageSnippet: `<Thumbnail src={item.coverUrl} alt={item.title} />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '尺寸与宽高比', en: 'Sizes and ratios' },
      description: {
        zh: '`size` 给的是高度（48 / 64 / 96px），宽度由 `ratio` 推出。默认 `square` 正好是正方形；切到 `16:9` 适合做媒体封面。',
        en: '`size` sets the height (48 / 64 / 96px) and the width follows from `ratio`. The default `square` is a true square; switch to `16:9` for media covers.',
      },
      code: basicSource,
      render: () => <ThumbnailBasic />,
    },
    {
      id: 'fallback',
      title: { zh: '回退', en: 'Fallback' },
      description: {
        zh: '组件监听 `<img>` 的 `onError`，一次失败就永久切到兜底内容，不会反复重试。不传 `fallback` 时是一个 4×4 的点阵网格——比一整块灰色更克制，也避免了「图片没加载出来」的错觉。需要自己的兜底就传 `fallback` 节点。',
        en: 'The component listens for the `<img>` `onError` and switches to the fallback permanently after a single failure, rather than retrying. Without a `fallback` you get a 4×4 dot matrix — more restrained than a flat grey block, and it avoids the “image failed to load” look. Pass a `fallback` node for your own placeholder.',
      },
      code: fallbackSource,
      render: () => <ThumbnailFallback />,
    },
  ],
  api: [
    {
      name: 'Thumbnail',
      description: {
        zh: '默认渲染为 `<div>`，透传所有原生 div 属性。',
        en: 'Renders a `<div>` by default and forwards every native div prop.',
      },
      props: [
        {
          name: 'src',
          type: 'string',
          description: {
            zh: '图片地址。加载失败后自动切到 `fallback`。',
            en: 'Image URL. On a load error it switches to `fallback`.',
          },
        },
        {
          name: 'alt',
          type: 'string',
          default: `''`,
          description: {
            zh: '图片替代文本。无图时也会作为兜底元素的 `aria-label`。',
            en: 'Alt text for the image. Also becomes the fallback element’s `aria-label` when there is no image.',
          },
        },
        {
          name: 'fallback',
          type: 'ReactNode',
          description: {
            zh: '图片缺席或加载失败时展示的内容。不传时使用点阵占位。',
            en: 'What to show when the image is missing or fails. Defaults to a dot-matrix placeholder.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '高度：48 / 64 / 96px。',
            en: 'Height: 48 / 64 / 96px.',
          },
        },
        {
          name: 'ratio',
          type: `'square' | '4:3' | '16:9'`,
          default: `'square'`,
          description: { zh: '宽高比。', en: 'Aspect ratio.' },
        },
        {
          name: 'rounded',
          type: `'card' | 'input' | 'none'`,
          default: `'card'`,
          description: { zh: '圆角。', en: 'Corner radius.' },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并，可覆盖变体自带的工具类。',
            en: 'Extra classes, merged via `tailwind-merge` so they override the variant’s own utilities.',
          },
        },
      ],
    },
    {
      name: 'thumbnailVariants',
      description: {
        zh: '生成缩略图类名的 CVA 函数。',
        en: 'The CVA function behind the class names.',
      },
      props: [
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'ratio',
          type: `'square' | '4:3' | '16:9'`,
          default: `'square'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'rounded',
          type: `'card' | 'input' | 'none'`,
          default: `'card'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '有图片时渲染真正的 `<img>`，`alt` 直接落到它上面。若缩略图只是标题旁边的装饰，`alt=""`（默认值）比重复一遍标题更好。',
      en: 'With an image it renders a real `<img>` and puts `alt` on it. When the thumbnail merely decorates a title already in the DOM, the default `alt=""` beats repeating the title.',
    },
    {
      zh: '兜底元素是个 `<span>`，带 `aria-label={alt}`。点阵占位本身 `aria-hidden`，不会让读屏念出无意义的图形。',
      en: 'The fallback is a `<span>` carrying `aria-label={alt}`. The dot matrix itself is `aria-hidden`, so a screen reader never tries to announce the pattern.',
    },
    {
      zh: '`data-state` 报出当前是 `image` 还是 `fallback`，测试里可以据此断言回退是否发生。',
      en: '`data-state` reports whether the current render is `image` or `fallback`, which gives tests something stable to assert on.',
    },
    {
      zh: '根元素默认没有 role、不可聚焦——缩略图本身不是控件。需要点击时请在外面包一个真正的 `<button>` 或 `<a>`，不要在 `div` 上硬加 `onClick`。',
      en: 'The root has no role and is not focusable, because a thumbnail is not a control. When it needs to be clickable, wrap a real `<button>` or `<a>` around it — do not bolt an `onClick` onto the `div`.',
    },
  ],
}
