import { TOC } from 'aios-ui-kit/toc'
import type { ComponentDoc } from '../types'

import TocBasic from '../../examples/toc/basic'

import basicSource from '../../examples/toc/basic.tsx?raw'

const items = [
  { id: 'overview', label: 'Overview', level: 1 },
  { id: 'install', label: 'Install', level: 2 },
  { id: 'usage', label: 'Usage', level: 2 },
  { id: 'api', label: 'API', level: 2 },
  { id: 'a11y', label: 'Accessibility', level: 2 },
]

export const tocDoc: ComponentDoc = {
  slug: 'toc',
  name: 'TOC',
  category: 'navigation',
  status: 'stable',
  baseUi: '—（自实现，IntersectionObserver）',
  description: {
    zh: '目录导航，当前节用 2px 左条高亮，随滚动追踪。',
    en: 'A table of contents that tracks the active section with a 2px left bar as you scroll.',
  },
  preview: () => <TOC items={items} activeId="usage" className="w-40" />,
  importStatement: `import { TOC } from 'aios-ui-kit/toc'`,
  usageSnippet: `<TOC items={sections} />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '不传 `activeId` 时，组件用 IntersectionObserver 自动追踪当前可见的标题，并把判定线下压 70%——标题进入视口上 30% 才算「到达」。点击项会平滑滚到对应标题（开了减弱动效则瞬时定位）。`level` 控制缩进，高亮左条始终对齐在导航容器边缘。把 `container` 指向一个滚动元素，就能在局部滚动区里追踪，而不是整页。',
        en: 'Without an `activeId` the component tracks the visible heading itself via IntersectionObserver, with the trigger line pushed down 70% so a heading only “arrives” once it enters the top 30% of the viewport. Clicking an item smooth-scrolls to it (instant under reduced motion). `level` drives the indent while the highlight bar stays pinned to the nav edge. Point `container` at a scroll element to track inside a pane instead of the whole page.',
      },
      code: basicSource,
      render: () => <TocBasic />,
    },
  ],
  api: [
    {
      name: 'TOC',
      description: {
        zh: '渲染为 `<nav>`，透传所有原生 nav 属性。',
        en: 'Renders a `<nav>` and forwards every native nav prop.',
      },
      props: [
        {
          name: 'items',
          type: '{ id: string; label: string; level?: number }[]',
          required: true,
          description: {
            zh: '目录项。`id` 是目标标题的 id（不含 `#`）。',
            en: 'The entries. `id` is the target heading’s id (without `#`).',
          },
        },
        {
          name: 'activeId',
          type: 'string',
          description: {
            zh: '受控当前节。传入则不再自行追踪。',
            en: 'Controlled active section. Passing it disables self-tracking.',
          },
        },
        {
          name: 'onActiveChange',
          type: '(id: string) => void',
          description: {
            zh: '当前节变化回调，受控与非受控都会触发。',
            en: 'Fires when the active section changes, in both controlled and uncontrolled modes.',
          },
        },
        {
          name: 'container',
          type: 'HTMLElement | null',
          description: {
            zh: '滚动容器，默认 `window`。',
            en: 'The scroll container, defaulting to `window`.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，落在 `<nav>` 上。',
            en: 'Extra classes on the `<nav>`.',
          },
        },
      ],
    },
    {
      name: 'tocItemVariants',
      description: {
        zh: '生成单条项类名的 CVA 函数，`level` 与 `active` 两个维度。',
        en: 'The CVA function for a single item, over `level` and `active`.',
      },
      props: [
        {
          name: 'level',
          type: `'1' | '2' | '3'`,
          default: `'1'`,
          description: { zh: '层级，控制缩进。', en: 'Level, drives the indent.' },
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: { zh: '是否当前节。', en: 'Whether this is the active section.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '渲染为 `<nav>`，默认 `aria-label="Table of contents"`，传了 `aria-label` 则以调用方为准。',
      en: 'Renders a `<nav>` with a default `aria-label="Table of contents"`; a caller-supplied `aria-label` wins.',
    },
    {
      zh: '每项是真正的 `<a href="#id">`，键盘可达、Enter 即可激活。修饰键点击（新标签等）交给浏览器走默认行为。',
      en: 'Each entry is a real `<a href="#id">`, keyboard-reachable and activated by Enter. Modified clicks are left to the browser default.',
    },
    {
      zh: '当前节用 `aria-current="location"` 标记，读屏会播报「当前位置」，不仅靠颜色。',
      en: 'The active section is marked with `aria-current="location"`, so screen readers announce it — not just colour.',
    },
    {
      zh: '追踪靠 IntersectionObserver；该 API 缺失的环境（如无障碍翻页机）下组件退化为静态链接列表，仍可用。',
      en: 'Tracking relies on IntersectionObserver; where the API is absent the component degrades to a plain list of links and remains usable.',
    },
    {
      zh: '滚动走 `scrollIntoView` 并在 `prefers-reduced-motion` 下退回瞬时定位，尊重用户的动效偏好。',
      en: 'Scrolling uses `scrollIntoView` and falls back to instant positioning under `prefers-reduced-motion`, respecting the user’s motion preference.',
    },
  ],
}
