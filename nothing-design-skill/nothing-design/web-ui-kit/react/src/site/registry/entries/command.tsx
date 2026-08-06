import { Command } from 'aios-ui-kit/command'
import type { ComponentDoc } from '../types'

import CommandBasic from '../../examples/command/basic'
import CommandPalette from '../../examples/command/palette'

import basicSource from '../../examples/command/basic.tsx?raw'
import paletteSource from '../../examples/command/palette.tsx?raw'

const PREVIEW_GROUPS = [
  {
    heading: 'Actions',
    items: [
      { id: 'new', label: 'New file', shortcut: '⌘N' },
      { id: 'open', label: 'Open file', shortcut: '⌘O' },
    ],
  },
]

export const commandDoc: ComponentDoc = {
  slug: 'command',
  name: 'Command',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '命令面板，输入即筛选，方向键选中、回车执行。',
    en: 'A command palette: type to filter, arrow keys to move, Enter to run.',
  },
  preview: () => (
    <div className="w-full max-w-sm">
      <Command groups={PREVIEW_GROUPS} />
    </div>
  ),
  importStatement: `import { Command } from 'aios-ui-kit/command'`,
  usageSnippet: `<Command
  groups={[
    {
      heading: 'Actions',
      items: [
        { id: 'new', label: 'New file', shortcut: '⌘N', onSelect: createFile },
        { id: 'open', label: 'Open file', shortcut: '⌘O', onSelect: openFile },
      ],
    },
  ]}
/>`,
  composition: {
    zh: '整个组件由 `groups` 数组驱动，没有子组件要拼。要点是它**不是**一个自带遮罩的浮层：`open` / `onOpenChange` 只影响三件事——点击外部是否触发关闭、挂载时是否把焦点丢给输入框、以及根元素的 `data-state`——面板本体永远在 DOM 里，`open=false` 并不会让它消失。想做真正的「⌘K 弹出、别处不可见」的命令面板，你需要自己维护一个布尔值，把 `<Command>` 整体包在条件渲染（`{open && <Command .../>}`）和一层背景遮罩（或 `Modal` / `Popover`）里，再用一个全局 `keydown` 监听器切换它——第二个示例就是这么做的。',
    en: 'The whole thing is driven by the `groups` array; there is nothing to compose. The key point is that it is **not** a self-contained overlay: `open` / `onOpenChange` affect exactly three things — whether an outside click triggers close, whether mounting hands focus to the input, and the root’s `data-state` — the panel itself stays in the DOM regardless, so `open={false}` does not hide it. To get an actual “appears on ⌘K, invisible otherwise” palette, keep your own boolean, wrap the whole `<Command>` in a condition (`{open && <Command .../>}`) plus a backdrop (or `Modal` / `Popover`), and flip the boolean from a global `keydown` listener — that is exactly what the second example does.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '`groups` 是二维结构：分组带可选 `heading`，组内是 `CommandItem` 数组。输入框内容会同时过滤所有分组，标签大小写不敏感；筛完为空的分组直接从结果里消失，而不是显示一个空标题。`disabled` 项仍会渲染（呈现为暗色），但点击和回车都选不中它，方向键也会跳过它。',
        en: '`groups` is two levels: each group has an optional `heading` and an array of `CommandItem`s. Typing filters every group at once, case-insensitively; a group left with zero matches disappears entirely rather than showing an empty heading. A `disabled` item still renders (dimmed) but neither a click nor Enter can select it, and the arrow keys skip over it.',
      },
      code: basicSource,
      render: () => <CommandBasic />,
    },
    {
      id: 'palette',
      title: { zh: '⌘K 弹出式面板', en: '⌘K popup palette' },
      description: {
        zh: '这是命令面板最常见的形态：全局监听 `⌘K` / `Ctrl+K` 切换一个自管的 `open` 状态，只有 `open` 为真时才把 `<Command>` 挂进 DOM，外面再套一层定位用的容器充当「背景」。`onOpenChange` 在这里接住点击外部与 Escape 两种关闭途径，`onSelect` 里手动调用它把面板收起——组件本身选中条目后只会调用 `onSelect`，不会自动关闭。',
        en: 'The shape most people actually want: a global listener for `⌘K` / `Ctrl+K` flips a boolean you own, and `<Command>` is only mounted while it is true, sitting inside a positioned wrapper that stands in for a backdrop. `onOpenChange` here catches both the outside-click and the Escape paths to closing, and `onSelect` closes the panel by hand — selecting an item only calls `onSelect`; the component never closes itself.',
      },
      code: paletteSource,
      render: () => <CommandPalette />,
    },
  ],
  api: [
    {
      name: 'Command',
      description: {
        zh: '根元素，`role="dialog"`，透传除 `onChange` 外的原生 div 属性与 `ref`。',
        en: 'The root, `role="dialog"`. Native div props other than `onChange`, plus `ref`, are forwarded.',
      },
      props: [
        {
          name: 'groups',
          type: 'CommandGroup[]',
          description: {
            zh: '分组与命令列表。必填。',
            en: 'The groups and their commands. Required.',
          },
        },
        {
          name: 'placeholder',
          type: 'string',
          default: `'Type a command...'`,
          description: {
            zh: '输入框占位符，同时也是它的 `aria-label`。',
            en: 'The input placeholder — also its `aria-label`.',
          },
        },
        {
          name: 'emptyMessage',
          type: 'string',
          default: `'No results found.'`,
          description: {
            zh: '筛选无结果时显示的文案。',
            en: 'Shown when the filter matches nothing.',
          },
        },
        {
          name: 'open',
          type: 'boolean',
          description: {
            zh: '受控开合状态。不会隐藏面板本体——只影响外部点击关闭、挂载聚焦与 `data-state`，见上方「组成」。',
            en: 'The controlled open state. It does not hide the panel — it only affects the outside-click close, mount-time focus, and `data-state`; see “Composition” above.',
          },
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: {
            zh: '外部点击或 Escape 触发关闭时调用。要真正隐藏面板，请在这里把包裹它的条件渲染关掉。',
            en: 'Called when an outside click or Escape asks to close. To actually hide the panel, use it to flip off the condition wrapping it.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: "搜索框与命令行的高度：36 / 44 / 52px。也接受旧版的 `'default'`（映射到 `'md'`）。",
            en: "The height of the input and each row: 36 / 44 / 52px. The legacy `'default'` is also accepted and maps to `'md'`.",
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到根元素的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the root, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'CommandGroup',
      props: [
        {
          name: 'heading',
          type: 'string',
          description: {
            zh: "组标题。不传就是一个没有标题的组——多个不带标题的组会因为用 `heading ?? 'default'` 当 React key 而彼此覆盖，同一份 `groups` 里最多留一个无标题组。",
            en: "The group title. Omit it for a headingless group — but more than one headingless group will collide, since `heading ?? 'default'` is used as the React key. Keep at most one headingless group per `groups` array.",
          },
        },
        {
          name: 'items',
          type: 'CommandItem[]',
          description: { zh: '组内命令。', en: 'The commands in this group.' },
        },
      ],
    },
    {
      name: 'CommandItem',
      props: [
        {
          name: 'id',
          type: 'string',
          description: {
            zh: '唯一标识，用作 React key 与 `aria-activedescendant` 的一部分。',
            en: 'A unique id, used as the React key and part of `aria-activedescendant`.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '显示文字，同时也是过滤依据。',
            en: 'The visible text — also what filtering matches against.',
          },
        },
        {
          name: 'shortcut',
          type: 'string',
          description: {
            zh: '行末的快捷键提示，纯展示，不会真的绑定按键。',
            en: 'A shortcut hint at the end of the row. Purely visual — it binds no actual key.',
          },
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: { zh: '行首图标。', en: 'A leading icon.' },
        },
        {
          name: 'onSelect',
          type: '() => void',
          description: {
            zh: '点击或 Enter 选中时调用。之后组件会自动调用 `onOpenChange(false)` 并清空查询词——但不会隐藏面板，见上方说明。',
            en: 'Called when the item is chosen by click or Enter. The component then calls `onOpenChange(false)` and clears the query on its own — but that does not hide the panel; see above.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用这一项。仍会渲染并可被方向键跳过，但选不中。',
            en: 'Disable this item. It still renders and the arrows still pass over it, but it cannot be selected.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '根元素是 `role="dialog"`，输入框是 `role="combobox"`（`aria-expanded` 跟随 `open`，`aria-controls` 指向列表），列表是 `role="listbox"`，每一项 `role="option"` 带 `aria-selected`。高亮项通过 `aria-activedescendant` 关联到输入框，读屏用户不需要焦点真的移动到列表项上就能听到当前选中的是谁。',
      en: 'The root is `role="dialog"`, the input is `role="combobox"` (`aria-expanded` follows `open`, `aria-controls` points at the list), the list is `role="listbox"`, and each row is `role="option"` with `aria-selected`. The highlighted row is tied to the input via `aria-activedescendant`, so a screen reader announces the current selection without focus ever leaving the input.',
    },
    {
      zh: '键盘：`ArrowDown` / `ArrowUp` 在过滤后的结果里移动高亮（越界会停在两端，不循环），`Enter` 选中当前高亮项，`Escape` 触发 `onOpenChange(false)` 并清空查询词与高亮位置。这套按键只在根元素捕获，所以根元素或其中一个可聚焦的子元素必须持有焦点——组件在 `open` 变为真时会自动把焦点丢给输入框。',
      en: 'Keyboard: `ArrowDown` / `ArrowUp` move the highlight through the filtered results (they stop at either end rather than wrapping), `Enter` picks the highlighted item, and `Escape` calls `onOpenChange(false)` and resets the query and the highlight. These keys are captured on the root, so the root or one of its focusable children must hold focus — which the component arranges for itself by focusing the input whenever `open` turns true.',
    },
    {
      zh: '鼠标悬停会把高亮同步到被悬停的项（`onMouseEnter`），这样键盘和鼠标操作共享同一个「当前选中」概念，不会出现鼠标指着一行、键盘状态却停在另一行的错觉。',
      en: 'Hovering an item syncs the highlight to it (`onMouseEnter`), so keyboard and mouse share one notion of “currently selected” — there is no state where the pointer sits over one row while the keyboard thinks another is active.',
    },
    {
      zh: '组件不会把焦点困在面板内部（没有 focus trap），也不带 `aria-modal`。它假设外层——你自己写的遮罩，或 `Modal` / Base UI 的 `Dialog`——负责这两件事；单独使用 `Command` 不构成一个符合 WAI-ARIA 的模态对话框。',
      en: 'There is no focus trap and no `aria-modal`. It assumes an outer layer — your own backdrop, or `Modal` / Base UI’s `Dialog` — handles both; `Command` on its own does not amount to a WAI-ARIA-compliant modal dialog.',
    },
    {
      zh: '筛选与高亮变化没有 `aria-live` 播报。结果数量变化时（比如从 5 条筛到 1 条）读屏用户唯一能感知到的是 `aria-activedescendant` 换了目标，听不到「还剩几条」这类总结——如果这对你的场景很重要，需要自己叠加一个 `aria-live` 区域。',
      en: 'Filtering and highlight changes carry no `aria-live` announcement. When the result count changes — say from five matches down to one — the only thing a screen-reader user perceives is `aria-activedescendant` pointing somewhere new, not a summary like “1 result”. Layer your own `aria-live` region if that matters for your use case.',
    },
  ],
}
