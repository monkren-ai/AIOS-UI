import { Sidebar } from 'aios-ui-kit/sidebar'
import type { ComponentDoc } from '../types'

import SidebarBasic from '../../examples/sidebar/basic'
import SidebarControlled from '../../examples/sidebar/controlled'

import basicSource from '../../examples/sidebar/basic.tsx?raw'
import controlledSource from '../../examples/sidebar/controlled.tsx?raw'

const PREVIEW_ITEMS = [
  { label: 'Overview', active: true },
  { label: 'Devices', badge: 3 },
  { label: 'Settings' },
]

export const sidebarDoc: ComponentDoc = {
  slug: 'sidebar',
  name: 'Sidebar',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '侧边导航，可折叠成一列图标，条目支持角标。',
    en: 'A side nav that collapses down to icons, with badges on its items.',
  },
  preview: () => (
    <div className="h-72 w-56 border border-border-visible">
      <Sidebar items={PREVIEW_ITEMS} />
    </div>
  ),
  importStatement: `import { Sidebar } from 'aios-ui-kit/sidebar'`,
  usageSnippet: `<Sidebar
  items={[
    { label: 'Overview', active: true },
    { label: 'Devices', badge: 3 },
    { label: 'Settings' },
  ]}
/>`,
  composition: {
    zh: '和 `Navigation` 一样，这不是靠 `children` 拼起来的复合组件——列表来自 `items` 数组，`header` 与 `footer` 是接受任意 `ReactNode` 的两个插槽 prop，不是子组件。根元素是 `<aside>`，自带 `role="navigation"` 与固定文案的 `aria-label`。折叠开关内建在组件里：不受控时点击顶部的箭头按钮就会在展开（`w-60`）与折叠（`w-15`，仅剩图标列）之间切换；宽度过渡靠 `transition-[width]`，没有额外的内容重排动画，折叠瞬间文字和角标直接消失（`{!isCollapsed && ...}`），不做淡出。',
    en: 'Like `Navigation`, this is not a `children`-composed component — the list comes from `items`, and `header` / `footer` are prop slots that accept any `ReactNode`, not sub-components. The root is an `<aside>` with a built-in `role="navigation"` and a fixed `aria-label`. Collapsing is built in: left uncontrolled, clicking the arrow button at the top toggles between expanded (`w-60`) and collapsed (`w-15`, icons only); the width transitions via `transition-[width]`, with no extra reflow animation — labels and badges disappear the instant it collapses (`{!isCollapsed && ...}`), no fade.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '每个条目是 `SidebarItem`：`icon` 放在文字前面，`badge` 接受字符串或数字，渲染成右侧的圆角小胶囊，折叠时和文字一起消失。条目本身渲染成 `<a>`，但点击永远被 `preventDefault`——`href` 只用来让链接可复制地址、可在新标签打开，真正的跳转/状态切换必须写在 `onClick` 里，就像这个例子用 `onClick` 手动维护 `active`。折叠后每个链接会带上 `title={item.label}`，鼠标悬停能看到原生 tooltip 补回丢失的文字标签。',
        en: 'Each entry is a `SidebarItem`: `icon` sits before the text, and `badge` accepts a string or number and renders as a small rounded pill on the right — it disappears along with the label when collapsed. Entries render as `<a>`, but the click is always prevented — `href` exists only so the link is copyable and openable in a new tab; the actual navigation or state change belongs in `onClick`, exactly as this example maintains `active` by hand. Once collapsed, each link gains `title={item.label}`, so hovering still surfaces the missing text label via the native tooltip.',
      },
      code: basicSource,
      render: () => <SidebarBasic />,
    },
    {
      id: 'controlled',
      title: { zh: '受控折叠', en: 'Controlled collapse' },
      description: {
        zh: '传 `collapsed` 就接管了折叠状态，组件内部的箭头按钮仍然可点，但只会调用 `onCollapsedChange`，不会自己翻转状态——这一点和 `DateNav` 受控后的箭头行为是同一个模式。需要从外部（比如页面顶部一个独立的按钮）联动折叠时用这个写法。',
        en: 'Passing `collapsed` takes over the collapse state: the built-in arrow button still responds to clicks, but only calls `onCollapsedChange` — it no longer flips the state itself, the same pattern `DateNav`’s arrows follow once controlled. Reach for this when something outside the sidebar (a separate button elsewhere on the page) needs to drive the collapse.',
      },
      code: controlledSource,
      render: () => <SidebarControlled />,
    },
  ],
  api: [
    {
      name: 'Sidebar',
      description: {
        zh: '渲染为 `<aside>`。除 `onChange` / `children` 外的原生 aside 属性与 `ref` 都透传（不接受 `children`，内容来自 `items` / `header` / `footer`）。',
        en: 'Renders an `<aside>`. Native aside props other than `onChange` / `children`, plus `ref`, are forwarded — it does not accept `children`; content comes from `items` / `header` / `footer`.',
      },
      props: [
        {
          name: 'items',
          type: 'SidebarItem[]',
          description: { zh: '导航条目。必填。', en: 'The navigation entries. Required.' },
        },
        {
          name: 'collapsed',
          type: 'boolean',
          description: {
            zh: '受控折叠状态。传了它，内建的折叠按钮就只调用 `onCollapsedChange`，不再自行切换。',
            en: 'The controlled collapse state. Once passed, the built-in toggle button only calls `onCollapsedChange` and stops flipping the state itself.',
          },
        },
        {
          name: 'onCollapsedChange',
          type: '(collapsed: boolean) => void',
          description: {
            zh: '点击内建折叠按钮时调用，携带切换后的新值。',
            en: 'Called when the built-in toggle is clicked, with the new value.',
          },
        },
        {
          name: 'header',
          type: 'React.ReactNode',
          description: {
            zh: '顶部自定义区，折叠时依然渲染（不会被隐藏或裁剪）。',
            en: 'A custom region at the top. It keeps rendering even when collapsed — nothing hides or clips it.',
          },
        },
        {
          name: 'footer',
          type: 'React.ReactNode',
          description: {
            zh: '底部自定义区，同样不受折叠状态影响。',
            en: 'A custom region at the bottom, likewise unaffected by the collapse state.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到 `<aside>` 的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the `<aside>`, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'SidebarItem',
      props: [
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '条目文字。必填。折叠时改用作链接的 `title`。',
            en: 'The entry text. Required. Reused as the link’s `title` when collapsed.',
          },
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: {
            zh: '文字前的图标。折叠时是唯一还可见的内容。',
            en: 'An icon before the label — the only thing still visible when collapsed.',
          },
        },
        {
          name: 'href',
          type: 'string',
          description: {
            zh: '让 `<a>` 可聚焦、可复制地址。点击始终被 `preventDefault`，不会真的导航。',
            en: 'Makes the `<a>` focusable with a copyable address. The click is always prevented, so it never actually navigates.',
          },
        },
        {
          name: 'onClick',
          type: '() => void',
          description: {
            zh: '点击时调用，负责真正的导航或状态切换。',
            en: 'Called on click — where the real navigation or state change belongs.',
          },
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '高亮当前项，落在背景色与文字色上。折叠时视觉上不再明显（只剩图标），建议配合 `title` 或图标本身的实心/描边差异。',
            en: 'Highlights the current entry via background and text colour. It reads much less clearly when collapsed (icon only) — consider pairing it with `title` or a filled-vs-outline icon difference.',
          },
        },
        {
          name: 'badge',
          type: 'string | number',
          description: {
            zh: '行末角标。折叠时和文字一起消失——折叠态下角标信息会完全丢失，没有替代展示。',
            en: 'A trailing badge. It disappears along with the label when collapsed — the information is lost entirely in the collapsed state, with no substitute shown.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '根元素带 `role="navigation"` 和固定的 `aria-label="Sidebar navigation"`（未国际化、不可通过 props 覆盖，需要中文场景时得自己在渲染后用 `aria-label` 属性覆盖或包一层）。',
      en: 'The root carries `role="navigation"` and a fixed `aria-label="Sidebar navigation"` — not localised and not overridable through props; override the `aria-label` attribute yourself after render, or wrap it, for other languages.',
    },
    {
      zh: '折叠按钮的 `aria-label` 会随状态在 `"Expand sidebar"` / `"Collapse sidebar"` 之间切换，读屏用户能听到「按下去会发生什么」而不是当前状态本身。箭头字形（`←`/`→`）会跟随 `useDirection()` 镜像，纯装饰，语义完全由 `aria-label` 承担。',
      en: 'The toggle button’s `aria-label` switches between `"Expand sidebar"` and `"Collapse sidebar"` with the state, so a screen reader announces what pressing it will do, not the current state itself. The arrow glyph (`←`/`→`) mirrors with `useDirection()` and is purely decorative — the label carries all the meaning.',
    },
    {
      zh: '折叠后条目的可访问名称完全依赖链接的 `title` 属性——`title` 只在鼠标悬停时以原生 tooltip 呈现，多数触屏设备和部分读屏软件不会读出 `title`。折叠态下条目对纯键盘或触屏用户可能变成「看得到图标、不知道叫什么」，这是当前实现的已知局限。',
      en: 'Once collapsed, an entry’s accessible name depends entirely on the link’s `title` attribute — which only surfaces as a native tooltip on hover, and is not consistently announced by touch devices or some screen readers. For keyboard-only or touch users, a collapsed entry can end up as “an icon with no discoverable name”, a known limitation of the current implementation.',
    },
    {
      zh: '列表项容器 `<li>` 目前没有可视焦点样式，真正的 `focus-visible` 轮廓画在里面的 `<a>` 上（`z-1` + 向内偏移的 `outline`），Tab 键逐个经过链接，顺序即 `items` 数组顺序。',
      en: 'The `<li>` wrapper carries no focus styling of its own; the real `focus-visible` outline is drawn on the inner `<a>` (`z-1` plus an inset outline). Tab walks the links one by one, in the order `items` lists them.',
    },
    {
      zh: '侧栏靠 `border-e`（逻辑属性）而不是 `border-right` 分隔内容区，RTL 下会自动挪到右侧、跟内容区的相对位置保持不变，不需要额外的 RTL 样式覆盖。',
      en: 'The divider between the sidebar and the content uses `border-e` (a logical property) rather than `border-right`, so it moves to the right automatically under RTL while keeping the same relative position to the content — no extra RTL override needed.',
    },
  ],
}
