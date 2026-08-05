import { Button } from 'nothing-ui/button'
import type { ComponentDoc } from '../types'

import PopoverBasic from '../../examples/popover/basic'
import PopoverSides from '../../examples/popover/sides'
import PopoverInteractive from '../../examples/popover/interactive'
import PopoverControlled from '../../examples/popover/controlled'

import basicSource from '../../examples/popover/basic.tsx?raw'
import sidesSource from '../../examples/popover/sides.tsx?raw'
import interactiveSource from '../../examples/popover/interactive.tsx?raw'
import controlledSource from '../../examples/popover/controlled.tsx?raw'

export const popoverDoc: ComponentDoc = {
  slug: 'popover',
  name: 'Popover',
  category: 'overlays',
  status: 'stable',
  baseUi: 'Popover',
  description: {
    zh: '点击触发、锚定在触发元素上的浮层，可放置任意可交互内容。',
    en: 'A click-triggered panel anchored to its trigger, holding whatever interactive content you need.',
  },
  preview: () => <Button variant="outline">What is this?</Button>,
  importStatement: `import { Popover } from 'nothing-ui/popover'`,
  usageSnippet: `<Popover content={<p>Anything can live in here.</p>}>
  <Button variant="outline">Details</Button>
</Popover>`,
  composition: {
    zh: '结构是「你的元素当 trigger + `content` 当浮层」：`children` 必须是单个 React 元素，组件用 `cloneElement` 把 Base UI 的 trigger 属性（`onClick`、`aria-expanded`、`aria-controls`、ref）合并进去，并把 `popoverTriggerVariants()` 的类名并到它原有的 `className` 前面。所以传 `Button` 或裸 `<button>` 都行，但别传字符串或 Fragment——那会退化成一个 `<span>`，语义上不再是按钮。浮层经 `Popover.Portal` 渲染到 body，父级的 `overflow: hidden` 裁不到它。',
    en: 'The shape is “your element is the trigger, `content` is the panel”. `children` must be a single React element: the component `cloneElement`s Base UI’s trigger props onto it (`onClick`, `aria-expanded`, `aria-controls`, the ref) and prepends `popoverTriggerVariants()` to whatever `className` it already had. A `Button` or a bare `<button>` both work — but not a string or a Fragment, which fall back to a `<span>` and stop being a button semantically. The panel goes through `Popover.Portal` to the body, so an ancestor’s `overflow: hidden` cannot clip it.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`content` 收任意 `ReactNode`，浮层自带 16px 内边距，所以你只管内容排版。宽度由内容撑开——想收住就在 `content` 里加 `max-w-*`，别去改浮层本身，那会连着入场动画的 transform 一起改。',
        en: '`content` takes any `ReactNode` and the panel supplies its own 16px of padding, so you only lay out what goes inside. Width comes from the content: cap it with a `max-w-*` on your own wrapper rather than on the panel, where you would be sharing a class list with the entry animation’s transforms.',
      },
      code: basicSource,
      render: () => <PopoverBasic />,
    },
    {
      id: 'sides',
      title: { zh: '方向', en: 'Sides' },
      description: {
        zh: '`side` 是首选方向，不是保证：Base UI 的 Positioner 在空间不够时会自己翻到对面。真正的落点写在浮层的 `data-side` 上，需要按方向做样式时请读它，而不是读你传进去的值。偏移固定 4px。',
        en: '`side` is a preference, not a promise: Base UI’s positioner flips to the opposite edge when there is not enough room. The side it actually settled on is written to `data-side` on the panel, so style against that rather than the value you passed in. The offset is a fixed 4px.',
      },
      code: sidesSource,
      render: () => <PopoverSides />,
    },
    {
      id: 'interactive',
      title: { zh: '可交互内容', en: 'Interactive content' },
      description: {
        zh: '这正是 Popover 与 Tooltip 的分界线：Tooltip 的气泡是 `pointer-events-none`，鼠标根本碰不到；Popover 的浮层可以聚焦、可以点，滑块、表单、按钮放进去都成立。反过来说，如果里面只有一句静态说明，用 Tooltip 更合适——Popover 需要一次点击才打开。',
        en: 'This is exactly where Popover parts ways with Tooltip. A tooltip bubble is `pointer-events-none` and the mouse cannot reach it; a popover panel is focusable and clickable, so sliders, forms, and buttons all belong. The converse holds too: if the panel only ever holds one static sentence, a tooltip is the better fit, because a popover costs a click to open.',
      },
      code: interactiveSource,
      render: () => <PopoverInteractive />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '不传 `open` 时组件自己管开合，`onOpenChange` 仍然照常回调——想「只观察不接管」就这么用。传了 `open` 就完全交给你：Esc、点击外部、再次点击 trigger 都只会调 `onOpenChange`，状态不会自己变，忘了接上就会卡在打开状态。',
        en: 'Leave `open` off and the component manages itself while still calling `onOpenChange` — that is the “observe without taking over” mode. Pass `open` and it is entirely yours: Escape, an outside click, and a second click on the trigger all merely call `onOpenChange`, and nothing moves until you update state. Forget to, and the panel is stuck open.',
      },
      code: controlledSource,
      render: () => <PopoverControlled />,
    },
  ],
  api: [
    {
      name: 'Popover',
      description: {
        zh: '除下表属性外，原生 `<div>` 属性透传到浮层（`Popover.Popup`），`ref` 也指向它。',
        en: 'Native `<div>` props other than those below are forwarded to the panel (`Popover.Popup`), and `ref` points at it.',
      },
      props: [
        {
          name: 'children',
          type: 'ReactElement',
          description: {
            zh: 'trigger。必须是单个能接收 props 与 ref 的元素。',
            en: 'The trigger. Must be a single element that can take props and a ref.',
          },
        },
        {
          name: 'content',
          type: 'ReactNode',
          description: { zh: '浮层内容。', en: 'What goes inside the panel.' },
        },
        {
          name: 'side',
          type: `'top' | 'right' | 'bottom' | 'left'`,
          default: `'bottom'`,
          description: {
            zh: '首选方向，空间不足时会自动翻面。',
            en: 'Preferred side; flips automatically when space runs out.',
          },
        },
        {
          name: 'open',
          type: 'boolean',
          description: {
            zh: '受控开合状态。传了就必须自己更新。',
            en: 'Controlled open state. Pass it and you own updating it.',
          },
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: {
            zh: '开合变化回调，受控与非受控下都会触发。',
            en: 'Fires on every open/close, controlled or not.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到浮层的类名，经 `tailwind-merge` 合并。注意它不会落到 trigger 上。',
            en: 'Extra classes on the panel, merged with `tailwind-merge`. Note that these do not reach the trigger.',
          },
        },
      ],
    },
    {
      name: 'popoverContentVariants',
      description: {
        zh: '浮层的 CVA 函数；trigger 与定位层分别是 `popoverTriggerVariants` / `popoverPositionerVariants`。`side` 这一档目前不产出任何类名——方向性的 `transform-origin` 只有物理关键字可写，在 RTL 下会反向，所以刻意留空，只作为 `data-side` 的载体。',
        en: 'The CVA function for the panel; the trigger and positioner have `popoverTriggerVariants` and `popoverPositionerVariants`. The `side` variant currently emits no classes: a directional `transform-origin` can only be written with physical keywords, which would point the wrong way in RTL, so it is deliberately empty and exists only to carry `data-side`.',
      },
      props: [
        {
          name: 'side',
          type: `'top' | 'right' | 'bottom' | 'left'`,
          default: `'bottom'`,
          description: { zh: '同上，当前无样式产出。', en: 'As above; currently emits nothing.' },
        },
        {
          name: 'visible',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '强制可见的类名。日常显隐由 Base UI 的 `open:` / `closed:` 状态驱动，这一档主要留给自行拼装浮层的场景。',
            en: 'Forces the visible classes. Day-to-day visibility runs off Base UI’s `open:` / `closed:` states; this variant is for hand-assembled panels.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'trigger 由 Base UI 的 `Popover.Trigger` 接管，`aria-haspopup="dialog"`、`aria-expanded` 与指向浮层的 `aria-controls` 都会自动挂上并随状态更新。',
      en: 'Base UI’s `Popover.Trigger` owns the trigger element and keeps `aria-haspopup="dialog"`, `aria-expanded`, and an `aria-controls` pointing at the panel in sync with the state.',
    },
    {
      zh: '打开后焦点移入浮层，关闭后回到 trigger——这就是为什么 `children` 必须是真能接 ref 的元素，传字符串会退化成 `<span>`，焦点无处可还。',
      en: 'Opening moves focus into the panel and closing returns it to the trigger. That is why `children` has to be a real element that accepts a ref: a plain string falls back to a `<span>` and leaves focus nowhere to return to.',
    },
    {
      zh: 'Esc 关闭，点击浮层与 trigger 之外的区域也关闭。焦点被约束在浮层内，但页面并未 `inert`——它不是模态，背后的内容仍可滚动。',
      en: 'Escape closes it, and so does a click anywhere outside the panel and trigger. Focus is scoped to the panel, but the page is not made `inert`: this is not a modal, and the content behind it still scrolls.',
    },
    {
      zh: '浮层通过 Portal 渲染到 `document.body`，DOM 顺序与视觉顺序脱节；Base UI 用 `aria-controls` 与焦点管理把这条链补上，所以别自己把浮层从 Portal 里挪出来。',
      en: 'The panel is portalled to `document.body`, so DOM order no longer matches visual order; Base UI bridges that with `aria-controls` and focus management, which is why you should not lift the panel out of the portal yourself.',
    },
    {
      zh: 'trigger 的默认类名只有 `inline-block cursor-pointer`，不含 focus ring——焦点样式来自你传进去的元素本身，所以请传一个本来就有 `focus-visible` 处理的组件（比如 `Button`）。',
      en: 'The trigger’s default classes are just `inline-block cursor-pointer`, with no focus ring of their own — the focus styling comes from the element you pass in, so pass one that already handles `focus-visible`, such as `Button`.',
    },
    {
      zh: '缩放淡入带 `motion-reduce:transition-none`，减弱动效下直接出现。',
      en: 'The scale-and-fade entry carries `motion-reduce:transition-none`, so it simply appears under reduced motion.',
    },
  ],
}
