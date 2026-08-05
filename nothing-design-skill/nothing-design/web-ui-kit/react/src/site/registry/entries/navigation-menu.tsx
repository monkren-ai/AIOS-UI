import { NavigationMenu } from 'nothing-ui/navigation-menu'
import type { ComponentDoc } from '../types'

import NavigationMenuBasic from '../../examples/navigation-menu/basic'
import NavigationMenuVertical from '../../examples/navigation-menu/vertical'
import NavigationMenuClientRouting from '../../examples/navigation-menu/client-routing'
import NavigationMenuFocusableItems from '../../examples/navigation-menu/focusable-items'

import basicSource from '../../examples/navigation-menu/basic.tsx?raw'
import verticalSource from '../../examples/navigation-menu/vertical.tsx?raw'
import clientRoutingSource from '../../examples/navigation-menu/client-routing.tsx?raw'
import focusableItemsSource from '../../examples/navigation-menu/focusable-items.tsx?raw'

const PREVIEW_ITEMS = [
  { label: 'Home', href: '#home', active: true },
  { label: 'Products', href: '#products', children: [{ label: 'Phone', href: '#phone' }] },
  { label: 'Support', href: '#support' },
]

export const navigationMenuDoc: ComponentDoc = {
  slug: 'navigation-menu',
  name: 'NavigationMenu',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '带下拉面板的主导航。',
    en: 'A primary navigation bar with dropdown panels.',
  },
  preview: () => <NavigationMenu items={PREVIEW_ITEMS} />,
  importStatement: `import { NavigationMenu } from 'nothing-ui/navigation-menu'`,
  usageSnippet: `<NavigationMenu
  items={[
    { label: 'Home', href: '/', active: true },
    {
      label: 'Products',
      href: '/products',
      children: [
        { label: 'Phone', href: '/phone' },
        { label: 'Ear', href: '/ear' },
      ],
    },
  ]}
/>`,
  composition: {
    zh: '整棵树由 `items` 递归生成，只有两层：顶层条目，以及可选的一层 `children` 子菜单。结构是 `<nav> → <ul role="menubar"> → <li> → <a role="menuitem">`，有 `children` 的条目在同一个 `<li>` 里再挂一个 `role="menu"` 的绝对定位面板——所以父级不能是 `overflow: hidden`，否则子菜单会被裁掉（它不走 Portal）。展开状态由组件内部管理，同一时刻只有一个子菜单打开，点外部会关掉。没有第三层：`children` 里再写 `children` 会被忽略。',
    en: 'The whole tree is generated from `items`, and it is exactly two levels deep: top-level entries plus one optional layer of `children`. The structure is `<nav> → <ul role="menubar"> → <li> → <a role="menuitem">`, with a `children` entry hanging an absolutely positioned `role="menu"` panel inside the same `<li>`. That panel is not portalled, so an ancestor with `overflow: hidden` will clip it. Open state lives inside the component: one submenu at a time, and a click outside closes it. There is no third level — `children` nested inside `children` is ignored.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '有 `children` 的条目会长出一个三角标记，点击展开、再点收起，点别处关闭。注意顶层链接的默认行为总是被 `preventDefault` 掉——就算给了 `href`，点击也不会真的跳转，导航要靠 `onClick` 自己做。`href` 在这里的作用是让 `<a>` 可聚焦、可复制地址、可在新标签打开。',
        en: 'An entry with `children` grows a caret: click to open, click again to close, click anywhere outside to dismiss. Note that the default action on a top-level link is always prevented — even with an `href`, clicking will not navigate, so you do that yourself in `onClick`. What the `href` buys you is a focusable `<a>` with a copyable address that still opens in a new tab.',
      },
      code: basicSource,
      render: () => <NavigationMenuBasic />,
    },
    {
      id: 'vertical',
      title: { zh: '纵向', en: 'Vertical' },
      description: {
        zh: '`orientation="vertical"` 把列表竖过来，子菜单改为从行末侧展开（`start-full`，RTL 下自动挪到另一边），同时 `role` 从 `menubar` 换成 `menu`。方向键也跟着换轴：上下移动焦点，朝行末的那个横向键展开子菜单。侧边栏导航用这个。',
        en: '`orientation="vertical"` stacks the list and flies submenus out from the end of the line (`start-full`, which mirrors under RTL), and swaps the `role` from `menubar` to `menu`. The keys follow the axis: up and down move focus, and the horizontal key pointing towards the end of the line opens a submenu. This is the shape for a sidebar.',
      },
      code: verticalSource,
      render: () => <NavigationMenuVertical />,
    },
    {
      id: 'client-routing',
      title: { zh: '接客户端路由', en: 'With client-side routing' },
      description: {
        zh: '`active` 需要你根据当前路由自己算，组件不知道你在哪个页面。子菜单项被点中后菜单会自动关闭，不用手动收。给父条目也算一个「子路由命中时也算激活」的 `active`，用户才看得出自己在哪一支下面。',
        en: 'You compute `active` from your own router — the component has no idea what page you are on. Choosing a submenu item closes the menu automatically, so there is nothing to dismiss by hand. Mark the parent active whenever any of its children matches, or the user loses track of which branch they are inside.',
      },
      code: clientRoutingSource,
      render: () => <NavigationMenuClientRouting />,
    },
    {
      id: 'focusable-items',
      title: { zh: '为什么每一项都该有 href', en: 'Why every entry needs an href' },
      description: {
        zh: '条目渲染成 `<a>`，而没有 `href` 的 `<a>` 不可聚焦。所以只给 `onClick`、不给 `href` 的条目，鼠标点得到、键盘永远够不着——这是这个组件目前最容易踩的坑。哪怕是纯 JS 动作，也请给一个真实的 `href`，让 `onClick` 去接管跳转。',
        en: 'Entries render as `<a>`, and an `<a>` without an `href` is not focusable. An entry that only has `onClick` is therefore clickable with a mouse and permanently out of reach from the keyboard — the easiest mistake to make with this component. Give it a real `href` even when the action is pure JavaScript, and let `onClick` take over the navigation.',
      },
      code: focusableItemsSource,
      render: () => <NavigationMenuFocusableItems />,
    },
  ],
  api: [
    {
      name: 'NavigationMenu',
      description: {
        zh: '渲染为 `<nav>`。除 `children` 外的原生 nav 属性与 `ref` 都透传（`children` 被 `items` 取代，传了也没用）。',
        en: 'Renders a `<nav>`. Native nav props and `ref` are forwarded, except `children` — `items` replaces it and anything you pass is ignored.',
      },
      props: [
        {
          name: 'items',
          type: 'NavMenuItem[]',
          description: { zh: '导航条目。必填。', en: 'The navigation entries. Required.' },
        },
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: {
            zh: '排列方向。同时决定 `role`（`menubar` / `menu`）、子菜单展开方向与方向键的轴。',
            en: 'Layout axis. It also decides the `role` (`menubar` or `menu`), which way submenus fly out, and which arrows navigate.',
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
      name: 'NavMenuItem',
      description: {
        zh: '`items` 与 `children` 数组的元素类型。这个类型目前没有从包里导出，需要标注时请自己声明结构。',
        en: 'The element type of both `items` and `children`. It is not exported from the package today, so declare the shape yourself if you need to annotate it.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: { zh: '条目文字。必填。', en: 'The entry’s text. Required.' },
        },
        {
          name: 'href',
          type: 'string',
          description: {
            zh: '链接地址。强烈建议给：没有它 `<a>` 就不可聚焦。点击行为始终被 `preventDefault`。',
            en: 'The link target. Strongly recommended: without it the `<a>` is not focusable. The click itself is always prevented.',
          },
        },
        {
          name: 'onClick',
          type: '() => void',
          description: {
            zh: '点击 / Enter / Space 时调用。有 `children` 的条目会改为切换子菜单，`onClick` 不触发。',
            en: 'Called on click, Enter, or Space. On an entry that has `children` the interaction toggles the submenu instead and `onClick` never fires.',
          },
        },
        {
          name: 'children',
          type: 'NavMenuItem[]',
          description: {
            zh: '一层子菜单。只支持一层，再往下嵌套会被忽略。',
            en: 'One level of submenu. Only one — deeper nesting is ignored.',
          },
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '当前页高亮，落在 `<li>` 的 `data-active` 与链接的文字颜色上。',
            en: 'Highlights the current page, via `data-active` on the `<li>` and a brighter link colour.',
          },
        },
      ],
    },
    {
      name: 'navigationMenuVariants',
      description: {
        zh: '各部件的 CVA 函数：`navigationMenuVariants`、`navigationMenuListVariants`、`navigationMenuItemVariants`、`navigationMenuLinkVariants`、`navigationMenuCaretVariants`、`navigationMenuSubmenuVariants`、`navigationMenuSubmenuItemVariants`、`navigationMenuSubmenuLinkVariants`。',
        en: 'The CVA function per part: `navigationMenuVariants`, `navigationMenuListVariants`, `navigationMenuItemVariants`, `navigationMenuLinkVariants`, `navigationMenuCaretVariants`, `navigationMenuSubmenuVariants`, `navigationMenuSubmenuItemVariants`, and `navigationMenuSubmenuLinkVariants`.',
      },
      props: [
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: {
            zh: '`navigationMenuVariants` / `List` / `Submenu` 接受。',
            en: 'Accepted by `navigationMenuVariants`, `…ListVariants`, and `…SubmenuVariants`.',
          },
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅 `navigationMenuLinkVariants` 接受。',
            en: 'Accepted by `navigationMenuLinkVariants` only.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '横向时列表是 `role="menubar"`，纵向时是 `role="menu"`，条目一律 `role="menuitem"`。有子菜单的条目带 `aria-haspopup="menu"` 与随开合更新的 `aria-expanded`。',
      en: 'The list is a `role="menubar"` when horizontal and a `role="menu"` when vertical; entries are always `role="menuitem"`. An entry with a submenu carries `aria-haspopup="menu"` and an `aria-expanded` that tracks the open state.',
    },
    {
      zh: '顶层方向键在条目间循环移动（到头会绕回另一端），键位跟随书写方向：LTR 下右键往后走，RTL 下左键往后走。纵向时改用上下键，横向的「朝行末」键用来展开子菜单。',
      en: 'At the top level the arrows cycle through entries, wrapping around at either end, and follow the writing direction: right moves forward in LTR, left moves forward in RTL. When vertical, up and down take over and the “towards the end of the line” key opens the submenu instead.',
    },
    {
      zh: '子菜单打开后，上下键在子项间移动，Enter / Space 选中并关闭，Esc 关闭并把焦点还给触发它的顶层条目——焦点不会掉回页面开头。子项用 roving tabindex：只有当前高亮项是 `tabIndex=0`，其余是 -1，菜单关着时全是 -1。',
      en: 'Once a submenu is open, up and down move between its items, Enter or Space picks one and closes, and Escape closes and returns focus to the entry that opened it — focus never falls back to the top of the page. The items use a roving tabindex: the highlighted one is `tabIndex=0`, the rest are -1, and everything is -1 while the menu is closed.',
    },
    {
      zh: '顶层条目**不是** roving tabindex：每个有 `href` 的链接都在 tab 序列里，所以 Tab 会逐个走过去。这偏离了 WAI-ARIA 的 menubar 模式（整条应该只占一格），但对由链接组成的站点导航来说，这个行为反而更接近用户预期。',
      en: 'The top level does **not** use a roving tabindex: every entry with an `href` sits in the tab order, so Tab walks through them one by one. That departs from the WAI-ARIA menubar pattern, where the whole bar should be a single stop — but for site navigation made of real links it is closer to what people expect.',
    },
    {
      zh: '没有 `href` 的条目渲染成不可聚焦的 `<a>`，键盘完全无法到达，方向键也会跳过它（`focus()` 对它无效）。请给每个条目都传 `href`。',
      en: 'An entry without an `href` renders as a non-focusable `<a>`: unreachable by keyboard, and skipped by the arrows too, since `focus()` does nothing on it. Give every entry an `href`.',
    },
    {
      zh: '子菜单收起时仍然留在 DOM 里（`invisible` + `opacity-0`）以便做淡入淡出。`visibility: hidden` 会把内容从可访问性树里摘掉，所以读屏不会读到收起的子项——但它没有加 `hidden` 属性，如果你覆盖掉这些类名，记得自己补上。',
      en: 'A closed submenu stays in the DOM (`invisible` plus `opacity-0`) so it can fade. `visibility: hidden` does remove it from the accessibility tree, so closed items are not announced — but there is no `hidden` attribute backing that up, so if you override those classes, add one yourself.',
    },
    {
      zh: '三角标记是 `aria-hidden` 的纯 CSS 边框三角，读屏不会念它；「这里有下拉」的信息由 `aria-haspopup` 传达。所有颜色与位移过渡都带 `motion-reduce:` 兜底。',
      en: 'The caret is a decorative CSS triangle marked `aria-hidden`; the “there is a menu here” information comes from `aria-haspopup` instead. Every colour and transform transition has a `motion-reduce:` fallback.',
    },
  ],
}
