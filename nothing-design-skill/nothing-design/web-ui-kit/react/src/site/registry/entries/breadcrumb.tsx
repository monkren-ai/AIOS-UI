import { Breadcrumb } from 'aios-ui-kit/breadcrumb'
import type { ComponentDoc } from '../types'

import BreadcrumbBasic from '../../examples/breadcrumb/basic'
import BreadcrumbSizes from '../../examples/breadcrumb/sizes'
import BreadcrumbSeparator from '../../examples/breadcrumb/separator'
import BreadcrumbClientRouting from '../../examples/breadcrumb/client-routing'

import basicSource from '../../examples/breadcrumb/basic.tsx?raw'
import sizesSource from '../../examples/breadcrumb/sizes.tsx?raw'
import separatorSource from '../../examples/breadcrumb/separator.tsx?raw'
import clientRoutingSource from '../../examples/breadcrumb/client-routing.tsx?raw'

export const breadcrumbDoc: ComponentDoc = {
  slug: 'breadcrumb',
  name: 'Breadcrumb',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '面包屑，展示当前位置在层级中的路径。',
    en: 'A trail showing where the current page sits in the hierarchy.',
  },
  preview: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Breadcrumb' },
      ]}
    />
  ),
  importStatement: `import { Breadcrumb } from 'aios-ui-kit/breadcrumb'`,
  usageSnippet: `<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' },
  ]}
/>`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '整个组件由 `items` 数组驱动，没有子组件要拼。数组最后一项永远被当作当前页：它不会渲染成链接，而是带 `aria-current="page"` 的纯文本——所以别给最后一项传 `href`，传了也会被忽略。',
        en: 'The whole component is driven by the `items` array; there are no sub-components to assemble. The last entry is always treated as the current page: it renders as plain text with `aria-current="page"` rather than a link, so there is no point giving it an `href` — it would be ignored.',
      },
      code: basicSource,
      render: () => <BreadcrumbBasic />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '`size` 只改字号（12 / 14 / 16px），间距和分隔符都跟着 em 走。面包屑几乎总是页面上层级最低的文字，所以 `sm` 与 `md` 覆盖了绝大多数场景，`lg` 留给面包屑本身就是标题的那种布局。',
        en: '`size` changes only the type size (12 / 14 / 16px); spacing and separators follow in em. A breadcrumb is nearly always the least prominent text on a page, so `sm` and `md` cover almost everything — `lg` is for the layouts where the trail doubles as the heading.',
      },
      code: sizesSource,
      render: () => <BreadcrumbSizes />,
    },
    {
      id: 'separator',
      title: { zh: '分隔符', en: 'Separator' },
      description: {
        zh: '默认的 `/` 是等宽字体里最不抢戏的一个字符，也和路径的直觉一致。换成别的字符没问题——它带 `aria-hidden`，不会被读出来，所以纯粹是视觉选择；只要保证在你的字体里它是居中且窄的。',
        en: 'The default `/` is the least attention-seeking character in a monospaced face and matches how people read paths anyway. Swapping it is fine — it carries `aria-hidden` and is never announced, so the choice is purely visual. Just make sure the glyph you pick is narrow and optically centred in your font.',
      },
      code: separatorSource,
      render: () => <BreadcrumbSeparator />,
    },
    {
      id: 'client-routing',
      title: { zh: '接客户端路由', en: 'With client-side routing' },
      description: {
        zh: '同时传 `href` 与 `onClick` 时，组件会替你 `preventDefault` 再调 `onClick`——这样链接在新标签打开、复制地址时仍然是可用的真实 URL，而普通点击走客户端跳转。只传 `onClick` 会渲染成 `<button>`，但那就失去了可复制的地址，除非目标真的不是一个 URL，否则别这么做。',
        en: 'Give an item both `href` and `onClick` and the component calls `preventDefault` before your handler — so the link is still a real URL you can open in a new tab or copy, while an ordinary click goes through the router. Passing `onClick` alone renders a `<button>` instead, which throws away that copyable address; only do it when the destination genuinely is not a URL.',
      },
      code: clientRoutingSource,
      render: () => <BreadcrumbClientRouting />,
    },
  ],
  api: [
    {
      name: 'Breadcrumb',
      description: {
        zh: '渲染为 `<nav>` 包 `<ol>`，透传所有原生 nav 属性。',
        en: 'Renders a `<nav>` wrapping an `<ol>`, and forwards every native nav prop.',
      },
      props: [
        {
          name: 'items',
          type: 'BreadcrumbItem[]',
          description: {
            zh: '层级路径，从根到当前页。必填。最后一项被当作当前页处理。',
            en: 'The trail from root to current page. Required. The last entry is treated as the current page.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '字号。', en: 'Type size.' },
        },
        {
          name: 'separator',
          type: 'string',
          default: `'/'`,
          description: {
            zh: '层级之间的分隔符。带 `aria-hidden`，只影响视觉。',
            en: 'The glyph between levels. It is `aria-hidden`, so the choice is visual only.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，落在 `<nav>` 上。经 `tailwind-merge` 合并。',
            en: 'Extra classes on the `<nav>`, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'BreadcrumbItem',
      description: {
        zh: '`items` 里每一项的形状。三个字段的组合决定这一级渲染成什么元素。',
        en: 'The shape of each entry in `items`. Which element a level renders as depends on the combination of fields.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: { zh: '这一级显示的文字。必填。', en: 'The text for this level. Required.' },
        },
        {
          name: 'href',
          type: 'string',
          description: {
            zh: '有它就渲染成 `<a>`。最后一项的 `href` 会被忽略。',
            en: 'Present means an `<a>`. It is ignored on the last entry.',
          },
        },
        {
          name: 'onClick',
          type: '() => void',
          description: {
            zh: '只有 `onClick` 时渲染成 `<button>`；与 `href` 同时给出时，组件会 `preventDefault` 后调用它。',
            en: 'On its own it renders a `<button>`; combined with `href`, the component calls `preventDefault` first and then invokes it.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '根元素是带 `aria-label="Breadcrumb"` 的 `<nav>`，内层用 `<ol>` + `<li>`——顺序在面包屑里是有意义的，所以是有序列表而不是 `<ul>`。',
      en: 'The root is a `<nav>` labelled `aria-label="Breadcrumb"` containing an `<ol>` of `<li>` items — order is meaningful in a trail, so it is an ordered list, not a `<ul>`.',
    },
    {
      zh: '最后一项带 `aria-current="page"`，并且不是链接。这是读屏用户判断「我在哪」的关键信号，也是为什么组件不允许最后一级可点击。',
      en: 'The last entry carries `aria-current="page"` and is not a link. That is the signal a screen-reader user relies on to know where they are, and the reason the component refuses to make the final level clickable.',
    },
    {
      zh: '分隔符是带 `aria-hidden="true"` 的 `<span>`，同时 `select-none`——复制整条面包屑时不会把一串斜杠也带走。',
      en: 'Each separator is an `aria-hidden="true"` `<span>` that is also `select-none`, so copying the trail does not drag a row of slashes along with it.',
    },
    {
      zh: '既没有 `href` 也没有 `onClick` 的中间层级会渲染成不可聚焦的 `<span>`。视觉上它仍然是「可点」的灰色，容易误导——这类不可达的层级建议直接从 `items` 里去掉。',
      en: 'A middle level with neither `href` nor `onClick` renders as a non-focusable `<span>`. It still looks like the clickable grey, which is misleading; a level you cannot navigate to is better left out of `items` entirely.',
    },
    {
      zh: '链接与按钮共用同一套 `focus-visible` 轮廓（`outline-2` + `offset-2`），键盘 tab 过去时焦点位置很明确；颜色过渡都带 `motion-reduce:` 兜底。',
      en: 'Links and buttons share one `focus-visible` outline (`outline-2` plus `offset-2`), so tabbing through the trail always shows where focus is. The colour transitions have `motion-reduce:` fallbacks.',
    },
    {
      zh: '层级很深时不要靠 CSS 截断中间项。面包屑的价值就在于路径完整，需要收起就换成显式的「…」菜单，让键盘用户也能展开。',
      en: 'Do not truncate middle levels with CSS when the trail gets deep. A breadcrumb earns its keep by being complete; if it must collapse, use an explicit “…” menu that keyboard users can open.',
    },
  ],
}
