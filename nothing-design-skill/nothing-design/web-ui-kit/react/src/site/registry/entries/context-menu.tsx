import type { ComponentDoc } from '../types'

import ContextMenuBasic from '../../examples/context-menu/basic'
import ContextMenuShortcuts from '../../examples/context-menu/shortcuts'
import ContextMenuSeparators from '../../examples/context-menu/separators'
import ContextMenuPerRow from '../../examples/context-menu/per-row'

import basicSource from '../../examples/context-menu/basic.tsx?raw'
import shortcutsSource from '../../examples/context-menu/shortcuts.tsx?raw'
import separatorsSource from '../../examples/context-menu/separators.tsx?raw'
import perRowSource from '../../examples/context-menu/per-row.tsx?raw'

export const contextMenuDoc: ComponentDoc = {
  slug: 'context-menu',
  name: 'ContextMenu',
  category: 'overlays',
  status: 'stable',
  description: {
    zh: '右键唤起的菜单，落点跟随指针；只应承载别处也能完成的操作。',
    en: 'A right-click menu that opens at the pointer, for actions that are also reachable somewhere else.',
  },
  preview: () => (
    <div className="flex h-24 w-56 items-center justify-center border border-dashed border-border-visible font-mono text-label uppercase tracking-wider text-foreground-muted">
      Right-click here
    </div>
  ),
  importStatement: `import { ContextMenu } from 'nothing-ui/context-menu'`,
  usageSnippet: `<ContextMenu
  items={[
    { label: 'Open', onClick: open },
    { label: 'Delete', onClick: remove },
  ]}
>
  <div>Right-click me</div>
</ContextMenu>`,
  composition: {
    zh: '`children` 被包在一层 `<div>` 里，那层监听 `contextmenu`；菜单本体经 `OverlayPortal` 渲染到 `document.body`，用 `position: fixed` 加内联的 `top` / `left` 落在指针处。和本库其它浮层不同，ContextMenu **没有**建在 Base UI 之上——开合、外部点击、Esc、方向键导航都是这里自己实现的（见下方无障碍说明里的取舍）。定位用的是 `clientX` / `clientY` 这样的物理坐标，所以菜单不会因为 RTL 而镜像，它就落在你按下的那个点上。',
    en: '`children` is wrapped in a `<div>` that listens for `contextmenu`, and the menu itself is rendered to `document.body` through `OverlayPortal`, positioned `fixed` with inline `top` / `left` at the pointer. Unlike the other overlays here, ContextMenu is **not** built on Base UI: opening, outside clicks, Escape, and arrow-key navigation are all implemented in this file, with the trade-offs spelled out in the accessibility notes. Positioning uses physical `clientX` / `clientY`, so the menu does not mirror under RTL — it lands exactly where you pressed.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '触发方式只有一种：在 `children` 区域内按右键（触控板上是双指点按）。这也说明了它的定位——右键菜单是加速器，不是入口。任何只放在这里的操作，对触屏用户和不知道要右键的人来说等于不存在，所以每一项都该在工具栏、行内按钮或键盘快捷键里有第二条路。',
        en: 'There is exactly one way in: a right-click (or two-finger tap) inside the `children` area. That tells you what it is for. A context menu is an accelerator, not a doorway — anything that lives only here does not exist for touch users or for anyone who never thought to right-click, so every entry should have a second route through a toolbar, an inline button, or a keyboard shortcut.',
      },
      code: basicSource,
      render: () => <ContextMenuBasic />,
    },
    {
      id: 'shortcuts',
      title: { zh: '快捷键提示', en: 'Shortcut hints' },
      description: {
        zh: '`shortcut` 贴在行末，作用是教学：让人看见「原来这个操作有快捷键」，下次就不用再开菜单了。但它只是文本——组件不监听任何按键，真正的绑定要你自己做，而且要保证两边写的是同一个键。',
        en: '`shortcut` sits at the end of the row and its job is teaching: it shows someone that the command has a keystroke so that next time they skip the menu entirely. It is only text, though. The component listens for nothing, so the real binding is yours — and it is on you to keep the two in agreement.',
      },
      code: shortcutsSource,
      render: () => <ContextMenuShortcuts />,
    },
    {
      id: 'separators',
      title: { zh: '分隔线与禁用项', en: 'Separators and disabled items' },
      description: {
        zh: '分隔线自成一项，和 `DropdownMenu` 完全一致：`{ separator: true }`（不带 `label`）只画一条 `role="separator"` 的线，不是菜单项，不接受焦点，方向键与 Tab 都会跨过它。旧写法——在某一项上加 `separator: true`，表示「在我下面画一条线」——仍然能用，但已标记 `@deprecated`，请迁移到独立的一项。禁用项会被键盘导航跳过，但仍在 DOM 与无障碍树里。',
        en: 'A rule is an entry of its own, exactly as in `DropdownMenu`: a bare `{ separator: true }` with no `label` draws a `role="separator"` line and nothing else — it is not a menu item, takes no focus, and both the arrow keys and the Tab cycle step over it. The older form, `separator: true` set on a real item to mean “draw a rule below me”, still works but is marked `@deprecated`; move those to standalone entries. Disabled items are skipped by keyboard navigation but stay in the DOM and the accessibility tree.',
      },
      code: separatorsSource,
      render: () => <ContextMenuSeparators />,
    },
    {
      id: 'per-row',
      title: { zh: '按行挂菜单', en: 'One menu per row' },
      description: {
        zh: '列表里每行各包一个 ContextMenu，就能让菜单内容随目标变化。注意包装层是 `inline-block` 的，行要占满宽度得自己补 `className="w-full"` 与内部元素的 `w-full`——否则右键区域只有文字那么宽，用户在行的空白处点右键会落空。',
        en: 'Wrapping each row in its own ContextMenu is how the menu contents follow the target. Note that the wrapper is `inline-block`: to make a row span the full width you need `className="w-full"` here and on the element inside, or the right-clickable region is only as wide as the text and a click in the empty part of the row does nothing.',
      },
      code: perRowSource,
      render: () => <ContextMenuPerRow />,
    },
  ],
  api: [
    {
      name: 'ContextMenu',
      description: {
        zh: '除下表属性外，原生 `<div>` 属性透传到最外层包装 `<div>`；`ref` 也指向它，不是菜单本体。',
        en: 'Native `<div>` props other than those below go to the outer wrapper `<div>`, and `ref` points there rather than at the menu.',
      },
      props: [
        {
          name: 'children',
          type: 'ReactElement',
          description: {
            zh: '右键区域的内容。会被包进一层 `<div>`，不做 `cloneElement`，所以你的元素不会被改。',
            en: 'The right-clickable content. It is wrapped in a `<div>` rather than cloned, so your element is left untouched.',
          },
        },
        {
          name: 'items',
          type: 'ContextMenuItem[]',
          description: { zh: '菜单项列表。', en: 'The menu rows.' },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到包装 `<div>` 的类名。菜单本体不接受外部类名。',
            en: 'Extra classes on the wrapper `<div>`. The menu itself takes no caller classes.',
          },
        },
      ],
    },
    {
      name: 'ContextMenuItem',
      description: {
        zh: '`items` 的元素类型，是一个联合类型：要么是带 `label` 的菜单项，要么是 `{ separator: true }` 这一种独立分隔线。和 `DropdownMenuItem` 相比少了 `icon`，且菜单项的 `label` 是必填的。',
        en: 'The element type of `items`, a union: either a menu row carrying a `label`, or a standalone `{ separator: true }` rule. Compared with `DropdownMenuItem` there is no `icon`, and a row’s `label` is required.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '显示文字。菜单项必填；独立分隔线不写。',
            en: 'The visible text. Required on a row, and absent on a standalone rule.',
          },
        },
        {
          name: 'onClick',
          type: '() => void',
          description: {
            zh: '选中回调。执行后菜单自动关闭。',
            en: 'Selection handler. The menu closes itself afterwards.',
          },
        },
        {
          name: 'shortcut',
          type: 'string',
          description: {
            zh: '行末的快捷键提示，纯展示。',
            en: 'A shortcut hint at the end of the row; display only.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用该项：置灰、`aria-disabled="true"`、移出 tab 序列。',
            en: 'Disable the row: dimmed, `aria-disabled="true"`, and out of the tab order.',
          },
        },
        {
          name: 'separator',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '单独作为一项 `{ separator: true }` 时渲染成一条分隔线。写在带 `label` 的项上是旧写法（在这一项下面补一条线），已 `@deprecated`。',
            en: 'As an entry of its own, `{ separator: true }` renders a rule. Setting it on an item that also has a `label` is the legacy form — a rule below that row — and is `@deprecated`.',
          },
        },
      ],
    },
    {
      name: 'contextMenuContentVariants',
      description: {
        zh: '菜单本体的 CVA 函数。位置由内联 style 下发，这里只管视觉与显隐；菜单项、标签、快捷键、分隔线与包装层各有对应导出。',
        en: 'The CVA function for the menu body. Position arrives through inline styles, so this only covers looks and visibility; the item, label, shortcut, separator, and wrapper each have their own export.',
      },
      props: [
        {
          name: 'visible',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '显隐。这里没有 Base UI 的 `open:` 状态可用，所以是真的靠这一档在切 `visible/invisible` 与缩放。',
            en: 'Visibility. There is no Base UI `open:` state here, so this variant genuinely does the work of toggling `visible`/`invisible` and the scale.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '菜单本体是 `role="menu"`，每行 `role="menuitem"`，用 roving tabindex——只有当前项是 `tabIndex=0`，其余（含禁用项）是 `tabIndex=-1`；禁用项另加 `aria-disabled="true"`。',
      en: 'The menu is `role="menu"` and each row is a `role="menuitem"` under a roving tabindex: only the current row is `tabIndex=0`, everything else (disabled rows included) is `tabIndex=-1`, and disabled rows also carry `aria-disabled="true"`.',
    },
    {
      zh: '打开后 ↑↓ 在可用项之间移动并循环，Enter / Space 选中，Esc 关闭，点击菜单与触发区域之外的任何地方也会关闭。',
      en: 'Once open, ↑ and ↓ cycle through the enabled rows, Enter and Space select, Escape closes, and a click anywhere outside the menu and its trigger area closes it too.',
    },
    {
      zh: '打开时焦点会移到第一个可用项上；Tab / Shift+Tab 在可用项之间循环，不会走到菜单背后的页面上；关闭时（Esc、外部点击、选中某一项都算）焦点还原到打开前的元素——右键唤起时焦点通常在 body 上，这种情况退回触发区域。',
      en: 'Opening moves focus to the first enabled row, Tab and Shift+Tab cycle within the enabled rows instead of walking out into the page behind, and closing — by Escape, by an outside click, or by picking a row — restores focus to wherever it was. A right-click usually leaves focus on `body`, and in that case focus lands on the trigger area instead.',
    },
    {
      zh: '触发区域带 `aria-haspopup="menu"` 与 `aria-expanded`，本身在 tab 序列里，聚焦后 Shift+F10 或 ContextMenu 键就能唤起菜单（落点取触发区域的位置，不是视口左上角）。即便如此，右键菜单仍是加速器：每项都该有第二条路。',
      en: 'The trigger area carries `aria-haspopup="menu"` and `aria-expanded`, sits in the tab order, and opens the menu on Shift+F10 or the Menu key once focused — anchored to the trigger rather than the top-left of the viewport. Even so, a context menu is an accelerator: every entry still deserves a second route.',
    },
    {
      zh: '菜单不锁页面滚动，也不给背后内容加 `inert`。它是非模态的，这对右键菜单是合适的默认。',
      en: 'It neither locks page scrolling nor marks the content behind it `inert`. The menu is non-modal, which is the right default for a context menu.',
    },
    {
      zh: '落点直接取 `clientX/clientY`，靠近视口边缘时不会自动翻面，可能被裁掉一部分。项数控制在七八条以内比较稳妥。',
      en: 'The position comes straight from `clientX/clientY` with no flipping near the viewport edges, so a menu opened close to the bottom can be clipped. Keeping it under seven or eight rows is the safe bound.',
    },
    {
      zh: '显隐过渡带 `motion-reduce:transition-none`。',
      en: 'The show/hide transition carries `motion-reduce:transition-none`.',
    },
  ],
}
