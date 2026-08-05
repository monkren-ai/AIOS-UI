import { DropdownMenu } from 'nothing-ui/dropdown-menu'
import type { ComponentDoc } from '../types'

import DropdownMenuBasic from '../../examples/dropdown-menu/basic'
import DropdownMenuIconsAndShortcuts from '../../examples/dropdown-menu/icons-and-shortcuts'
import DropdownMenuGroups from '../../examples/dropdown-menu/groups'
import DropdownMenuPlacement from '../../examples/dropdown-menu/placement'
import DropdownMenuMenubar from '../../examples/dropdown-menu/menubar'

import basicSource from '../../examples/dropdown-menu/basic.tsx?raw'
import iconsAndShortcutsSource from '../../examples/dropdown-menu/icons-and-shortcuts.tsx?raw'
import groupsSource from '../../examples/dropdown-menu/groups.tsx?raw'
import placementSource from '../../examples/dropdown-menu/placement.tsx?raw'
import menubarSource from '../../examples/dropdown-menu/menubar.tsx?raw'

export const dropdownMenuDoc: ComponentDoc = {
  slug: 'dropdown-menu',
  name: 'DropdownMenu',
  category: 'overlays',
  status: 'stable',
  baseUi: 'Menu / Menubar',
  description: {
    zh: '由按钮触发的动作菜单，支持图标、快捷键提示与分隔线；`variant="menubar"` 变成一整条桌面式菜单栏。',
    en: 'A button-triggered action menu with icons, shortcut hints, and separators; `variant="menubar"` turns it into a full desktop-style menu bar.',
  },
  preview: () => (
    <DropdownMenu
      trigger="Actions ▾"
      items={[{ label: 'Rename' }, { label: 'Duplicate' }, { label: 'Move to…' }]}
    />
  ),
  importStatement: `import { DropdownMenu } from 'nothing-ui/dropdown-menu'`,
  usageSnippet: `<DropdownMenu
  trigger="Actions ▾"
  items={[
    { label: 'Rename', onClick: rename },
    { separator: true },
    { label: 'Delete', onClick: remove },
  ]}
/>`,
  composition: {
    zh: '这是数据驱动的 API，不是组合式的：菜单项走 `items` 数组，组件负责 trigger、Portal 浮层和每一行的渲染。好处是没人会漏掉 `role`，代价是每项只能装图标 + 文字 + 快捷键这三格；需要在菜单里塞任意内容，请直接组合 Base UI 的 `Menu`。`variant` 会切到两套完全不同的实现：`default` 是单个 `Menu.Root`，`items` 是 `DropdownMenuItem[]`；`menubar` 包在 `Menubar` 里，`items` 变成 `MenubarItem[]`（每项自带一组子项），此时 `trigger`、`align`、`side` 全部被忽略。',
    en: 'This is a data-driven API rather than a compositional one: items come in through the `items` array, and the component owns the trigger, the portalled popup, and the rendering of every row. Nobody can forget a `role`, but each row is limited to three slots — icon, label, shortcut. If you need arbitrary content in a menu, compose Base UI’s `Menu` directly. `variant` switches between two genuinely different implementations: `default` is a single `Menu.Root` and `items` is `DropdownMenuItem[]`; `menubar` wraps everything in `Menubar` and `items` becomes `MenubarItem[]`, each with its own nested list — and in that mode `trigger`, `align`, and `side` are all ignored.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`trigger` 是 `ReactNode`，会被塞进 Base UI 的 `Menu.Trigger`（一个真的 `<button>`），所以传字符串就够了，不用自己包按钮。菜单项的 `label` 是可选的，但除了分隔线以外都应该给——没有 label 的项会渲染成一行空白。',
        en: '`trigger` is a `ReactNode` placed inside Base UI’s `Menu.Trigger`, which is a real `<button>`, so a plain string is enough and you do not wrap one yourself. An item’s `label` is optional in the type, but anything other than a separator should carry one: without it the row renders as blank space.',
      },
      code: basicSource,
      render: () => <DropdownMenuBasic />,
    },
    {
      id: 'icons-and-shortcuts',
      title: { zh: '图标与快捷键', en: 'Icons and shortcuts' },
      description: {
        zh: '`icon` 占起始侧的 16px 方格，`shortcut` 贴在行末。要强调的是 `shortcut` 只是一行提示文字，组件不会去监听按键——真正的快捷键得你自己在应用层绑。图标尺寸也由你控制，组件不缩放，示例里统一写了 `size-4`。',
        en: '`icon` fills a 16px square on the inline-start side and `shortcut` sits at the end of the row. Worth stressing: `shortcut` is a label and nothing more — the component never listens for the keystroke, so the actual binding is yours to wire up at the app level. Sizing is yours too; the component does not scale the glyph, which is why the examples all pass `size-4`.',
      },
      code: iconsAndShortcutsSource,
      render: () => <DropdownMenuIconsAndShortcuts />,
    },
    {
      id: 'groups',
      title: { zh: '分隔与禁用', en: 'Separators and disabled items' },
      description: {
        zh: '`{ separator: true }` 自成一项，渲染为 `Menu.Separator`（带 `role="separator"`），不会顺带渲染文字。分隔线的意义是把「安全的操作」和「会造成损失的操作」分开，让人不至于凭肌肉记忆点到最后一项。`disabled` 的项仍然留在菜单里、仍然会被读屏软件读到——这是对的，隐藏一个存在的功能只会让人以为自己记错了。',
        en: '`{ separator: true }` is an item of its own, rendered as a `Menu.Separator` with `role="separator"`, and it never carries a label alongside it. The point of a rule is to keep safe actions away from lossy ones so muscle memory does not land on the last row by accident. A `disabled` item stays in the menu and stays announced by screen readers — which is right, since hiding a feature that exists only makes people think they misremembered it.',
      },
      code: groupsSource,
      render: () => <DropdownMenuGroups />,
    },
    {
      id: 'placement',
      title: { zh: '对齐与方向', en: 'Alignment and side' },
      description: {
        zh: '`align` 决定浮层沿 trigger 的哪一端对齐，`side` 决定挂在哪一侧，两者都交给 Base UI 的 Positioner，空间不够时会自动调整。靠右的 trigger 配 `align="end"` 能避免浮层探出容器；`align` 的 CVA 档位本身不产出任何类名，只是把值写进 `data-align` 供你选择。',
        en: '`align` picks which end of the trigger the popup lines up with and `side` picks which edge it hangs off; both go to Base UI’s positioner, which adjusts when space is short. A trigger near the right edge pairs well with `align="end"` so the popup does not reach outside its container. The `align` CVA variant emits no classes of its own — it only writes the value into `data-align` for you to select on.',
      },
      code: placementSource,
      render: () => <DropdownMenuPlacement />,
    },
    {
      id: 'menubar',
      title: { zh: '菜单栏', en: 'Menu bar' },
      description: {
        zh: '`variant="menubar"` 是给桌面式应用准备的：一排顶层标题，每个下面挂一组命令。它不是 `default` 的样式变体，而是另一棵组件树——`items` 的类型换成 `MenubarItem[]`，`trigger` / `align` / `side` 不再有意义。Base UI 的 `Menubar` 会让左右方向键在顶层标题间移动，且一旦有菜单打开，滑过其它标题就直接切换，不用每次都点。',
        en: '`variant="menubar"` is for desktop-shaped applications: a row of top-level titles, each holding a set of commands. It is not a styling variant of `default` but a different component tree — `items` becomes `MenubarItem[]`, and `trigger`, `align`, and `side` stop meaning anything. Base UI’s `Menubar` moves between the titles with the left and right arrows, and once one menu is open, hovering a neighbouring title switches to it without another click.',
      },
      code: menubarSource,
      render: () => <DropdownMenuMenubar />,
    },
  ],
  api: [
    {
      name: 'DropdownMenu',
      description: {
        zh: '除下表属性外，原生 `<div>` 属性透传到最外层容器（`default` 下是包住 trigger 的 `<div>`，`menubar` 下是 `Menubar` 本身）；`ref` 同样指向那里，不是浮层。',
        en: 'Native `<div>` props other than those below go to the outer wrapper — the `<div>` around the trigger in `default`, the `Menubar` element itself in `menubar` — and `ref` points there too, not at the popup.',
      },
      props: [
        {
          name: 'items',
          type: 'DropdownMenuItem[] | MenubarItem[]',
          description: {
            zh: '菜单内容。具体类型由 `variant` 决定。',
            en: 'The menu contents; which type applies depends on `variant`.',
          },
        },
        {
          name: 'trigger',
          type: 'ReactNode',
          description: {
            zh: '触发按钮里的内容。`variant="menubar"` 时忽略。',
            en: 'What goes inside the trigger button. Ignored when `variant="menubar"`.',
          },
        },
        {
          name: 'variant',
          type: `'default' | 'menubar'`,
          default: `'default'`,
          description: {
            zh: '单个下拉菜单，还是一整条菜单栏。',
            en: 'A single dropdown, or a whole menu bar.',
          },
        },
        {
          name: 'align',
          type: `'start' | 'center' | 'end'`,
          default: `'start'`,
          description: {
            zh: '浮层沿 trigger 的对齐方式。`menubar` 下忽略（固定 `start`）。',
            en: 'How the popup aligns against the trigger. Ignored in `menubar`, which is fixed to `start`.',
          },
        },
        {
          name: 'side',
          type: `'top' | 'right' | 'bottom' | 'left'`,
          default: `'bottom'`,
          description: {
            zh: '浮层挂在哪一侧。`menubar` 下忽略（固定 `bottom`）。',
            en: 'Which side the popup hangs off. Ignored in `menubar`, which is fixed to `bottom`.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到最外层容器的类名，不会落到浮层上。',
            en: 'Extra classes on the outer wrapper; these do not reach the popup.',
          },
        },
      ],
    },
    {
      name: 'DropdownMenuItem',
      description: {
        zh: '`variant="default"` 时 `items` 的元素类型。所有字段都是可选的，所以分隔线只写 `{ separator: true }` 就行。',
        en: 'The element type of `items` when `variant="default"`. Every field is optional, which is why a rule is just `{ separator: true }`.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: { zh: '显示文字。', en: 'The visible text.' },
        },
        {
          name: 'onClick',
          type: '() => void',
          description: {
            zh: '选中回调。选中后菜单由 Base UI 自动关闭。',
            en: 'Selection handler. Base UI closes the menu afterwards.',
          },
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description: {
            zh: '起始侧的图标，尺寸由你决定。',
            en: 'An icon on the inline-start side; you decide its size.',
          },
        },
        {
          name: 'shortcut',
          type: 'string',
          description: {
            zh: '行末的快捷键提示。纯展示，不绑定按键。',
            en: 'A shortcut hint at the end of the row. Display only — it binds nothing.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用该项：置灰、关掉指针事件，并跳过键盘导航。',
            en: 'Disable the row: dimmed, no pointer events, and skipped by keyboard navigation.',
          },
        },
        {
          name: 'separator',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '把这一项渲染成分隔线，此时其它字段都不生效。',
            en: 'Render this entry as a rule instead; the other fields stop applying.',
          },
        },
      ],
    },
    {
      name: 'MenubarItem',
      description: {
        zh: '`variant="menubar"` 时 `items` 的元素类型：一个顶层标题加它的下拉内容。注意子项里的 `icon` 在 menubar 下不会渲染。',
        en: 'The element type of `items` when `variant="menubar"`: one top-level title plus its dropdown. Note that `icon` on a child item is not rendered in this mode.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: { zh: '顶层标题文字。', en: 'The top-level title.' },
        },
        {
          name: 'items',
          type: 'DropdownMenuItem[]',
          description: {
            zh: '该标题下的命令列表。',
            en: 'The commands under that title.',
          },
        },
      ],
    },
    {
      name: 'dropdownMenuContentVariants',
      description: {
        zh: '浮层的 CVA 函数。trigger、菜单项、图标格、快捷键、分隔线各有自己的导出（`dropdownMenuTriggerVariants`、`dropdownMenuItemVariants` …），menubar 那套则以 `menubar*` 开头。',
        en: 'The CVA function for the popup. The trigger, items, icon slot, shortcut, and separator each have their own export (`dropdownMenuTriggerVariants`, `dropdownMenuItemVariants`, …), and the menu-bar set is prefixed `menubar*`.',
      },
      props: [
        {
          name: 'align',
          type: `'start' | 'center' | 'end'`,
          default: `'start'`,
          description: {
            zh: '不产出样式，对齐交给 Positioner；这一档只是 `data-align` 的载体。',
            en: 'Emits nothing — alignment is the positioner’s job, and this variant only carries `data-align`.',
          },
        },
        {
          name: 'visible',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '强制可见。日常显隐由 Base UI 的 `open:` / `closed:` 驱动。',
            en: 'Force the visible state. Normal visibility runs off Base UI’s `open:` / `closed:`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'trigger 是 Base UI 的 `Menu.Trigger`，渲染成真正的 `<button>`，带 `aria-haspopup="menu"`、`aria-expanded` 与 `aria-controls`；浮层是 `role="menu"`，每一行是 `role="menuitem"`。',
      en: 'The trigger is Base UI’s `Menu.Trigger` — a real `<button>` with `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls`. The popup is `role="menu"` and every row is `role="menuitem"`.',
    },
    {
      zh: '键盘操作由 Base UI 提供：Enter / Space / ↓ 打开并聚焦首项，↑↓ 移动（跳过禁用项并循环），Home / End 跳到首尾，Esc 关闭并把焦点还给 trigger。',
      en: 'Keyboard handling comes from Base UI: Enter, Space, or ↓ opens the menu on its first item; ↑ and ↓ move through it, skipping disabled rows and wrapping; Home and End jump to the ends; Escape closes and hands focus back to the trigger.',
    },
    {
      zh: '打字会做 typeahead——连续敲字符跳到 label 匹配的那一项，长菜单里比一路按方向键快得多。这也是 `label` 该写成人话的实际理由。',
      en: 'Typing does typeahead: a run of characters jumps to the item whose label matches, which beats arrowing down a long menu. It is also the practical reason to write `label` as real words.',
    },
    {
      zh: '菜单打开期间焦点被限制在浮层内，页面其余部分不可 tab 到；点击外部或 Esc 关闭，焦点回到 trigger。',
      en: 'While the menu is open, focus is confined to the popup and the rest of the page is not tabbable; an outside click or Escape closes it and returns focus to the trigger.',
    },
    {
      zh: '禁用项带 `data-disabled` 并被键盘跳过，但仍在无障碍树里，读屏软件会读出「不可用」而不是当它不存在。',
      en: 'Disabled rows carry `data-disabled` and are skipped by the keyboard, yet stay in the accessibility tree, so a screen reader announces them as unavailable rather than pretending they are absent.',
    },
    {
      zh: '`menubar` 变体里顶层标题的 `role` 是 `menuitem`，左右方向键在它们之间移动；这些标题最小高度 44px，符合触达尺寸，而 `default` 变体的 trigger 没有这个下限，需要时请自己撑高。',
      en: 'In the `menubar` variant the top-level titles are themselves `role="menuitem"` and the left/right arrows move between them; those titles have a 44px minimum height, meeting the touch-target floor. The `default` trigger has no such floor, so give it height yourself where that matters.',
    },
    {
      zh: '`shortcut` 只是文本，读屏软件会连着 label 一起读出来——所以写 `⌘⌫` 这类符号时要意识到它的播报可能很难听懂，必要时改用文字。',
      en: '`shortcut` is plain text and gets announced right after the label, so a glyph string like `⌘⌫` may come out as noise. Spell it out when that matters.',
    },
    {
      zh: '浮层的缩放淡入带 `motion-reduce:transition-none`。',
      en: 'The popup’s scale-and-fade entry carries `motion-reduce:transition-none`.',
    },
  ],
}
