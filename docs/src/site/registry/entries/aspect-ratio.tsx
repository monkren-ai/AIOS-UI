import { AspectRatio } from 'aios-ui-kit/aspect-ratio'
import type { ComponentDoc } from '../types'

import AspectRatioRatios from '../../examples/aspect-ratio/ratios'
import AspectRatioMedia from '../../examples/aspect-ratio/media'

import ratiosSource from '../../examples/aspect-ratio/ratios.tsx?raw'
import mediaSource from '../../examples/aspect-ratio/media.tsx?raw'

export const aspectRatioDoc: ComponentDoc = {
  slug: 'aspect-ratio',
  name: 'AspectRatio',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '把容器锁在给定的宽高比上，常用于图片、视频与地图嵌入前占位。',
    en: 'Pins a container to a given width-to-height ratio, typically to reserve space before an image, video, or embed loads.',
  },
  preview: () => (
    <AspectRatio ratio={16 / 9} className="w-full max-w-xs border border-border-visible">
      <div className="flex h-full w-full items-center justify-center font-mono text-label uppercase tracking-wider text-foreground-muted">
        16 / 9
      </div>
    </AspectRatio>
  ),
  importStatement: `import { AspectRatio } from 'aios-ui-kit/aspect-ratio'`,
  usageSnippet: `<AspectRatio ratio={16 / 9}>\n  <img src="/photo.jpg" className="h-full w-full object-cover" />\n</AspectRatio>`,
  examples: [
    {
      id: 'ratios',
      title: { zh: '常见比例', en: 'Common ratios' },
      description: {
        zh: '`ratio` 是宽除以高的数字，不是字符串——`16 / 9` 直接写成表达式即可。组件本身不画任何边框或背景，这里的描边只是为了让占位框在示例里看得见。',
        en: '`ratio` is a plain number, width divided by height — write it as the expression `16 / 9` rather than a string. The component itself paints no border or background; the outline here exists only so the empty box is visible in the example.',
      },
      code: ratiosSource,
      render: () => <AspectRatioRatios />,
    },
    {
      id: 'media',
      title: { zh: '搭配媒体内容', en: 'With media' },
      description: {
        zh: '内容层是一个 `position: absolute; inset: 0` 的内部 slot，本身不会撑高容器——真正决定盒子高度的是外层 `style.aspectRatio`。所以放 `img` / `video` 时要自己补上 `h-full w-full object-cover`，组件不会替内容做拉伸或裁切。',
        en: 'The content sits in an inner slot that is `position: absolute; inset: 0` and never sets the box’s height itself — the outer `style.aspectRatio` does that alone. So an `img` or `video` needs its own `h-full w-full object-cover`; the component does not stretch or crop content for you.',
      },
      code: mediaSource,
      render: () => <AspectRatioMedia />,
    },
  ],
  api: [
    {
      name: 'AspectRatio',
      description: {
        zh: '渲染两层 `<div>`：外层持有比例与透传的原生属性，内层是绝对定位的内容容器。',
        en: 'Renders two nested `<div>`s: the outer one carries the ratio and every forwarded native prop, the inner one is the absolutely positioned content container.',
      },
      props: [
        {
          name: 'ratio',
          type: 'number',
          default: '16 / 9',
          description: {
            zh: '宽高比，宽除以高。通过内联 `style.aspectRatio` 应用，而不是某个 Tailwind 类，所以它能接受任意数值，不局限于预设档位。',
            en: 'Width divided by height. Applied through an inline `style.aspectRatio` rather than a Tailwind class, so it accepts any number — not just a fixed set of presets.',
          },
        },
        {
          name: 'style',
          type: 'React.CSSProperties',
          description: {
            zh: '与 `ratio` 生成的内联样式合并（`{ aspectRatio, ...style }`），出现同名属性时你传入的会覆盖 `aspectRatio` 之外的其它字段；`aspectRatio` 本身固定由 `ratio` 决定。',
            en: 'Merged with the style the ratio produces (`{ aspectRatio, ...style }`). Anything you pass wins for other fields; `aspectRatio` itself always comes from `ratio`.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '放进绝对定位的内容层。需要自己控制填充与裁切（见上方示例）。',
            en: 'Rendered inside the absolutely positioned content layer. You control how it fills and crops (see the example above).',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到外层容器的类名。经 `tailwind-merge` 合并，可覆盖 `relative w-full` 之外的默认类——例如 `overflow-hidden`、`rounded-md`。',
            en: 'Extra classes on the outer container, merged via `tailwind-merge`. Useful for adding `overflow-hidden` or `rounded-md` on top of the default `relative w-full`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '两层都是没有 role 的 `<div>`，组件不产生任何语义。可访问性完全由 `children` 决定——图片记得写 `alt`，视频记得给控件与字幕。',
      en: 'Both layers are plain `<div>`s with no role, so the component adds no semantics of its own. Accessibility is entirely up to `children` — remember `alt` text on an image, and controls plus captions on a video.',
    },
    {
      zh: '容器高度在内容加载完成前就已经由 `ratio` 确定，这正是它存在的意义：避免图片异步加载时页面发生布局抖动（layout shift）。',
      en: 'The container’s height is fixed by `ratio` before the content ever loads — that is the whole point of the component: it keeps an asynchronously loading image from causing layout shift.',
    },
    {
      zh: '没有任何动效或过渡，因此不受 `prefers-reduced-motion` 影响。',
      en: 'There is no animation or transition anywhere, so `prefers-reduced-motion` has nothing to affect here.',
    },
  ],
}
