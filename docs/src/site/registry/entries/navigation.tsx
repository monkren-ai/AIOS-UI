import { Navigation } from 'aios-ui-kit/navigation'
import type { ComponentDoc } from '../types'

import NavigationBasic from '../../examples/navigation/basic'
import NavigationVariants from '../../examples/navigation/variants'

import basicSource from '../../examples/navigation/basic.tsx?raw'
import variantsSource from '../../examples/navigation/variants.tsx?raw'

const PREVIEW_ITEMS = [{ label: 'Overview' }, { label: 'Devices' }, { label: 'Support' }]

export const navigationDoc: ComponentDoc = {
  slug: 'navigation',
  name: 'Navigation',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '横向导航条，指示条滑向选中项，并与 URL hash 双向同步。',
    en: 'A horizontal nav bar whose indicator slides to the active item and tracks the URL hash.',
  },
  preview: () => <Navigation items={PREVIEW_ITEMS} activeIndex={0} syncWithUrl={false} />,
  importStatement: `import { Navigation } from 'aios-ui-kit/navigation'`,
  usageSnippet: `<Navigation
  items={[{ label: 'Overview' }, { label: 'Devices' }, { label: 'Support' }]}
/>`,
  composition: {
    zh: '不是复合组件——整条导航由 `items` 数组和几个布尔 prop 驱动，没有子组件要拼。真正需要小心的是 `syncWithUrl`：它默认是 `true`，挂载时会读一次 `window.location.hash` 去匹配某个 `item.slug`（缺省则由 `label` 小写去标点生成），点击条目会调用 `history.replaceState` 把这个 slug 写回地址栏，同时监听 `hashchange` 响应浏览器前进/后退。这对**页面级的主导航**是合理的默认值，但会真的改写当前页面的 URL——本页下方两个示例因此都显式传了 `syncWithUrl={false}`，否则在文档站里点一下就会把你带离这篇文档的锚点。把它嵌入任何不代表真实路由的地方（模态框内的分段导航、演示、这份文档本身）都应该关掉它。',
    en: 'This is not a compound component — the whole bar is driven by the `items` array plus a few booleans, nothing to assemble. The one prop that needs real care is `syncWithUrl`: it defaults to `true`, reads `window.location.hash` once on mount to match an `item.slug` (derived by lower-casing and slugging `label` if you do not supply one), calls `history.replaceState` to write that slug back to the address bar on every click, and listens for `hashchange` to follow the browser’s back/forward buttons. That default makes sense for **page-level primary navigation**, but it genuinely rewrites the current page’s URL — which is why both examples below pass `syncWithUrl={false}` explicitly; without it, clicking one inside this documentation site would hijack the page’s own anchor. Turn it off anywhere that is not real routing: a segmented nav inside a modal, a demo, or this very page.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '`items` 只需要 `label`；选中项由 `activeIndex` 受控，`onChange` 拿到新的下标。滑动的指示条位置是拿 `getBoundingClientRect` 量出来的，所以首次渲染和窗口缩放都会重新计算——如果导航条本身在一个会做进场动画的容器里，指示条可能会在动画途中量到错误的位置，这种情况下建议动画结束后手动触发一次 `resize` 事件或让 `activeIndex` 变化一次来纠正。',
        en: 'Every entry needs only a `label`; the selection is controlled through `activeIndex`, and `onChange` hands back the new index. The sliding indicator’s position comes from `getBoundingClientRect`, recomputed on first render and on window resize — if the bar itself sits inside a container that animates into place, the indicator can measure mid-animation and land wrong; nudge it right afterwards with a manual `resize` event or a change to `activeIndex`.',
      },
      code: basicSource,
      render: () => <NavigationBasic />,
    },
    {
      id: 'variants',
      title: { zh: '变体与返回按钮', en: 'Variants and the back button' },
      description: {
        zh: '`bracket` 用方括号包住选中项的文字，没有滑动指示条（`showIndicator` 在这个变体下自动为 `false`）；`pipe` 在条目间插入竖线分隔符。`showBack` 会在最前面加一个圆形返回箭头，点击调用 `onBack`——它和导航状态无关，纯粹是个回调，是否要连带把 `activeIndex` 拨回上一级由你自己决定。窄屏（`max-width: 768px`）下整条导航会固定到视口底部变成标签栏，返回按钮则钉在左上角，这个断点目前没有 prop 可调。',
        en: '`bracket` wraps the active label in square brackets and has no sliding indicator (`showIndicator` is automatically `false` for it); `pipe` inserts vertical-bar separators between entries. `showBack` prepends a round back arrow that calls `onBack` on click — a plain callback disconnected from navigation state, so whether it also winds `activeIndex` back a step is entirely up to you. Below 768px the whole bar pins to the bottom of the viewport as a tab bar and the back button moves to the top-left corner; that breakpoint has no prop to adjust it today.',
      },
      code: variantsSource,
      render: () => <NavigationVariants />,
    },
  ],
  api: [
    {
      name: 'Navigation',
      description: {
        zh: '渲染为 `<nav>`。除 `onChange` / `children` 外的原生 nav 属性与 `ref` 都透传（组件不接受 `children`，内容完全来自 `items`）。',
        en: 'Renders a `<nav>`. Native nav props other than `onChange` / `children`, plus `ref`, are forwarded — the component does not accept `children`; content comes entirely from `items`.',
      },
      props: [
        {
          name: 'items',
          type: 'NavItem[]',
          description: { zh: '导航条目。必填。', en: 'The navigation entries. Required.' },
        },
        {
          name: 'activeIndex',
          type: 'number',
          description: {
            zh: '受控选中下标。不传则内部维护，默认从 `0` 开始。',
            en: 'The controlled selected index. Left unset, the component manages it internally, starting at `0`.',
          },
        },
        {
          name: 'onChange',
          type: '(index: number) => void',
          description: {
            zh: '选中项变化时调用——点击条目或 hash 同步命中新条目都会触发。',
            en: 'Fires when the selection changes — from a click, or from a hash-sync match.',
          },
        },
        {
          name: 'variant',
          type: `'default' | 'bracket' | 'pipe'`,
          default: `'default'`,
          description: {
            zh: '选中态的视觉表达。`bracket` 会关闭滑动指示条。',
            en: 'How the active item is shown. `bracket` turns off the sliding indicator.',
          },
        },
        {
          name: 'showBack',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '是否在最前面渲染返回按钮。',
            en: 'Whether to render a leading back button.',
          },
        },
        {
          name: 'onBack',
          type: '() => void',
          description: {
            zh: '返回按钮的点击回调，与选中状态无关。',
            en: 'The back button’s click handler. Independent of selection state.',
          },
        },
        {
          name: 'syncWithUrl',
          type: 'boolean',
          default: 'true',
          description: {
            zh: '是否与 `location.hash` 双向同步（挂载读取 + 点击写回 + 监听 `hashchange`）。嵌入非路由场景务必设为 `false`。',
            en: 'Whether to two-way sync with `location.hash` (read on mount, write on click, listen for `hashchange`). Set to `false` anywhere that is not real routing.',
          },
        },
        {
          name: 'scrollIntoView',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅当 `syncWithUrl` 为真时生效：命中新 hash 时是否把 `id` 匹配的元素平滑滚动进视口。',
            en: 'Only takes effect when `syncWithUrl` is on: whether to smooth-scroll the element whose `id` matches the new hash into view.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到 `<nav>` 的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the `<nav>`, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'NavItem',
      description: {
        zh: '`items` 数组的元素类型。',
        en: 'The element type of the `items` array.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '条目文字。必填，`slug` 缺省时也从它派生。',
            en: 'The entry text. Required, and also the fallback source for `slug`.',
          },
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: { zh: '文字前的图标。', en: 'An icon before the label.' },
        },
        {
          name: 'slug',
          type: 'string',
          description: {
            zh: 'URL hash 用的标识。不传则由 `label` 转小写、非字母数字替换成连字符生成。',
            en: 'The identifier used for the URL hash. Falls back to `label`, lower-cased with non-alphanumerics turned into hyphens.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '每个条目是原生 `<button>`，没有 `role="tablist"` / `role="tab"` 之类的 ARIA 模式——语义上更接近一组按钮，而不是标签页。选中项带 `aria-current="page"`，这是读屏用户判断当前位置的主要信号。',
      en: 'Each entry is a native `<button>`, with no `role="tablist"` / `role="tab"` pattern layered on — semantically closer to a row of buttons than a tab strip. The active one carries `aria-current="page"`, the main signal a screen reader uses to report the current position.',
    },
    {
      zh: '条目按 Tab 顺序逐个可达（不是 roving tabindex），键盘用户按几次 Tab 就经过几个条目；这和顶层站点导航的预期一致，但如果条目很多，会占用比 `Tabs` 更多的 Tab 停靠点。',
      en: 'Entries sit in the ordinary tab order one by one (no roving tabindex) — a keyboard user passes through as many Tab presses as there are entries. That matches expectations for top-level site navigation, but with many entries it costs more Tab stops than `Tabs` would.',
    },
    {
      zh: '滑动指示条是 `aria-hidden` 的纯装饰层，位置写在 `inset-inline-start` 上并按 `useDirection()` 的书写方向换算，RTL 下自动镜像；过渡带 `motion-reduce:transition-none`。',
      en: 'The sliding indicator is a decorative `aria-hidden` layer, positioned via `inset-inline-start` and computed against `useDirection()`’s writing direction, so it mirrors automatically under RTL; its transition carries `motion-reduce:transition-none`.',
    },
    {
      zh: '返回按钮的 SVG 图标带 `aria-hidden="true"`，按钮本身的可访问名称来自固定的 `aria-label="Go back"`（未国际化，需要别的语言时自己覆盖）。',
      en: 'The back button’s SVG icon is `aria-hidden="true"`; the button’s own accessible name comes from a fixed `aria-label="Go back"` (not localised — override it yourself for other languages).',
    },
    {
      zh: '窄屏下导航条会用 `position: fixed` 钉在视口底部，覆盖在页面内容之上（`z-100`）。这段样式目前没有 `env(safe-area-inset-bottom)` 之类的安全区处理，全面屏手机上贴底的 home indicator 可能会和标签栏重叠。',
      en: 'Below the mobile breakpoint the bar pins to the bottom of the viewport with `position: fixed`, sitting above page content (`z-100`). It does not account for `env(safe-area-inset-bottom)` yet, so on notched or gesture-bar phones the tab strip can overlap the home indicator.',
    },
  ],
}
