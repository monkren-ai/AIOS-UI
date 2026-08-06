import { Resizable } from 'aios-ui-kit/resizable'
import type { ComponentDoc } from '../types'

import ResizableHorizontal from '../../examples/resizable/horizontal'
import ResizableVertical from '../../examples/resizable/vertical'
import ResizableConstraints from '../../examples/resizable/constraints'

import horizontalSource from '../../examples/resizable/horizontal.tsx?raw'
import verticalSource from '../../examples/resizable/vertical.tsx?raw'
import constraintsSource from '../../examples/resizable/constraints.tsx?raw'

export const resizableDoc: ComponentDoc = {
  slug: 'resizable',
  name: 'Resizable',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '分栏容器，拖动中间的把手改变各栏占比，横竖皆可。',
    en: 'Split panes with a draggable divider between them, horizontal or vertical.',
  },
  preview: () => (
    <Resizable className="h-32 w-full max-w-sm border border-border-visible">
      <div className="flex h-full items-center justify-center bg-surface-raised font-mono text-caption text-foreground-muted">
        A
      </div>
      <div className="flex h-full items-center justify-center font-mono text-caption text-foreground-muted">
        B
      </div>
    </Resizable>
  ),
  importStatement: `import { Resizable } from 'aios-ui-kit/resizable'`,
  usageSnippet: `<Resizable className="h-64">\n  <div>A</div>\n  <div>B</div>\n</Resizable>`,
  composition: {
    zh: 'Resizable 不是「Resizable + Panel + Handle」这样的复合组件——它只是一个组件，把手是自动生成的。它读取 `children` 的数量（`React.Children.toArray`）决定面板数 N，然后自己在每两个相邻面板之间插入一个把手，一共 N − 1 个。你不需要、也不能手写 `<ResizablePanel>` 之类的子组件；每个直接子元素本身就是一块面板内容。',
    en: 'Resizable is not a compound component in the `Resizable.Panel` / `Resizable.Handle` sense — it is a single component that generates the handles itself. It counts `children` (via `React.Children.toArray`) to get the panel count N, then inserts one handle between every adjacent pair, N − 1 in total. There is no `<ResizablePanel>` to author yourself; each direct child is simply a panel’s content.',
  },
  examples: [
    {
      id: 'horizontal',
      title: { zh: '横向分栏', en: 'Horizontal split' },
      description: {
        zh: '默认方向。容器本身不会自己撑出高度——它是 `flex h-full w-full`，需要一个有确定高度的父级（这里用 `className="h-48"`），否则两栏都会塌成 0 高。',
        en: 'The default direction. The container itself never gives itself a height — it is `flex h-full w-full`, so it needs a parent with a resolved height (here, `className="h-48"`), or both panes collapse to nothing.',
      },
      code: horizontalSource,
      render: () => <ResizableHorizontal />,
    },
    {
      id: 'vertical',
      title: { zh: '纵向分栏', en: 'Vertical split' },
      description: {
        zh: '`direction="vertical"` 只是换成 `flex-col` 并让把手改成横条、光标变成 `row-resize`——拖拽与键盘逻辑完全共用一套代码，判断的只是取 `clientX` 还是 `clientY`。',
        en: '`direction="vertical"` simply switches to `flex-col`, turns the handle into a horizontal bar, and swaps the cursor to `row-resize`. Drag and keyboard logic are the exact same code underneath; the only branch is whether it reads `clientX` or `clientY`.',
      },
      code: verticalSource,
      render: () => <ResizableVertical />,
    },
    {
      id: 'constraints',
      title: { zh: '初始尺寸与边界', en: 'Initial sizes and limits' },
      description: {
        zh: '`initialSizes` / `minSizes` / `maxSizes` 都是百分比数组，按面板顺序对应，长度应与面板数一致（省略时各自兜底为「平均分配」「10」「90」）。三个以上面板时，一个把手只调整它左右（或上下）相邻的那两块——`Files` 变宽只会挤 `Editor`，不会碰到 `Outline`。',
        en: '`initialSizes` / `minSizes` / `maxSizes` are percentage arrays in panel order, and should match the panel count (omitted values fall back to an even split, `10`, and `90` respectively). With three or more panels, a single handle only ever adjusts its two immediate neighbours — widening `Files` squeezes `Editor` alone and never touches `Outline`.',
      },
      code: constraintsSource,
      render: () => <ResizableConstraints />,
    },
  ],
  api: [
    {
      name: 'Resizable',
      description: {
        zh: '渲染为 `<div>`，透传所有原生 div 属性。面板与把手都是内部生成的，不接受作为独立组件导入。',
        en: 'Renders a `<div>` and forwards every native div prop. Panels and handles are generated internally; there is nothing to import as a separate sub-component.',
      },
      props: [
        {
          name: 'direction',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: {
            zh: '走向。`horizontal` 走 `flex-row`，在 `dir="rtl"` 下会被 flex 自动镜像，拖拽方向已经做了相应的取反处理，依旧跟手。',
            en: 'Direction. `horizontal` uses `flex-row`, which flex mirrors automatically under `dir="rtl"`; the drag maths already accounts for that flip, so dragging still feels correct.',
          },
        },
        {
          name: 'initialSizes',
          type: 'number[]',
          description: {
            zh: '各面板的初始占比（总和通常应为 100）。省略时按面板数平均分配。',
            en: 'The starting percentage for each panel (should sum to 100). Omitted, it defaults to an even split across the panel count.',
          },
        },
        {
          name: 'minSizes',
          type: 'number[]',
          default: '10',
          description: {
            zh: '每个面板的最小占比，省略项按面板数补 10。',
            en: 'The minimum percentage per panel; missing entries default to 10.',
          },
        },
        {
          name: 'maxSizes',
          type: 'number[]',
          default: '90',
          description: {
            zh: '每个面板的最大占比，省略项按面板数补 90。',
            en: 'The maximum percentage per panel; missing entries default to 90.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '每个直接子元素就是一块面板。面板数在挂载时由子元素数量决定——运行期动态增删 `children` 会改变面板数，但不会重新分配已经手动拖过的尺寸数组，需要自己处理索引错位。',
            en: 'Every direct child becomes one panel. The panel count comes from the number of children at render time — adding or removing children at runtime changes the count, but the sizes array from any prior drag will not automatically re-index, so you need to handle that mismatch yourself.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并，可覆盖默认的 `flex h-full w-full`。',
            en: 'Extra classes, merged via `tailwind-merge`, overriding the default `flex h-full w-full`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '把手是 `role="separator"`，带 `aria-orientation`（与 `direction` 相反：横向分栏的把手是纵向分隔，`aria-orientation="vertical"`）以及 `aria-valuenow` / `aria-valuemin` / `aria-valuemax`，三者都以左侧（或上方）那块面板的占比为准。',
      en: 'A handle is `role="separator"` with an `aria-orientation` that is the opposite of `direction` (a horizontal split’s handle is a vertical divider, so `aria-orientation="vertical"`), plus `aria-valuenow` / `aria-valuemin` / `aria-valuemax` — all three measured against the panel on its left (or above it).',
    },
    {
      zh: '把手可以 `tabIndex={0}` 聚焦，方向键（横向用 ←/→，纵向用 ↑/↓）以 2% 为步进调整；越过 `minSizes` / `maxSizes` 的按键会被直接吞掉，不会触发任何提示。',
      en: 'A handle is focusable via `tabIndex={0}`, and the arrow keys (←/→ for horizontal, ↑/↓ for vertical) nudge it by 2% per press. A key press that would cross `minSizes` / `maxSizes` is silently swallowed — nothing announces that the limit was hit.',
    },
    {
      zh: '把手没有 `aria-label` 或 `aria-valuetext`，读屏只会报出数字百分比，不会说出正在调整的是哪两块面板。面板内容本身也没有任何 landmark，需要的话自己在面板 `children` 里补 `<section aria-label="…">`。',
      en: 'The handle has no `aria-label` or `aria-valuetext`, so a screen reader only announces a bare percentage — never which two panels are being adjusted. The panel content itself carries no landmark either; add your own `<section aria-label="…">` inside the panel’s `children` if you need one.',
    },
    {
      zh: '拖拽把手是纯鼠标事件（`mousedown` / `mousemove` / `mouseup`），触屏没有对应的 touch 事件绑定；触屏用户只能靠上面的方向键这条路径（配合聚焦）来调整尺寸。',
      en: 'Dragging is wired to plain mouse events (`mousedown` / `mousemove` / `mouseup`) with no matching touch handlers, so touch users have no pointer-drag path at all — the arrow-key route above, once the handle is focused, is the only way in for them.',
    },
    {
      zh: '面板尺寸变化没有过渡动效——拖拽是逐帧跟随指针的即时反馈，键盘调整是离散的跳变，两者都不受 `prefers-reduced-motion` 影响，因为压根没有可以关掉的动画。',
      en: 'Panel resizing has no transition: dragging tracks the pointer frame by frame and the keyboard makes a discrete jump. Neither is affected by `prefers-reduced-motion`, because there is no animation to turn off in the first place.',
    },
  ],
}
