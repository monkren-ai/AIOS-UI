import { Collapsible } from 'aios-ui-kit/collapsible'
import type { ComponentDoc } from '../types'

import CollapsibleBasic from '../../examples/collapsible/basic'
import CollapsibleControlled from '../../examples/collapsible/controlled'
import CollapsibleCustomTrigger from '../../examples/collapsible/custom-trigger'
import CollapsibleLongContent from '../../examples/collapsible/long-content'

import basicSource from '../../examples/collapsible/basic.tsx?raw'
import controlledSource from '../../examples/collapsible/controlled.tsx?raw'
import customTriggerSource from '../../examples/collapsible/custom-trigger.tsx?raw'
import longContentSource from '../../examples/collapsible/long-content.tsx?raw'

export const collapsibleDoc: ComponentDoc = {
  slug: 'collapsible',
  name: 'Collapsible',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '单个可展开区域，Accordion 的基础件。',
    en: 'A single expandable region — the primitive behind Accordion.',
  },
  preview: () => (
    <div className="w-full max-w-sm">
      <Collapsible trigger="Technical details">
        Nothing OS 3.0, 12GB RAM, 256GB storage.
      </Collapsible>
    </div>
  ),
  importStatement: `import { Collapsible } from 'aios-ui-kit/collapsible'`,
  usageSnippet: `<Collapsible trigger="Technical details">
  Nothing OS 3.0, 12GB RAM, 256GB storage.
</Collapsible>`,
  composition: {
    zh: '三层结构，全部由组件生成：外框 `<div>`（`data-slot="collapsible"`）里放一个 `<button>` 触发器和一个 `role="region"` 的内容区，内容区里再套一层负责排版的 inner。触发器内容走 `trigger` 属性（可以是任意节点），展开的内容走 `children`——两个入口分得很清楚，不需要记子组件名。虽然名字上是 Accordion 的基础件，但两者并不共享实现：Accordion 走的是 Base UI，这个是手写的，高度过渡也是两套机制。',
    en: 'Three layers, all generated for you: an outer `<div>` (`data-slot="collapsible"`) holding a `<button>` trigger and a `role="region"` content area, which in turn wraps an inner element that owns the typography. The trigger content comes in through the `trigger` prop (any node) and the revealed content through `children` — two clearly separate doors, and no sub-component names to remember. Despite the name, it does not share an implementation with Accordion: that one is built on Base UI, this one is hand-rolled, and their height transitions work differently.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '不传 `open` 就是非受控，组件自己记住开合，`defaultOpen` 决定初始状态。只有一处内容要收起时用它；有并列的好几处就用 `Accordion`，那边还额外给了标题层级和分区语义。',
        en: 'Without `open` it runs uncontrolled, remembering the state itself, and `defaultOpen` sets the starting point. Use it when exactly one thing needs to fold away; once you have several siblings, `Accordion` is the better fit — it also gives you heading levels and section semantics.',
      },
      code: basicSource,
      render: () => <CollapsibleBasic />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '`open` + `onOpenChange` 让状态归你管。`onOpenChange` 拿到的是「点完之后应该是什么状态」，不是当前状态——所以受控时直接把它写回 state 就行。下面这个例子用一个状态驱动两块区域，实现「永远只开一个」，这正是 Accordion 单开模式背后的逻辑。',
        en: '`open` plus `onOpenChange` hands the state to you. `onOpenChange` receives the state it *should* move to, not the current one, so in controlled mode you write it straight back. The example below drives two regions from one piece of state to get “only ever one open” — which is exactly what Accordion’s single mode does underneath.',
      },
      code: controlledSource,
      render: () => <CollapsibleControlled />,
    },
    {
      id: 'custom-trigger',
      title: { zh: '自定义触发器内容', en: 'Custom trigger content' },
      description: {
        zh: '`trigger` 接受任意 `ReactNode`，触发器本身是 `flex ... justify-between`，所以塞两个元素就会自动分列两端。注意它渲染成 `<button>`：里面不要再放链接或按钮，嵌套交互元素在 HTML 里是无效的，读屏与键盘行为都会出问题。另外这个组件没有内置展开箭头（Accordion 有），需要的话自己在 `trigger` 里画一个。',
        en: '`trigger` accepts any `ReactNode`, and the trigger is `flex … justify-between`, so two children push apart to either end on their own. Remember that it renders as a `<button>`: no links or buttons inside, since nested interactive elements are invalid HTML and break both keyboard and screen-reader behaviour. Note too that there is no built-in caret here the way there is in Accordion — draw one inside `trigger` if you want it.',
      },
      code: customTriggerSource,
      render: () => <CollapsibleCustomTrigger />,
    },
    {
      id: 'long-content',
      title: { zh: '500px 的高度上限', en: 'The 500px ceiling' },
      description: {
        zh: '展开动画用的是 `max-height` 过渡，展开态的上限写死在 500px（`max-h-125`），而容器是 `overflow-hidden`——**内容超过 500px 就会被裁掉，而且没有滚动条**。这是 `max-height` 方案的固有代价，用它是为了不测量真实高度。内容可能更长时，要么用 `className` 抬高上限（例如 `[&_[data-slot=collapsible-content]]:open:max-h-[none]`，代价是没有过渡），要么改用 `Accordion`——它按真实高度做动画。',
        en: 'The open animation is a `max-height` transition with the open state pinned at 500px (`max-h-125`), inside an `overflow-hidden` container — so **content taller than 500px is clipped, with no scrollbar to recover it**. That is the standing cost of the `max-height` approach, taken so nothing has to measure the real height. When the content might be longer, either raise the ceiling through `className` (`[&_[data-slot=collapsible-content]]:open:max-h-[none]`, giving up the transition) or switch to `Accordion`, which animates to the measured height.',
      },
      code: longContentSource,
      render: () => <CollapsibleLongContent />,
    },
  ],
  api: [
    {
      name: 'Collapsible',
      description: {
        zh: '渲染为一个 `<div>`。除 `onToggle` 外的原生 div 属性与 `ref` 都透传到外框（不是触发器）。',
        en: 'Renders a single `<div>`. Native div props other than `onToggle`, plus `ref`, land on the outer frame — not on the trigger.',
      },
      props: [
        {
          name: 'trigger',
          type: 'ReactNode',
          description: {
            zh: '触发器里的内容。必填。它落在 `<button>` 内部，别放交互元素。',
            en: 'What goes inside the trigger. Required. It sits inside a `<button>`, so keep interactive elements out.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: { zh: '展开后显示的内容。', en: 'The content revealed when open.' },
        },
        {
          name: 'open',
          type: 'boolean',
          description: {
            zh: '受控展开状态。给了它就完全受控，组件不再自己切换。',
            en: 'The controlled open state. Supplying it makes the component fully controlled.',
          },
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: { zh: '非受控初始状态。', en: 'Initial state when uncontrolled.' },
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: {
            zh: '开合回调，参数是「切换之后」的状态。受控与非受控下都会触发。',
            en: 'Fires on toggle with the state it is moving *to*. Called in both controlled and uncontrolled mode.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到外框的类名，经 `tailwind-merge` 合并（`rounded-none` 能覆盖 `rounded-md`）。',
            en: 'Extra classes on the frame, merged via `tailwind-merge` — `rounded-none` beats `rounded-md`.',
          },
        },
      ],
    },
    {
      name: 'collapsibleVariants',
      description: {
        zh: '各部件的 CVA 函数：外框 `collapsibleVariants`、触发器 `collapsibleTriggerVariants`、折叠区 `collapsibleContentVariants`、内容排版层 `collapsibleContentInnerVariants`。',
        en: 'The CVA function per part: `collapsibleVariants` for the frame, `collapsibleTriggerVariants`, `collapsibleContentVariants` for the folding region, and `collapsibleContentInnerVariants` for the typography layer.',
      },
      props: [
        {
          name: 'open',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅外框接受，且目前两个分支都不产生类名——展开态的样式实际由各部件自己的 `data-state` 驱动 `open:` 变体。',
            en: 'Accepted by the frame only, and today neither branch emits a class: the open styling is driven by each part’s own `data-state` through the `open:` variant.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '触发器是原生 `<button type="button">`，带随状态更新的 `aria-expanded`，Enter 与 Space 都能切换，`focus-visible` 轮廓画在内侧以免被 `overflow-hidden` 裁掉。',
      en: 'The trigger is a native `<button type="button">` with an `aria-expanded` that tracks the state. Enter and Space both toggle it, and the `focus-visible` outline is inset so `overflow-hidden` cannot clip it.',
    },
    {
      zh: '触发器带 `aria-controls`，指向内容区自动生成的 id；内容区反过来用 `aria-labelledby` 指回触发器。两者在可访问性树里是连着的，同一屏里放好几个 Collapsible 也能听出哪个按钮管哪块内容。id 走 `useId`，每个实例各自独立，不需要你传。',
      en: 'The trigger carries an `aria-controls` pointing at the content’s generated id, and the content points back with `aria-labelledby`. The two are connected in the accessibility tree, so several collapsibles on one screen stay tellable apart. The ids come from `useId`, unique per instance and nothing you need to supply.',
    },
    {
      zh: '内容区是 `role="region"`，可访问名称取自触发器文字（`aria-labelledby`），所以它会带着标题出现在读屏的地标列表里。想要别的名字，就换掉 `trigger` 的文案。',
      en: 'The content area is a `role="region"` whose accessible name comes from the trigger text through `aria-labelledby`, so it shows up in the screen reader’s landmark list under that heading. Change the `trigger` copy to change the name.',
    },
    {
      zh: '**收起时内容留在 DOM 里，但被 `inert` + `visibility: hidden` 双保险挡住**：既不在 tab 序列里，也不在可访问性树里，键盘用户不会 Tab 进一片看不见的区域。之所以不用 `hidden` 属性，是因为 `display: none` 会让 `max-height` 过渡无从发生；`visibility` 本身可过渡，收起时它撑到动画结束才生效，所以折叠动画完整保留。',
      en: '**Closed content stays in the DOM but is sealed off by `inert` plus `visibility: hidden`**: it is in neither the tab order nor the accessibility tree, so keyboard users cannot tab into a region they cannot see. The `hidden` attribute is not used because `display: none` would leave the `max-height` transition nothing to animate; `visibility` is itself transitionable and only takes effect once the collapse finishes, so the animation survives intact.',
    },
    {
      zh: '触发器最小高度 44px，满足触摸的最小触达尺寸；整块宽度撑满，点击热区不会小。',
      en: 'The trigger is at least 44px tall, meeting the touch-target minimum, and spans the full width, so the hit area is generous.',
    },
    {
      zh: '`max-height` 与背景色过渡都带 `motion-reduce:transition-none`，开启减弱动效时是瞬时开合。',
      en: 'The `max-height` and background transitions both carry `motion-reduce:transition-none`, so with reduced motion it snaps open and shut.',
    },
  ],
}
